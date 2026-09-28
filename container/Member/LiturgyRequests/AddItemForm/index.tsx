import React, { useContext, useState } from "react";
import { PiFile, PiFilmSlate, PiImage, PiMusicNotes, PiPaperclip, PiSpeakerHigh, PiTextAa } from "react-icons/pi";
import { UserContext } from "../../../../contexts/user";
import { ApiLocal } from "../../../../services/apiLocal";
import { ILiturgyManifestItem } from "../../../../interfaces/Liturgy";
import {
  Actions,
  CancelButton,
  Container,
  ErrorText,
  Field,
  FileButton,
  FileName,
  Label,
  Subtitle,
  SubmitButton,
  TextArea,
  Title,
  TypeGrid,
  TypeOption,
} from "./styles";

type IAddableType = Extract<
  ILiturgyManifestItem["type"],
  "song" | "verse" | "plain_text" | "image" | "video" | "audio" | "file"
>;

const TYPE_OPTIONS: { type: IAddableType; label: string; icon: React.ReactNode }[] = [
  { type: "song", label: "Música", icon: <PiMusicNotes /> },
  { type: "verse", label: "Versículo", icon: <PiTextAa /> },
  { type: "plain_text", label: "Aviso", icon: <PiPaperclip /> },
  { type: "image", label: "Imagem", icon: <PiImage /> },
  { type: "video", label: "Vídeo", icon: <PiFilmSlate /> },
  { type: "audio", label: "Áudio", icon: <PiSpeakerHigh /> },
  { type: "file", label: "Arquivo", icon: <PiFile /> },
];

const FILE_TYPES: IAddableType[] = ["image", "video", "audio", "file"];
const ACCEPT: Partial<Record<IAddableType, string>> = {
  image: "image/*",
  video: "video/*",
  audio: "audio/*",
};
const MAX_FILE_SIZE_MB = 25;

const TEXT_FIELD_LABEL: Partial<Record<IAddableType, string>> = {
  song: "Nome da música e artista",
  verse: "Referência e texto do versículo",
  plain_text: "Texto do aviso",
};

interface IAddItemFormProps {
  planUuid: string;
  anchorItemId: string | null;
  onCancel: () => void;
  onSuccess: (message: string) => void;
}

const AddItemForm: React.FC<IAddItemFormProps> = ({ planUuid, anchorItemId, onCancel, onSuccess }) => {
  const { token } = useContext(UserContext);
  const [selectedType, setSelectedType] = useState<IAddableType>("song");
  const [contentText, setContentText] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const needsFile = FILE_TYPES.includes(selectedType);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) return;
    setError(null);

    if (needsFile && !file) {
      setError("Selecione um arquivo para continuar.");
      return;
    }
    if (!needsFile && !contentText.trim()) {
      setError("Preencha o campo acima antes de enviar.");
      return;
    }
    if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`O arquivo deve ter até ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setSubmitting(true);

    try {
      const api = new ApiLocal();
      let pendingFileName: string | undefined;
      let arquivo: string | undefined;

      if (file) {
        setUploading(true);
        const { signedUrl, fileName } = await api.getLiturgyRequestUploadUrl(token, planUuid, file.name);
        await fetch(signedUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
        pendingFileName = fileName;
        arquivo = file.name;
        setUploading(false);
      }

      const item: ILiturgyManifestItem = { type: selectedType, arquivo };
      if (selectedType === "song") item.name = contentText.trim() || undefined;
      if (selectedType === "verse" || selectedType === "plain_text") item.text = contentText.trim() || undefined;

      await api.createLiturgyRequest(token, planUuid, {
        type: "add",
        anchorItemId,
        pendingFileName,
        comment: comment.trim() || undefined,
        item,
      });

      onSuccess("Sugestão de item enviada para aprovação.");
    } catch (err) {
      setError("Não foi possível enviar sua sugestão. Tente novamente.");
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Title>Sugerir item</Title>
      <Subtitle>
        Escolha o tipo de item e preencha os detalhes. Ele entra na posição escolhida assim que
        um administrador aprovar.
      </Subtitle>

      <Field>
        <Label>Tipo de item</Label>
        <TypeGrid>
          {TYPE_OPTIONS.map((option) => (
            <TypeOption
              key={option.type}
              type="button"
              $active={selectedType === option.type}
              onClick={() => {
                setSelectedType(option.type);
                setFile(null);
                setContentText("");
                setError(null);
              }}
            >
              {option.icon}
              {option.label}
            </TypeOption>
          ))}
        </TypeGrid>
      </Field>

      {!needsFile && (
        <Field>
          <Label>{TEXT_FIELD_LABEL[selectedType]}</Label>
          <TextArea
            value={contentText}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setContentText(event.target.value)}
            placeholder="Escreva aqui..."
            autoFocus
          />
        </Field>
      )}

      {needsFile && (
        <>
          <Field>
            <Label>Arquivo</Label>
            <FileButton>
              {file ? "Trocar arquivo" : "Selecionar arquivo"}
              <input
                type="file"
                accept={ACCEPT[selectedType]}
                onChange={(event) => setFile(event.target.files?.[0] || null)}
              />
            </FileButton>
            {file && <FileName>{file.name}</FileName>}
          </Field>
          <Field>
            <Label>Observação (opcional)</Label>
            <TextArea
              value={comment}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value)}
              placeholder="Algum contexto para quem for revisar?"
            />
          </Field>
        </>
      )}

      {error && <ErrorText>{error}</ErrorText>}

      <Actions>
        <SubmitButton type="submit" disabled={submitting}>
          {uploading ? "Enviando arquivo..." : submitting ? "Enviando..." : "Enviar sugestão"}
        </SubmitButton>
        <CancelButton type="button" onClick={onCancel} disabled={submitting}>
          Cancelar
        </CancelButton>
      </Actions>
    </Container>
  );
};

export default AddItemForm;

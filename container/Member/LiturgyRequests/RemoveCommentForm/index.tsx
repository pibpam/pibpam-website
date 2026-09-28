import React, { useContext, useState } from "react";
import { UserContext } from "../../../../contexts/user";
import { ApiLocal } from "../../../../services/apiLocal";
import { LiturgyRequestType } from "../../../../interfaces/LiturgyRequest";
import {
  Actions,
  CancelButton,
  Container,
  ErrorText,
  Subtitle,
  SubmitButton,
  TextArea,
  Title,
} from "./styles";

interface IRemoveCommentFormProps {
  type: Extract<LiturgyRequestType, "remove" | "comment">;
  planUuid: string;
  targetItemId: string;
  itemLabel: string;
  onCancel: () => void;
  onSuccess: (message: string) => void;
}

const COPY = {
  remove: {
    title: "Sugerir remoção",
    subtitle: "Explique por que este item deveria ser ocultado. Um administrador vai revisar antes de aplicar.",
    placeholder: "Ex.: essa música já foi usada no culto anterior...",
    success: "Sugestão de remoção enviada para aprovação.",
  },
  comment: {
    title: "Deixar comentário",
    subtitle: "Seu comentário fica visível para quem revisa o plano.",
    placeholder: "Escreva seu comentário...",
    success: "Comentário enviado.",
  },
};

const RemoveCommentForm: React.FC<IRemoveCommentFormProps> = ({
  type,
  planUuid,
  targetItemId,
  itemLabel,
  onCancel,
  onSuccess,
}) => {
  const { token } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const copy = COPY[type];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) return;

    if (!comment.trim()) {
      setError("Escreva um comentário antes de enviar.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const api = new ApiLocal();
      await api.createLiturgyRequest(token, planUuid, {
        type,
        targetItemId,
        comment: comment.trim(),
      });
      onSuccess(copy.success);
    } catch (err) {
      setError("Não foi possível enviar sua solicitação. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Title>{copy.title}</Title>
      <Subtitle>
        {itemLabel} — {copy.subtitle}
      </Subtitle>
      <TextArea
        value={comment}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value)}
        placeholder={copy.placeholder}
        autoFocus
      />
      {error && <ErrorText>{error}</ErrorText>}
      <Actions>
        <SubmitButton type="submit" disabled={submitting}>
          {submitting ? "Enviando..." : "Enviar sugestão"}
        </SubmitButton>
        <CancelButton type="button" onClick={onCancel} disabled={submitting}>
          Voltar
        </CancelButton>
      </Actions>
    </Container>
  );
};

export default RemoveCommentForm;

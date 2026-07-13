import React, { useContext, useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Modal from "../Modal";
import { ApiLocal } from "../../services/apiLocal";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { AppContext } from "../../contexts/app";
import {
  CloseButton,
  Container,
  Error,
  Field,
  Form,
  Spinner,
  Subtitle,
  SubmitButton,
  Title,
} from "./styles";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ICheckRegistrationSheet {
  open: boolean;
  onClose: () => void;
  // Quando informado, restringe a busca ao evento atual.
  eventUuid?: string;
}

const CheckRegistrationSheet: React.FC<ICheckRegistrationSheet> = ({
  open,
  onClose,
  eventUuid,
}) => {
  const { goTo } = useAppNavigation();
  const { isApp, isMobile } = useContext(AppContext);
  // No modal de desktop já existe um botão de fechar próprio (fora do
  // conteúdo) — o daqui é só para a bottom sheet mobile, evitar duplicar.
  const isDesktop = useMemo(() => !isApp && !isMobile, [isApp, isMobile]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setCode("");
    setError(null);
    setLoading(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      setError("Informe o código ou o e-mail da inscrição.");
      return;
    }

    const isEmail = EMAIL_REGEX.test(trimmed);

    setLoading(true);
    setError(null);
    try {
      const apiLocal = new ApiLocal();
      const results = await apiLocal.searchRegistrations(
        isEmail
          ? { email: trimmed, eventUuid }
          : { code: trimmed, eventUuid }
      );
      const found = isEmail
        ? results[0]
        : results.find((r) => r.code === trimmed) || results[0];

      if (!found) {
        setError(
          isEmail
            ? "Nenhuma inscrição encontrada para este e-mail."
            : "Nenhuma inscrição encontrada para este código."
        );
        return;
      }

      await goTo({
        pathname: `/inscricoes/acompanhamento/${found.code}`,
        showLoading: true,
      });
      handleClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Não foi possível buscar a inscrição. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <Container>
        {!isDesktop && (
          <CloseButton
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
          >
            <FiX />
          </CloseButton>
        )}
        <Title>Verificar inscrição</Title>
        <Subtitle>
          Digite o código recebido ou o e-mail usado na inscrição para
          acompanhá-la.
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          <Field>
            <label htmlFor="registration-code">Código ou e-mail</label>
            <input
              id="registration-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ex.: ENERGY-2026-XY7Q ou seu@email.com"
            />
          </Field>

          {error && <Error>{error}</Error>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <FiSearch /> Buscar inscrição
              </>
            )}
          </SubmitButton>
        </Form>
      </Container>
    </Modal>
  );
};

export default CheckRegistrationSheet;

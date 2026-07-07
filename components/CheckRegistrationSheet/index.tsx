import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Modal from "../Modal";
import { ApiLocal } from "../../services/apiLocal";
import { useAppNavigation } from "../../hooks/useAppNavigation";
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

interface ICheckRegistrationSheet {
  open: boolean;
  onClose: () => void;
}

const CheckRegistrationSheet: React.FC<ICheckRegistrationSheet> = ({
  open,
  onClose,
}) => {
  const { goTo } = useAppNavigation();
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
      setError("Informe o código da inscrição.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const apiLocal = new ApiLocal();
      const results = await apiLocal.searchRegistrations({ code: trimmed });
      const found = results.find((r) => r.code === trimmed) || results[0];

      if (!found) {
        setError("Nenhuma inscrição encontrada para este código.");
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
        <CloseButton
          type="button"
          onClick={handleClose}
          aria-label="Fechar"
        >
          <FiX />
        </CloseButton>
        <Title>Verificar inscrição</Title>
        <Subtitle>
          Digite o código recebido para acompanhar sua inscrição.
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          <Field>
            <label htmlFor="registration-code">Código da inscrição</label>
            <input
              id="registration-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ex.: ENERGY-2026-XY7Q"
              autoCapitalize="characters"
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

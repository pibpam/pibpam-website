import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import Modal from "../Modal";
import styles from "../../styles/components/CheckRegistrationSheet.module.scss";
import { ApiLocal } from "../../services/apiLocal";
import { useAppNavigation } from "../../hooks/useAppNavigation";

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
      <div className={styles.container}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Fechar"
        >
          <FiX />
        </button>
        <h2 className={styles.title}>Verificar inscrição</h2>
        <p className={styles.subtitle}>
          Digite o código recebido para acompanhar sua inscrição.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="registration-code">Código da inscrição</label>
            <input
              id="registration-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ex.: ENERGY-2026-XY7Q"
              autoCapitalize="characters"
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? (
              <ImSpinner2 className={styles.spinner} />
            ) : (
              <>
                <FiSearch /> Buscar inscrição
              </>
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CheckRegistrationSheet;

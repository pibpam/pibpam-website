import type { NextPage } from "next";
import Link from "next/link";
import { FormEvent, useState } from "react";
import SecondaryButton from "../components/Button/Secondary";
import styles from "../styles/Auth.module.scss";
import Website from "../layout/container/Website";
import Header from "../components/Header";
import HeaderContainer from "../components/HeaderContainer";
import useMenu from "../hooks/useMenu";
import { useAppNavigation } from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";
import { sendPasswordReset } from "../services/auth";

const RecuperarSenha: NextPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);

  const { open, toggleMenu } = useMenu();
  const { goBack } = useAppNavigation();
  const { scrollActive, changeScroll } = useHeader();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);
    setIsLoading(true);

    try {
      await sendPasswordReset(email.trim());
      setSent(true);
    } catch (err: any) {
      setError(err?.message || "Não foi possível enviar o e-mail de recuperação.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Website
      title="Recuperar senha"
      hasTabNavigator={false}
      changeScroll={changeScroll}
      openMenu={open}
      toggleMenu={toggleMenu}
    >
      <>
        <HeaderContainer active={scrollActive}>
          <Header
            goBack={() => goBack({ fallback: "/login" })}
            toggleMenu={toggleMenu}
          />
        </HeaderContainer>
        <main className={styles.page}>
          <section className={styles.card}>
            <h1 className={styles.title}>Recuperar senha</h1>
            <p className={styles.description}>
              Informe seu e-mail e enviaremos um link para redefinir sua senha.
            </p>

            {error && <div className={styles.error}>{error}</div>}

            {sent ? (
              <>
                <div className={styles.success}>
                  E-mail enviado! Verifique sua caixa de entrada e siga o link
                  para redefinir sua senha.
                </div>
                <p className={styles.helper}>
                  <Link href="/login">Voltar para o login</Link>
                </p>
              </>
            ) : (
              <>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.field}>
                    <label htmlFor="email">E-mail</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div className={styles.buttons}>
                    <SecondaryButton
                      text={isLoading ? "Enviando..." : "Enviar link"}
                      disabled={isLoading}
                      type="submit"
                    />
                  </div>
                </form>

                <p className={styles.helper}>
                  Lembrou a senha? <Link href="/login">Entrar</Link>
                </p>
              </>
            )}
          </section>
        </main>
      </>
    </Website>
  );
};

export default RecuperarSenha;

import type { NextPage } from "next";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import PasswordInput from "../components/PasswordInput";
import SecondaryButton from "../components/Button/Secondary";
import ThirdButton from "../components/Button/Third";
import { UserContext } from "../contexts/user";
import styles from "../styles/Auth.module.scss";
import { PostMessageContext } from "../contexts/postMessage";
import { AppContext } from "../contexts/app";
import Website from "../layout/container/Website";
import Header from "../components/Header";
import HeaderContainer from "../components/HeaderContainer";
import useMenu from "../hooks/useMenu";
import { useAppNavigation } from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";

const SignUp: NextPage = () => {
  const router = useRouter();
  const { register, loginGoogle, isLoadingAuth, authError, token } =
    useContext(UserContext);
  const { blockPostMessage, unblockPostMessage } =
    useContext(PostMessageContext);
  const { isApp } = useContext(AppContext);

  const { open, toggleMenu } = useMenu();
  const { goBack } = useAppNavigation();
  const { scrollActive, changeScroll } = useHeader();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | undefined>();

  const runInvisibleCaptcha = async () => {
    return true;
  };

  useEffect(() => {
    if (token) {
      router.replace("/member");
    }
  }, [token, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const captchaOk = await runInvisibleCaptcha();
      if (!captchaOk) {
        setError("Validacao de seguranca nao concluida.");
        return;
      }

      await register(name.trim(), email.trim(), password);
      router.push("/member");
    } catch (err: any) {
      setError(err?.message || "Nao foi possivel criar sua conta.");
    }
  };

  const handleLoginGoogle = async () => {
    if (isApp) {
      window.open(window.location.origin + "/auth/google", "_blank");
      return;
    }

    setError(undefined);

    try {
      blockPostMessage();
      await loginGoogle();
      router.push("/member");
    } catch (err: any) {
      setError(
        err?.message || "Nao foi possivel concluir o cadastro com Google.",
      );
    } finally {
      unblockPostMessage();
    }
  };

  return (
    <Website
      title="Criar conta"
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
            <h1 className={styles.title}>Criar conta</h1>
            <p className={styles.description}>
              Cadastre-se para acessar os recursos da membresia.
            </p>

            {(error || authError) && (
              <div className={styles.error}>{error || authError}</div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

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

              <div className={styles.field}>
                <label htmlFor="password">Senha</label>
                <PasswordInput
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="confirmPassword">Confirmar senha</label>
                <PasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>

              <div className={styles.buttons}>
                <SecondaryButton
                  text={isLoadingAuth ? "Criando..." : "Criar conta"}
                  disabled={isLoadingAuth}
                  type="submit"
                />
                <ThirdButton
                  type="button"
                  disabled={isLoadingAuth}
                  onClick={handleLoginGoogle}
                >
                  <span className={styles.googleContent}>
                    <FcGoogle />
                    <span>
                      {isLoadingAuth ? "Aguarde..." : "Cadastrar com Google"}
                    </span>
                  </span>
                </ThirdButton>
              </div>
            </form>

            <p className={styles.helper}>
              Ja possui conta? <Link href="/login">Entrar</Link>
            </p>
          </section>
        </main>
      </>
    </Website>
  );
};

export default SignUp;

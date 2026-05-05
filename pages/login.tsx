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
import usePostMessage from "../hooks/usePostMessage";
import Website from "../layout/container/Website";
import Header from "../components/Header";
import HeaderContainer from "../components/HeaderContainer";
import useMenu from "../hooks/useMenu";
import { useAppNavigation } from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";

const Login: NextPage = () => {
  const router = useRouter();
  const { login, loginGoogle, isLoadingAuth, authError, token } =
    useContext(UserContext);
  const [statedGoogleLogin, setStatedGoogleLogin] = useState(false);
  const { blockPostMessage, unblockPostMessage } =
    useContext(PostMessageContext);
  const { isApp } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const { googleLogin } = usePostMessage();
  const { open, toggleMenu } = useMenu();
  const { goBack } = useAppNavigation();
  const { scrollActive, changeScroll } = useHeader();

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

    try {
      const captchaOk = await runInvisibleCaptcha();
      if (!captchaOk) {
        setError("Validação de segurança não concluída.");
        return;
      }

      await login(email.trim(), password);
      router.push("/member");
    } catch (err: any) {
      setError(err?.message || "Não foi possível concluir o login.");
    }
  };

  const handleLoginGoogle = async () => {
    if (isApp) {
      setStatedGoogleLogin(true);
      googleLogin();
      // window.open(window.location.origin + "/auth/google", "_blank");
      return;
    }

    setError(undefined);

    try {
      blockPostMessage();
      await loginGoogle();
      router.push("/member");
    } catch (err: any) {
      setError(err?.message || "Não foi possível concluir o login com Google.");
    } finally {
      unblockPostMessage();
    }
  };

  return (
    <Website
      title="Entrar"
      hasTabNavigator={false}
      changeScroll={changeScroll}
      openMenu={open}
      toggleMenu={toggleMenu}
    >
      <>
        <HeaderContainer active={scrollActive}>
          <Header
            goBack={() => goBack({ fallback: "/" })}
            toggleMenu={toggleMenu}
          />
        </HeaderContainer>
        <main className={styles.page}>
          <section className={styles.card}>
            <h1 className={styles.title}>Entrar</h1>
            <p className={styles.description}>
              Acesse sua conta da área de membros.
            </p>

            {(error || authError) && (
              <div className={styles.error}>{error || authError}</div>
            )}

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

              <div className={styles.field}>
                <label htmlFor="password">Senha</label>
                <PasswordInput
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <a className={styles.forgotPassword}>
                <Link href="/recuperar-senha">Esqueceu sua senha?</Link>
              </a>
              
              <div className={styles.buttons}>
                <SecondaryButton
                  text={isLoadingAuth ? "Entrando..." : "Entrar"}
                  disabled={isLoadingAuth}
                  type="submit"
                />

                {!isApp && (
                  <ThirdButton
                    type="button"
                    disabled={isLoadingAuth}
                    onClick={handleLoginGoogle}
                  >
                    <span className={styles.googleContent}>
                      <FcGoogle />
                      <span>
                        {isLoadingAuth || statedGoogleLogin
                          ? "Aguarde..."
                          : "Entrar com Google"}
                      </span>
                    </span>
                  </ThirdButton>
                )}
              </div>
            </form>

            <p className={styles.helper}>
              Ainda não possui conta? <Link href="/cadastro">Crie agora</Link>
            </p>
          </section>
        </main>
      </>
    </Website>
  );
};

export default Login;

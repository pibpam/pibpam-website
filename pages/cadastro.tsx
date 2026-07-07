import type { NextPage } from "next";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import PasswordInput from "../components/PasswordInput";
import SecondaryButton from "../components/Button/Secondary";
import ThirdButton from "../components/Button/Third";
import { UserContext } from "../contexts/user";
import {
  Buttons,
  Card,
  Description,
  Error,
  Field,
  Form,
  GoogleContent,
  Helper,
  Page,
  Title,
} from "../styles/Auth";
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
        <Page as="main">
          <Card as="section">
            <Title>Criar conta</Title>
            <Description>
              Cadastre-se para acessar os recursos da membresia.
            </Description>

            {(error || authError) && (
              <Error>{error || authError}</Error>
            )}

            <Form onSubmit={handleSubmit}>
              <Field>
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
              </Field>

              <Field>
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
              </Field>

              <Field>
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
              </Field>

              <Field>
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
              </Field>

              <Buttons>
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
                  <GoogleContent>
                    <FcGoogle />
                    <span>
                      {isLoadingAuth ? "Aguarde..." : "Cadastrar com Google"}
                    </span>
                  </GoogleContent>
                </ThirdButton>
              </Buttons>
            </Form>

            <Helper as="p">
              Ja possui conta? <Link href="/login">Entrar</Link>
            </Helper>
          </Card>
        </Page>
      </>
    </Website>
  );
};

export default SignUp;

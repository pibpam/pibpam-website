import React, { useContext, useEffect, useRef } from "react";

import { Container } from "./styles";
import Website from "../../layout/container/Website";
import { UserContext } from "../../contexts/user";
import Spinner from "../../components/Spinner";
import SecondaryButton from "../../components/Button/Secondary";
import { useRouter } from "next/router";
import { PiCheckCircle, PiWarning } from "react-icons/pi";

const AuthCode: React.FC<{ execute: boolean }> = ({ execute }) => {
  const router = useRouter();

  const { loginGoogle, authenticateByToken } = useContext(UserContext);
  const processed = useRef(false);
  const [accessToken, setAccessToken] = React.useState<string>("");
  const [hasError, setHasError] = React.useState(false);
  const [processing, setProcessing] = React.useState(true);

  useEffect(() => {
    if (!processed.current && execute) {
      setTimeout(async () => {
        try {
          setProcessing(true);
          const token = await loginGoogle();
          setAccessToken(token);
        } catch (error) {
          setHasError(true);
        } finally {
          setProcessing(false);
        }
      }, 1000);
      processed.current = true;
    }
  }, [loginGoogle, execute]);

  useEffect(() => {
    const init = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        await authenticateByToken(token);
        router.replace("/member");
      } else {
        console.error("Token de autenticação não encontrado na URL.");
      }
    };

    init();
  }, [authenticateByToken, router]);

  const openApp = () => {
    try {
      window.location.href = "pibpamapp:///auth/code?token=" + accessToken;
      // window.location.href =
      //   "http://localhost:3000/auth/code/?token=" + accessToken;
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Website openMenu={false} toggleMenu={() => {}} hasTabNavigator={false}>
      <Container>
        <h1>Autenticando com Google...</h1>

        {processing && (
          <div>
            <Spinner />
            <p>Por favor, aguarde enquanto processamos sua autenticação.</p>
          </div>
        )}

        {hasError && (
          <div>
            <PiWarning />
            <p>
              Ocorreu um erro durante a autenticação. Por favor, tente
              novamente.
            </p>
            <SecondaryButton onClick={() => window.location.reload()}>
              <>Tentar Novamente</>
            </SecondaryButton>
          </div>
        )}

        {accessToken && (
          <div>
            <PiCheckCircle />
            <p>
              <strong>Autenticação concluída!</strong> Clique no botão abaixo
              para abrir o aplicativo.
            </p>
            <SecondaryButton onClick={openApp}>
              <>Abrir Aplicativo</>
            </SecondaryButton>
          </div>
        )}
      </Container>
    </Website>
  );
};

export default AuthCode;

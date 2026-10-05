import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { PiWarning } from "react-icons/pi";

import { Container } from "../AuthCode/styles";
import Website from "../../layout/container/Website";
import Spinner from "../../components/Spinner";
import { UserContext } from "../../contexts/user";
import { ApiLocal } from "../../services/apiLocal";
import { saveToken } from "../../utils/LocalStorage";

const AuthLink: React.FC = () => {
  const router = useRouter();
  const { authenticateByToken } = useContext(UserContext);
  const processed = useRef(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const init = async () => {
      const token = new URLSearchParams(window.location.search).get("t");

      if (!token) {
        setHasError(true);
        return;
      }

      try {
        const api = new ApiLocal();
        const { accessToken, rotationUuid } = await api.authByRotationLink(token);
        saveToken(accessToken);
        await authenticateByToken(accessToken);
        router.replace(`/member/rotation?rotation=${rotationUuid}`);
      } catch (error) {
        console.error(error);
        setHasError(true);
      }
    };

    init();
  }, [authenticateByToken, router]);

  return (
    <Website openMenu={false} toggleMenu={() => {}} hasTabNavigator={false}>
      <Container>
        <h1>Abrindo escala...</h1>

        {!hasError && (
          <div>
            <Spinner />
            <p>Por favor, aguarde enquanto validamos o seu link.</p>
          </div>
        )}

        {hasError && (
          <div>
            <PiWarning />
            <p>
              Este link é inválido ou expirou. Peça um novo link ao líder do seu
              ministério.
            </p>
          </div>
        )}
      </Container>
    </Website>
  );
};

export default AuthLink;

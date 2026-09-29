import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import EmptyState from "../../../components/EmptyState";
import HeaderMember from "../../../components/HeaderMember";
import Spinner from "../../../components/Spinner";
import MyRequests from "../../../container/Member/LiturgyRequests/MyRequests";
import { UserContext } from "../../../contexts/user";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { ILiturgyRequest } from "../../../interfaces/LiturgyRequest";
import Website from "../../../layout/container/Website";
import { ApiLocal } from "../../../services/apiLocal";
import { Container, Loading } from "../../../styles/MemberLiturgyRequests";

const MyLiturgyRequestsPage: NextPage = () => {
  const { user, token, isLoadingUser } = useContext(UserContext);
  const { goTo } = useAppNavigation();
  const canRequest = !!user?.permissions?.includes("worship.plan.request");

  const [requests, setRequests] = useState<ILiturgyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isLoadingUser && !canRequest) {
      goTo({ pathname: "/member", resetHistory: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUser, canRequest]);

  useEffect(() => {
    if (!token || !canRequest) return;

    const fetchRequests = async () => {
      setLoading(true);
      setError(false);
      try {
        const api = new ApiLocal();
        const data = await api.getMyLiturgyRequests(token);
        setRequests(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token, canRequest]);

  if (isLoadingUser || !canRequest) {
    return (
      <Loading>
        <Spinner />
      </Loading>
    );
  }

  return (
    <Website hasTabNavigator={false} title="Área de membros" openMenu={false} toggleMenu={() => {}}>
      <>
        <HeaderMember
          goBack={() => goTo({ pathname: "/member/liturgy" })}
          title="Minhas solicitações"
        />
        <Container>
          {loading && (
            <Loading>
              <Spinner />
            </Loading>
          )}

          {!loading && error && (
            <EmptyState description="Não foi possível carregar suas solicitações. Tente novamente mais tarde." />
          )}

          {!loading && !error && !requests.length && (
            <EmptyState description="Você ainda não fez nenhuma sugestão." />
          )}

          {!loading && !error && !!requests.length && <MyRequests requests={requests} />}
        </Container>
      </>
    </Website>
  );
};

export default MyLiturgyRequestsPage;

import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { PiClipboardText } from "react-icons/pi";
import EmptyState from "../../../components/EmptyState";
import HeaderMember from "../../../components/HeaderMember";
import Spinner from "../../../components/Spinner";
import Toast from "../../../components/Toast";
import LiturgyRequests from "../../../container/Member/LiturgyRequests";
import { UserContext } from "../../../contexts/user";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { ILiturgyPlan } from "../../../interfaces/Liturgy";
import Website from "../../../layout/container/Website";
import { ApiLocal } from "../../../services/apiLocal";
import { DateUtils } from "../../../utils/Date";
import { Container, Loading, MyRequestsLink, TopBar } from "../../../styles/MemberLiturgyRequests";

const MemberLiturgyRequestsPage: NextPage = () => {
  const { user, token, isLoadingUser } = useContext(UserContext);
  const { goTo } = useAppNavigation();
  const canRequest = !!user?.permissions?.includes("worship.plan.request");

  const [plans, setPlans] = useState<ILiturgyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoadingUser && !canRequest) {
      goTo({ pathname: "/member", resetHistory: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUser, canRequest]);

  const fetchPlans = async () => {
    if (!token) return;
    setLoading(true);
    setError(false);
    try {
      const api = new ApiLocal();
      const data = await api.getLiturgyPlansUpcoming(token);
      setPlans(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !canRequest) return;
    fetchPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          goBack={() => goTo({ pathname: "/member", resetHistory: true })}
          title="Sugestões de liturgia"
        />
        <Container>
          <TopBar>
            <p>Toque num item para sugerir remoção ou comentar, ou use os pontos entre eles para sugerir um item novo.</p>
            <MyRequestsLink
              type="button"
              onClick={() => goTo({ pathname: "/member/liturgy-requests/mine" })}
            >
              <PiClipboardText /> Minhas solicitações
            </MyRequestsLink>
          </TopBar>

          {loading && (
            <Loading>
              <Spinner />
            </Loading>
          )}

          {!loading && error && (
            <EmptyState description="Não foi possível carregar os planos. Tente novamente mais tarde." />
          )}

          {!loading && !error && !plans.length && (
            <EmptyState description="Nenhum plano de culto disponível no momento." />
          )}

          {!loading && !error && !!plans.length && (
            <LiturgyRequests
              todayPlans={plans.filter((plan) => DateUtils.isToday(plan.date))}
              upcomingPlans={plans.filter((plan) => !DateUtils.isToday(plan.date))}
              onRequestCreated={(message) => setToastMessage(message)}
            />
          )}
        </Container>

        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </>
    </Website>
  );
};

export default MemberLiturgyRequestsPage;

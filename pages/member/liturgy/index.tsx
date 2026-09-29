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

/**
 * Tela única de plano litúrgico — antes eram duas (/member/liturgy, só leitura/admin, e
 * /member/liturgy-requests, com sugestões). Unificadas: quem tem worship.plan.request vê
 * as ações de sugestão; quem só tem worship.plan.manage (ou é admin sem nenhuma das duas
 * permissões) vê a mesma listagem em modo somente leitura.
 */
const MemberLiturgyPage: NextPage = () => {
  const { user, token, isLoadingUser } = useContext(UserContext);
  const { goTo } = useAppNavigation();
  const isAdmin = user?.type === "admin" || user?.type === "master";
  const canRequest = !!user?.permissions?.includes("worship.plan.request");
  const canManage = !!user?.permissions?.includes("worship.plan.manage");
  // Hoje + próximos exige uma das duas permissões no backend (ver routes_member.ts);
  // sem nenhuma, cai pro endpoint antigo (só hoje) pra não quebrar admins ainda sem Role atribuída.
  const canViewUpcoming = canRequest || canManage;
  const canView = isAdmin || canViewUpcoming;

  const [plans, setPlans] = useState<ILiturgyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoadingUser && !canView) {
      goTo({ pathname: "/member", resetHistory: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingUser, canView]);

  useEffect(() => {
    if (!token || !canView) return;

    const fetchPlans = async () => {
      setLoading(true);
      setError(false);
      try {
        const api = new ApiLocal();
        const data = canViewUpcoming
          ? await api.getLiturgyPlansUpcoming(token)
          : await api.getLiturgyPlansToday(token);
        setPlans(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, canView, canViewUpcoming]);

  if (isLoadingUser || !canView) {
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
          title="Plano litúrgico"
        />
        <Container>
          <TopBar>
            <p>
              {canRequest
                ? "Toque num item para sugerir remoção ou comentar, ou use os pontos entre eles para sugerir um item novo."
                : "Veja o plano de culto de hoje e dos próximos cultos."}
            </p>
            {canRequest && (
              <MyRequestsLink type="button" onClick={() => goTo({ pathname: "/member/liturgy/mine" })}>
                <PiClipboardText /> Minhas solicitações
              </MyRequestsLink>
            )}
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
              canRequest={canRequest}
              onRequestCreated={(message) => setToastMessage(message)}
            />
          )}
        </Container>

        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      </>
    </Website>
  );
};

export default MemberLiturgyPage;

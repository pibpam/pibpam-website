import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import EmptyState from "../../../components/EmptyState";
import HeaderMember from "../../../components/HeaderMember";
import { UserContext } from "../../../contexts/user";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { ICohort } from "../../../interfaces/Cohort";
import Website from "../../../layout/container/Website";
import { ApiLocal } from "../../../services/apiLocal";
import { Card, Container, List } from "../../../styles/MemberCohorts";

const MemberCohortsPage: NextPage = () => {
  const { token } = useContext(UserContext);
  const { goTo } = useAppNavigation();
  const [cohorts, setCohorts] = useState<ICohort[]>([]);
  const [loading, setLoading] = useState(false);

  const getCohorts = async (authToken: string) => {
    setLoading(true);
    try {
      const api = new ApiLocal();
      const data = await api.getMemberCohorts(authToken);
      setCohorts(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getCohorts(token);
    }
  }, [token]);

  return (
    <Website
      hasTabNavigator={false}
      title={"Área de membros"}
      openMenu={false}
      toggleMenu={() => {}}
    >
      <>
        <HeaderMember
          goBack={() => goTo({ pathname: "/member", resetHistory: true })}
          title={"Turmas"}
        />
        <Container>
          <p>Selecione uma turma para ver as lessons e lançar presença.</p>

          {!loading && !cohorts.length && (
            <EmptyState description="Nenhuma turma encontrada para o seu perfil." />
          )}

          <List>
            {cohorts.map((cohort) => (
              <Card
                key={cohort.uuid}
                onClick={() =>
                  goTo({
                    pathname: `/member/cohorts/${cohort.uuid}`,
                    query: { cohortName: cohort.name },
                  })
                }
              >
                <div>Ministério: {cohort.ministry?.name || "Não informado"}</div>
                <div>{cohort.name}</div>
                <div>
                  {cohort.description || "Sem descrição"} <FiArrowRight />
                </div>
              </Card>
            ))}
          </List>
        </Container>
      </>
    </Website>
  );
};

export default MemberCohortsPage;

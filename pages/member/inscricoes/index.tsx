import type { GetServerSideProps, NextPage } from "next";
import React, { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import Website from "../../../layout/container/Website";
import HeaderMember from "../../../components/HeaderMember";
import EventTicketCard from "../../../components/EventTicketCard";
import ThirdButton from "../../../components/Button/Third";
import EmptyState from "../../../components/EmptyState";
import MyRegistrations from "../../../container/Inscricoes/MyRegistrations";
import { SectionLabel } from "../../../styles/Inscription";
import { Container, Grid, LoadMore } from "../../../styles/MemberInscriptions";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { UserContext } from "../../../contexts/user";
import { Api } from "../../../services/api";
import { ApiLocal } from "../../../services/apiLocal";
import { IEvent, IGetAllEventsResponse } from "../../../interfaces/Event";
import { IPaginationData } from "../../../interfaces/Pagination";

interface IMemberInscricoesPage {
  data: IGetAllEventsResponse;
}

const MemberInscricoesPage: NextPage<IMemberInscricoesPage> = ({ data }) => {
  const { goTo } = useAppNavigation();
  const { user } = useContext(UserContext);
  const [paginator, setPaginator] = useState<IPaginationData>(data.pagination);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetAll = async () => {
    setLoading(true);
    const apiLocal = new ApiLocal();
    const response = await apiLocal.getEvents(paginator.page + 1, 20);
    setPaginator(response.pagination);
    setEvents((state) => [...state, ...response.data]);
    setLoading(false);
  };

  return (
    <Website
      hasTabNavigator={false}
      title={"Inscrições"}
      openMenu={false}
      toggleMenu={() => {}}
    >
      <>
        <HeaderMember
          goBack={() => goTo({ pathname: "/member", resetHistory: true })}
          title={"Inscrições"}
        />
        <Container>
          <MyRegistrations autoSearchEmail={user?.email} />

          <SectionLabel>Eventos</SectionLabel>
          <Grid>
            {data.data.map((item) => (
              <EventTicketCard
                data={item}
                key={item.uuid}
                onSubscribe={() =>
                  goTo({ pathname: "/inscricoes/" + item.uuid, showLoading: true })
                }
              />
            ))}
            {events.map((item) => (
              <EventTicketCard
                data={item}
                key={item.uuid}
                onSubscribe={() =>
                  goTo({ pathname: "/inscricoes/" + item.uuid, showLoading: true })
                }
              />
            ))}

            {!data.data.length && <EmptyState />}
          </Grid>
          {paginator.page < paginator.totalPage && (
            <LoadMore>
              <ThirdButton loading={loading} onClick={handleGetAll}>
                {loading ? (
                  <ImSpinner2 />
                ) : (
                  <>
                    <FiPlus /> ver mais
                  </>
                )}
              </ThirdButton>
            </LoadMore>
          )}
        </Container>
      </>
    </Website>
  );
};

export const getServerSideProps: GetServerSideProps<IMemberInscricoesPage> = async () => {
  const api = new Api();
  const data = await api.getEvents(1, 20);

  return { props: { data } };
};

export default MemberInscricoesPage;

import type { NextPage } from "next";
import styles from "../styles/Events.module.scss";
import Website from "../layout/container/Website";
import DividerMobile, { EDividerColors } from "../components/DividerMobile";
import Header from "../components/Header";
import useMenu from "../hooks/useMenu";
import HeaderPage from "../components/HeaderPage";
import React, { useState } from "react";
import { FiCalendar, FiPlay, FiPlus } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import EventTicketCard from "../components/EventTicketCard";
import ThirdButton from "../components/Button/Third";
import FooterPage from "../components/FooterPage";
import EmptyState from "../components/EmptyState";
import HeaderContainer from "../components/HeaderContainer";
import { Api } from "../services/api";
import { ApiLocal } from "../services/apiLocal";
import { IEvent, IGetAllEventsResponse } from "../interfaces/Event";
import { IPaginationData } from "../interfaces/Pagination";
import { useAppNavigation } from "../hooks/useAppNavigation";
import useHeader from "../hooks/useHeader";

interface IEventsPage {
  data: IGetAllEventsResponse;
}

const Inscricoes: NextPage<IEventsPage> = ({ data }) => {
  const { open, toggleMenu } = useMenu();
  const [paginator, setPaginator] = useState<IPaginationData>(data.pagination);
  const [events, setEvents] = useState<IEvent[]>([] as IEvent[]);
  const [loading, setLoading] = useState(false);
  const { goTo: goToHook } = useAppNavigation();
  const { scrollActive, changeScroll } = useHeader();

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true });
  };

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
      title={"Inscrições"}
      changeScroll={changeScroll}
      openMenu={open}
      toggleMenu={toggleMenu}
    >
      <>
        <HeaderContainer active={scrollActive}>
          <Header toggleMenu={toggleMenu} />
        </HeaderContainer>
        {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <HeaderPage title={<>Inscrições</>} />
        <DividerMobile color={EDividerColors.white} />
        <div className={styles.container}>
          <div className={styles.grid}>
            {data.data.map((item) => (
              <EventTicketCard
                data={item}
                key={item.uuid}
                onSubscribe={() => goTo("/inscricoes/" + item.uuid)}
              />
            ))}
            {events.map((item) => (
              <EventTicketCard
                data={item}
                key={item.uuid}
                onSubscribe={() => goTo("/inscricoes/" + item.uuid)}
              />
            ))}

            {!data.data.length && <EmptyState />}
          </div>
          {paginator.page < paginator.totalPage && (
            <div className={styles.load_more}>
              <ThirdButton loading={loading} onClick={handleGetAll}>
                {loading ? (
                  <ImSpinner2 />
                ) : (
                  <>
                    <FiPlus /> ver mais
                  </>
                )}
              </ThirdButton>
            </div>
          )}
        </div>
        <FooterPage
          options={[
            {
              text: "Cultos e Eventos",
              icon: <FiPlay />,
              action: () => goTo("/events"),
            },
            {
              text: "Agenda",
              icon: <FiCalendar />,
              action: () => goTo("/schedule"),
            },
          ]}
        />
      </>
    </Website>
  );
};

export async function getStaticProps() {
  const api = new Api();
  const data = await api.getEvents(1, 20);

  return { props: { data } };
}

export default Inscricoes;

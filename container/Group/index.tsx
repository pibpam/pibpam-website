import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { FiCalendar, FiClock, FiInfo, FiMapPin, FiUser } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { IGroupPage } from "../../pages/groups";
import { IGroup } from "../../interfaces/Group";
import { PostMessageContext } from "../../contexts/postMessage";
import usePostMessage from "../../hooks/usePostMessage";
import useOpenMap from "../../hooks/useOpenMap";
import Website from "../../layout/container/Website";
import AppHeader from "../../components/AppHeader";
import Reveal from "../../components/Reveal";
import SectionTitle from "../../components/SectionTitle";
import EmptyState from "../../components/EmptyState";
import GroupItem from "../../components/GroupItem";
import Modal from "../../components/Modal";
import YTPlayer from "../../components/YTPlayer";

const Info: React.FC<{ icon: ReactNode, title: string, children: ReactNode }> = ({ icon, title, children }) => (
  <div className="flex items-start gap-3 rounded-md bg-brand-soft p-4">
    <span aria-hidden className="mt-1 shrink-0 text-brand-strong">{icon}</span>
    <div className="min-w-0">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 whitespace-pre-line text-ink-muted">{children}</p>
    </div>
  </div>
)

const Group: React.FC<IGroupPage> = ({ data }) => {
  const [mapUrl, setMapUrl] = useState("");
  const { openLink } = usePostMessage();
  const { getHref } = useOpenMap();
  const [selectedGroup, setSelectedGroup] = useState<undefined | IGroup>(
    undefined,
  );
  const { deviceInfo } = useContext(PostMessageContext);

  const waitToClick = useRef(false);

  useEffect(() => {
    setMapUrl(
      selectedGroup?.addressRedirect
        ? getHref(selectedGroup?.addressRedirect)
        : "",
    );
  }, [selectedGroup?.addressRedirect, getHref]);

  const handleOpen = (data?: IGroup) => {
    if (waitToClick.current && data) {
      return;
    }

    waitToClick.current = true;
    setSelectedGroup(data);

    if (!data) {
      setTimeout(() => {
        waitToClick.current = false;
      }, 1000);
    }
  };

  return (
    <Website title={"Pequenos Grupos"} hasTabNavigator={false}>
      <>
        <AppHeader title="Pequenos Grupos" />
        <Container className="pt-6 pb-16">
          {data.length ? (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((item, i) => (
                <Reveal as="li" index={i} key={item.uuid}>
                  <GroupItem
                    onClick={() => {
                      if (!selectedGroup) handleOpen(item);
                    }}
                    group={item}
                  />
                </Reveal>
              ))}
            </ul>
          ) : (
            <EmptyState />
          )}
        </Container>
        <Modal
          blockClick
          isOpen={!!selectedGroup}
          onClose={() => handleOpen(undefined)}
        >
          <div className="px-5 pt-6" style={{ paddingBottom: (deviceInfo?.bottom || 0) + 32 }}>
            {selectedGroup && (
              <div className="flex flex-col gap-5">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-balance">{selectedGroup.title}</h1>
                  {selectedGroup.shortDescription && (
                    <p className="mt-1 text-lg font-medium text-ink-muted">{selectedGroup.shortDescription}</p>
                  )}
                </div>

                <div className="flex flex-col gap-3 rounded-lg border border-line p-4">
                  {selectedGroup.dayDescription && (
                    <p className="flex items-center gap-3 font-semibold">
                      <FiCalendar aria-hidden className="text-brand-strong" />{selectedGroup.dayDescription}
                    </p>
                  )}
                  {selectedGroup.timeDescription && (
                    <p className="flex items-center gap-3 font-semibold">
                      <FiClock aria-hidden className="text-brand-strong" />{selectedGroup.timeDescription}
                    </p>
                  )}
                  {selectedGroup.address && (
                    <div className="flex items-start gap-3">
                      <FiMapPin aria-hidden className="mt-1 shrink-0 text-brand-strong" />
                      <div>
                        <p>{selectedGroup.address}</p>
                        {mapUrl && (
                          <button
                            type="button"
                            onClick={() => openLink(mapUrl)}
                            className="mt-1 font-semibold text-brand-strong underline underline-offset-4"
                          >
                            Como chegar
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {selectedGroup.description && (
                  <div>
                    <SectionTitle>Descrição</SectionTitle>
                    <div
                      className="leading-relaxed text-ink-muted [&_a]:font-semibold [&_a]:text-brand-strong [&_a]:underline [&_p]:mb-3"
                      dangerouslySetInnerHTML={{ __html: selectedGroup.description }}
                    />
                  </div>
                )}

                {!!selectedGroup.promotionalVideo && (
                  <div className="overflow-hidden rounded-md bg-pine">
                    <YTPlayer videoId={selectedGroup.promotionalVideo} />
                  </div>
                )}

                {selectedGroup.info && (
                  <Info icon={<FiInfo />} title="Mais informações">{selectedGroup.info}</Info>
                )}

                {selectedGroup.lider && (
                  <Info icon={<FiUser />} title="Líder(es)">{selectedGroup.lider}</Info>
                )}
              </div>
            )}
          </div>
        </Modal>
      </>
    </Website>
  );
};

export default Group;

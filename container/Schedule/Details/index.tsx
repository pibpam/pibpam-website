import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { FiAlertOctagon, FiCalendar, FiClock, FiEdit3, FiInfo, FiMapPin, FiUsers } from "react-icons/fi";
import { Container } from "@/components/ui/Container";
import { formatTime, formatWeekdayDate } from "@/lib/format";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import useOpenMap from '../../../hooks/useOpenMap';
import usePostMessage from '../../../hooks/usePostMessage';
import AppButton from "../../../components/AppButton";
import Reveal from "../../../components/Reveal";
import AppMinistryCard from "../../../components/AppMinistryCard";
import YTPlayer from '../../../components/YTPlayer';
import { IScheduleDate } from '../../../interfaces/Schedule';
import SectionTitle from "../../../components/SectionTitle";

interface ISchedule {
  data: IScheduleDate
}

const InfoRow: React.FC<{ icon: ReactNode, children: ReactNode }> = ({ icon, children }) => (
  <div className="flex items-start gap-3">
    <span aria-hidden className="mt-1 text-lg text-brand-strong">{icon}</span>
    <div className="min-w-0 flex-1">{children}</div>
  </div>
)

const DetailsSchedule: React.FC<ISchedule> = ({ data }) => {
  const { goTo } = useAppNavigation()
  const { getHref } = useOpenMap()
  const [mapUrl, setMapUrl] = useState('')
  const { openLink } = usePostMessage()
  const { schedule } = data

  useEffect(() => {
    setMapUrl(schedule.addressRedirect ? getHref(schedule.addressRedirect) : "")
  }, [schedule.addressRedirect, getHref])

  return (
    <Container className="pt-5 pb-16">
      {schedule.image && (
        <Reveal index={0} className="relative aspect-video overflow-hidden rounded-md bg-pine-soft">
          <Image src={schedule.image} alt="" fill priority sizes="100vw" className="object-cover" />
        </Reveal>
      )}

      <Reveal index={1}>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-balance">{schedule.title.trim()}</h1>
        {schedule.shortDescription && (
          <p className="mt-1 text-lg font-medium text-ink-muted">{schedule.shortDescription}</p>
        )}
      </Reveal>

      <Reveal index={2} className="mt-6 flex flex-col gap-4 rounded-lg border border-line bg-paper p-5 shadow-sm">
        <InfoRow icon={<FiCalendar />}>
          <p className="font-semibold first-letter:uppercase">{formatWeekdayDate(data.scheduleDate)}</p>
        </InfoRow>
        <InfoRow icon={<FiClock />}>
          <p className="font-semibold">{formatTime(data.scheduleDate)}</p>
        </InfoRow>
        {schedule.address && (
          <InfoRow icon={<FiMapPin />}>
            <p>{schedule.address}</p>
            {mapUrl && (
              <button
                type="button"
                onClick={() => openLink(mapUrl)}
                className="mt-1 font-semibold text-brand-strong underline underline-offset-4"
              >
                Como chegar
              </button>
            )}
          </InfoRow>
        )}
        {schedule.publicSchedule && (
          <InfoRow icon={<FiUsers />}>
            <p><span className="font-semibold">Público:</span> {schedule.publicSchedule}</p>
          </InfoRow>
        )}
        {!!schedule.vacancies && (
          <InfoRow icon={<FiAlertOctagon />}>
            <p className="font-semibold">Vagas limitadas.</p>
          </InfoRow>
        )}
      </Reveal>

      {schedule.enrollmentLink && (
        <Reveal index={3} className="mt-5">
          <AppButton size="lg" icon={<FiEdit3 aria-hidden />} onClick={() => openLink(schedule.enrollmentLink as string)}>
            Inscrição
          </AppButton>
        </Reveal>
      )}

      {schedule.description && (
        <Reveal index={4} className="mt-8">
          <SectionTitle>Descrição</SectionTitle>
          <div
            className="leading-relaxed text-ink-muted [&_a]:font-semibold [&_a]:text-brand-strong [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: schedule.description }}
          />
        </Reveal>
      )}

      {!!schedule.promotionalVideo && (
        <div className="mt-6 overflow-hidden rounded-md bg-pine">
          <YTPlayer videoId={schedule.promotionalVideo} />
        </div>
      )}

      {schedule.extraData && (
        <div className="mt-6 flex items-start gap-3 rounded-md bg-brand-soft p-4">
          <FiInfo aria-hidden className="mt-1 shrink-0 text-brand-strong" />
          <div>
            <p className="font-semibold">Mais informações</p>
            <p className="mt-1 whitespace-pre-line text-ink-muted">{schedule.extraData}</p>
          </div>
        </div>
      )}

      {schedule.team && (
        <Reveal index={5} className="mt-10">
          <SectionTitle>Organizador</SectionTitle>
          <AppMinistryCard
            data={schedule.team}
            onClick={() => goTo({ pathname: "/ministry/" + schedule.team?.uuid })}
          />
        </Reveal>
      )}
    </Container>
  )
}

export default DetailsSchedule

import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import EmptyState from "../../../components/EmptyState";
import HeaderMember from "../../../components/HeaderMember";
import Modal from "../../../components/Modal";
import { PostMessageContext } from "../../../contexts/postMessage";
import { UserContext } from "../../../contexts/user";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { ICohortLesson } from "../../../interfaces/Cohort";
import Website from "../../../layout/container/Website";
import { ApiLocal } from "../../../services/apiLocal";
import { DateUtils } from "../../../utils/Date";
import {
  ActionButton,
  Container,
  LessonCard,
  List,
  ModalContent,
  ParticipantItem,
  ParticipantList,
  PresenceGroup,
} from "../../../styles/MemberCohorts";
import { PiArrowLeft } from "react-icons/pi";

const CohortLessonsPage: NextPage = () => {
  const router = useRouter();
  const { token } = useContext(UserContext);
  const { deviceInfo } = useContext(PostMessageContext);
  const { goTo } = useAppNavigation();

  const { cohortUuid, cohortName } = router.query;

  const [lessons, setLessons] = useState<ICohortLesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<ICohortLesson | null>(null);
  const [presenceDraft, setPresenceDraft] = useState<Record<string, boolean>>({});

  const getLessons = async (authToken: string, cohortId: string) => {
    setLoading(true);
    try {
      const api = new ApiLocal();
      const data = await api.getCohortLessons(authToken, cohortId);
      setLessons(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && cohortUuid && !Array.isArray(cohortUuid)) {
      getLessons(token, cohortUuid);
    }
  }, [token, cohortUuid]);

  const selectedLessonParticipants = useMemo(
    () => selectedLesson?.cohort?.cohortParticipants || [],
    [selectedLesson]
  );

  const openAttendanceModal = (lesson: ICohortLesson) => {
    const draft: Record<string, boolean> = {};

    lesson.cohort.cohortParticipants.forEach((cohortParticipant) => {
      const currentAttendance = lesson.attendances.find(
        (attendance) =>
          attendance.cohortParticipant?.uuid === cohortParticipant.uuid
      );

      draft[cohortParticipant.uuid] = currentAttendance?.present ?? false;
    });

    setPresenceDraft(draft);
    setSelectedLesson(lesson);
  };

  const handleChangePresence = (
    cohortParticipantUuid: string,
    present: boolean
  ) => {
    setPresenceDraft((prev) => ({ ...prev, [cohortParticipantUuid]: present }));
  };

  const handleSaveAttendance = async () => {
    if (!selectedLesson || !token) {
      return;
    }

    setSaving(true);

    try {
      const api = new ApiLocal();
      await api.saveAttendanceBatch(token, {
        lessonUuid: selectedLesson.uuid,
        participants: selectedLessonParticipants.map((cohortParticipant) => ({
          cohortParticipantUuid: cohortParticipant.uuid,
          present: !!presenceDraft[cohortParticipant.uuid],
          observation: "",
        })),
      });

      if (cohortUuid && !Array.isArray(cohortUuid)) {
        await getLessons(token, cohortUuid);
      }

      setSelectedLesson(null);
    } catch (error) {
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Website
        hasTabNavigator={false}
        title={"Área de membros"}
        openMenu={false}
        toggleMenu={() => {}}
      >
        <>
          <HeaderMember
            goBack={() => goTo({ pathname: "/member/cohorts" })}
            title={Array.isArray(cohortName) ? "Turma" : cohortName || "Turma"}
          />

          <Container>
            <p>
              Selecione a lesson desejada para lançar presença dos
              participantes.
            </p>

            {!loading && !lessons.length && (
              <EmptyState description="Essa turma ainda não possui lessons cadastradas." />
            )}

            <List>
              {lessons.map((lesson) => (
                <LessonCard key={lesson.uuid}>
                  <div>
                    {DateUtils.formatDateDayAndMonth(lesson.date)} às{" "}
                    {DateUtils.formatTime(lesson.date)}
                  </div>
                  <div>{lesson.title}</div>
                  <p>{lesson.description || "Sem descrição"}</p>
                  <ActionButton onClick={() => openAttendanceModal(lesson)}>
                    Lançar presença
                  </ActionButton>
                </LessonCard>
              ))}
            </List>
          </Container>
        </>
      </Website>

      <Modal
        isOpen={!!selectedLesson}
        onClose={() => {
          if (!saving) {
            setSelectedLesson(null);
          }
        }}
      >
        <ModalContent bottom={deviceInfo?.bottom}>
          <h1>
            <button onClick={() => setSelectedLesson(null)}>
              <PiArrowLeft />
            </button>
            Lançar presença
          </h1>
          <p>
            <strong>{selectedLesson?.title}</strong>
            <span>
              Aula -{" "}
              {selectedLesson?.date && DateUtils.formatDateDayAndMonth(
                selectedLesson.date
              )}
            </span>
          </p>

          <ParticipantList>
            {selectedLessonParticipants.sort((a, b) => a.participant.member.name.localeCompare(b.participant.member.name)).map((cohortParticipant) => (
              <ParticipantItem key={cohortParticipant.uuid}>
                <div>{cohortParticipant.participant.member.name}</div>
                <PresenceGroup>
                  <button
                    className={
                      presenceDraft[cohortParticipant.uuid] ? "active" : ""
                    }
                    onClick={() =>
                      handleChangePresence(cohortParticipant.uuid, true)
                    }
                  >
                    <FiCheck /> Sim
                  </button>
                  <button
                    className={
                      !presenceDraft[cohortParticipant.uuid] ? "active" : ""
                    }
                    onClick={() =>
                      handleChangePresence(cohortParticipant.uuid, false)
                    }
                  >
                    <FiX /> Não
                  </button>
                </PresenceGroup>
              </ParticipantItem>
            ))}
          </ParticipantList>

          <ActionButton onClick={handleSaveAttendance} disabled={saving}>
            {saving ? "Salvando..." : "Salvar presenças"}
          </ActionButton>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CohortLessonsPage;

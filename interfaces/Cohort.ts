export interface ICohortMinistry {
  uuid: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string | null;
}

export interface ICohortChurch {
  uuid: string;
  name: string;
  created_at: string;
}

export interface ICohort {
  uuid: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  ministry: ICohortMinistry;
  church: ICohortChurch;
}

export interface IAttendanceMember {
  uuid: string;
  name: string;
  image: string | null;
}

export interface IAttendanceParticipant {
  uuid: string;
  member: IAttendanceMember;
}

export interface ICohortParticipant {
  uuid: string;
  created_at: string;
  participant: IAttendanceParticipant;
}

export interface ILessonAttendance {
  uuid: string;
  present: boolean;
  observation: string;
  created_at: string;
  updated_at: string;
  cohortParticipant: {
    uuid: string;
  };
}

export interface ICohortLesson {
  uuid: string;
  date: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  cohort: {
    uuid: string;
    name: string;
    description: string;
    cohortParticipants: ICohortParticipant[];
  };
  attendances: ILessonAttendance[];
}

export interface IAttendanceBatchParticipantPayload {
  cohortParticipantUuid: string;
  present: boolean;
  observation: string;
}

export interface IAttendanceBatchPayload {
  lessonUuid: string;
  participants: IAttendanceBatchParticipantPayload[];
}

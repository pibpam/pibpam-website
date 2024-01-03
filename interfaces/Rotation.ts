type IAvailabilityRotationMembers = {
  status: 'unavailable' | 'available' | 'unknown'
}

type IRotationItem = {
  uuid: string;
  title: string | null;
  type: string;
  rotationDate: string | null;
  rotationDateStart: string | null;
  rotationDateEnd: string | null;
  rotationDateTimes: string; // Assuming it's a string representation of an array
  created_at: string;
  availabilityRotationMembers: IAvailabilityRotationMembers[]; // You may replace `any[]` with a more specific type
};

export type IRotation = {
  uuid: string;
  title: string;
  status: string;
  closedAt: string | null;
  created_at: string;
  items: IRotationItem[];
};

type ITeam = {
  uuid: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  created_at: string;
  rotations: IRotation[];
};

export type IGetMemberRotations = ITeam[]
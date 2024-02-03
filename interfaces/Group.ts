export interface IGroup {
  uuid: string;
  title: string;
  shortDescription?: string;
  promotionalVideo?: string;
  description?: string;
  groupType?: 'PG';
  image?: string;
  address?: string;
  addressRedirect?: string;
  info?: string;
  dayDescription?: string;
  timeDescription?: string;
  lider?: string;
  liderContact?: string;
  deleted_at?: string;
  created_at: string;
}

export type IGetAllGroupResponse = IGroup[]


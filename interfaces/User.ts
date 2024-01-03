import { IMember } from "./Member";

export interface IUser {
  id: string;
  email: string;
  type: 'admin' | 'member';
  created_at: string;
  member: IMember;
}
import { IMember } from "./Member";

export interface IUser {
  id: string;
  email: string;
  type: "admin" | "user" | "master";
  created_at: string;
  member: IMember;
  name: string;
}
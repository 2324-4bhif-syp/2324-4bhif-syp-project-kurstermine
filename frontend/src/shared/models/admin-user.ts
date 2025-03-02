import {Organisation} from "@models/organisation";

export interface AdminUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  organisation: Organisation | null;
  roles: string[];
}

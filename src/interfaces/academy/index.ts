import { TeamInterface } from 'interfaces/team';
import { UserInterface } from 'interfaces/user';

export interface AcademyInterface {
  id?: string;
  name: string;
  user_id: string;
  team?: TeamInterface[];
  user?: UserInterface;
  _count?: {
    team?: number;
  };
}

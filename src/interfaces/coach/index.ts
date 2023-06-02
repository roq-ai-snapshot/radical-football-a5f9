import { TrainingPlanInterface } from 'interfaces/training-plan';
import { UserInterface } from 'interfaces/user';
import { TeamInterface } from 'interfaces/team';

export interface CoachInterface {
  id?: string;
  user_id: string;
  team_id: string;
  training_plan?: TrainingPlanInterface[];
  user?: UserInterface;
  team?: TeamInterface;
  _count?: {
    training_plan?: number;
  };
}

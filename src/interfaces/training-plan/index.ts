import { CoachInterface } from 'interfaces/coach';
import { PlayerInterface } from 'interfaces/player';

export interface TrainingPlanInterface {
  id?: string;
  name: string;
  description?: string;
  coach_id: string;
  player_id: string;

  coach?: CoachInterface;
  player?: PlayerInterface;
  _count?: {};
}

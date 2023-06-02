import { CoachInterface } from 'interfaces/coach';
import { EventInterface } from 'interfaces/event';
import { PlayerInterface } from 'interfaces/player';
import { AcademyInterface } from 'interfaces/academy';

export interface TeamInterface {
  id?: string;
  name: string;
  academy_id: string;
  coach?: CoachInterface[];
  event?: EventInterface[];
  player?: PlayerInterface[];
  academy?: AcademyInterface;
  _count?: {
    coach?: number;
    event?: number;
    player?: number;
  };
}

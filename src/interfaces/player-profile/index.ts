import { PlayerInterface } from 'interfaces/player';

export interface PlayerProfileInterface {
  id?: string;
  player_id: string;
  position?: string;
  skill_level?: number;

  player?: PlayerInterface;
  _count?: {};
}

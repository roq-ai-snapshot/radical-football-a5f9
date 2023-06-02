import * as yup from 'yup';

export const playerProfileValidationSchema = yup.object().shape({
  position: yup.string(),
  skill_level: yup.number().integer(),
  player_id: yup.string().nullable().required(),
});

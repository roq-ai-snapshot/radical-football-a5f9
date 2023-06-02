import * as yup from 'yup';

export const trainingPlanValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  coach_id: yup.string().nullable().required(),
  player_id: yup.string().nullable().required(),
});

import * as yup from 'yup';
import { trainingPlanValidationSchema } from 'validationSchema/training-plans';

export const coachValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  team_id: yup.string().nullable().required(),
  training_plan: yup.array().of(trainingPlanValidationSchema),
});

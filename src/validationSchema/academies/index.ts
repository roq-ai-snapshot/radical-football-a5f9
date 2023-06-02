import * as yup from 'yup';
import { teamValidationSchema } from 'validationSchema/teams';

export const academyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  team: yup.array().of(teamValidationSchema),
});

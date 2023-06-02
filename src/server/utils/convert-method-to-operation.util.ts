import { ResourceOperationEnum } from '@roq/prismajs/dist/src/authorization/enums';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
const methodMapping = {
  GET: ResourceOperationEnum.Read,
  POST: ResourceOperationEnum.Create,
  DELETE: ResourceOperationEnum.Delete,
  PUT: ResourceOperationEnum.Update,
};

export function convertMethodToOperation(method: HttpMethod) {
  return methodMapping[method];
}

import { ErrorOptions } from '@/types';

import { error } from './error';

export const badRequest = (options?: ErrorOptions) => {
  return error('BAD_REQUEST', options?.message ?? 'Bad request');
};

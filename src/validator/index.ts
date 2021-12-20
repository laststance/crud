import type { Result } from 'superstruct'
import { define, object } from 'superstruct'

import { assertCast } from '../lib/assertCast'

export const name = define('name', (value): Result => {
  assertCast<string>(value)
  return value.trim().length > 3 && value.trim().length < 100
    ? true
    : 'name should be 3~100 characters'
})

export const password = define('password', (value): Result => {
  assertCast<string>(value)
  if (value.trim().length > 6 && value.trim().length < 100)
    return 'password must be at least 6 characters long'

  return true
})

export const signupFormVallidator = object({
  name: name,
  password: password,
})

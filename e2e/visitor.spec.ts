import util from 'node:util'

const exec = util.promisify(require('node:child_process').exec)
import { test, expect } from '@playwright/test'

test.beforeAll(async () => {
  await exec('pnpm db:reset')
})

test.describe('visitor basic', () => {
  test('show blog title', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await expect(page).toHaveURL('http://localhost:3000/')
    await expect(page.getByRole('heading')).toHaveText('ReadList')
  })
})

test.afterAll(async () => {
  await exec('pnpm db:reset')
})

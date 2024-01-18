import util from 'node:util'

const exec = util.promisify(require('node:child_process').exec)
import { expect } from '@playwright/test'

import { sleep } from '../lib/sleep'

import { test } from './helper'

test.beforeAll(async () => {
  await exec('pnpm db:reset')
})

test.describe('login & logout', () => {
  test('show login button', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.keyboard.press('x')
    // Add the code to toggle the sidebar here
    const loginLink = page.getByTestId('login-link')
    expect(await loginLink.isVisible()).toBeTruthy()
  })

  test('failed login with incorrect user/password', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.keyboard.press('x')
    await page.click('[data-testid=login-link]')
    await page.fill('[data-testid=name-input]', 'wefjweiofjwie')
    await page.fill('[data-testid=password-input]', 'wfjweoifjio23r03')
    await page.click('[data-testid=submit-btn]')
    const snackbar = page.locator('[data-testid=snackbar]')
    expect(await snackbar.innerText()).toContain('USER DOES NOT EXIST')
  })

  test('successful Logout', async ({ authenticated: page }) => {
    await page.goto('http://localhost:3000')
    await page.keyboard.press('x')
    await page.click('[data-testid=logout-link]')
    expect(page.url()).toBe('http://localhost:3000/')
    const loginLink = page.getByTestId('login-link')
    expect(loginLink).toBeTruthy()
  })
})

test.describe('CRUD post operation', () => {
  test('create new post via Sidebar', async ({ authenticated: page }) => {
    await page.goto('http://localhost:3000')
    await page.click('header > div > a:has-text("ReadList")')
    await page.keyboard.press('x')
    await page.getByTestId('create-link').click()
    await expect(page).toHaveURL('http://localhost:3000/dashboard/create')
    await page.getByTestId('post-title-input').fill('from platwright')
    await page.getByTestId('post-body-input').fill('testing now')

    await page.getByTestId('submit-btn').click()

    await expect(page.getByTestId('snackbar')).toHaveText('New Post Created!')

    await expect(page.locator('main h1')).toContainText('from platwright')
    await expect(page.locator('main article')).toContainText('testing now')
    await expect(page.locator('[data-testid=edit-btn]')).toBeVisible()
  })

  test('create new post via Dashboard', async ({ authenticated: page }) => {
    await page.click('header > div > a:has-text("ReadList")')
    await page.keyboard.press('x')
    await page.getByTestId('create-link').click()
    await expect(page).toHaveURL('http://localhost:3000/dashboard/create')
    await page.getByTestId('post-title-input').fill('from platwright dash')
    await page.getByTestId('post-body-input').fill('testing now dash')

    await page.getByTestId('submit-btn').click()

    await sleep(1000) // wait fadeout past snackbar
    await expect(page.getByTestId('snackbar')).toHaveText('New Post Created!')

    await expect(page.locator('main h1')).toContainText('from platwright dash')
    await expect(page.locator('main article')).toContainText('testing now dash')
    await expect(page.locator('[data-testid=edit-btn]')).toBeVisible()
  })

  test('edit existing post', async ({ authenticated: page }) => {
    await page.goto('http://localhost:3000/')
    await expect(page.getByTestId('single-post-page-link-1')).toHaveText(
      'from platwright dash',
    )
    await page.getByTestId('single-post-page-link-1').click()
    await expect(page).toHaveURL('http://localhost:3000/post/72')
    await expect(page.locator('main h1')).toContainText('from platwright dash')
    await expect(page.locator('main article')).toContainText('testing now dash')
    await page.locator('[data-testid=edit-btn]').click()
    await page.getByTestId('edit-title-input').fill('Edit Title!')
    await page.getByTestId('edit-body-input').fill('Edit Post Contents!')

    await page.getByTestId('update-btn').click()
    await expect(page).toHaveURL('http://localhost:3000/post/72')
    await expect(page.locator('main h1')).toContainText('Edit Title!')
    await expect(page.locator('main article')).toContainText(
      'Edit Post Contents!',
    )
  })

  // it('delete post', () => {
  //   cy.login()
  //   cy.visit('http://localhost:3000/')
  //   cy.toggleSidebar()
  //   cy.$('dashboard-link').contains('Dashboard').click()
  //   cy.url().should('eq', 'http://localhost:3000/dashboard')
  //   cy.get('main').contains('Edit Title!')
  //   cy.$('delete-btn-1').contains('Delete').click()
  //   cy.url().should('eq', 'http://localhost:3000/dashboard')
  //   cy.get('main').should('not.contain', 'Edit Title!')
  // })
})

test.afterAll(async () => {
  await exec('pnpm db:reset')
})

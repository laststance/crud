import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { HistoryRouter } from 'redux-first-history/rr6'

import { history } from '../../redux/store'

import Header from './Header'

const meta: Meta<typeof Header> = {
  title: 'Components/Layout/Header',
  component: Header,
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Header> = {
  render: () => (
    <HistoryRouter history={history}>
      <Header />
    </HistoryRouter>
  ),
}

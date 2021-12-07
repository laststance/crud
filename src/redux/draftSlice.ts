import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from './store'

export interface DraftState {
  title: Post['title']
  body: Post['body']
}

const initialState: DraftState = {
  title: '',
  body: '',
}

export const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    updateTitle: (
      state,
      action: PayloadAction<{ title: DraftState['title'] }>
    ) => {
      state.title = action.payload.title
    },
    updateBody: (
      state,
      action: PayloadAction<{ body: DraftState['body'] }>
    ) => {
      state.body = action.payload.body
    },
    clearDraft: (state) => {
      state.title = ''
      state.body = ''
    },
  },
})

export const selectDraftState = (state: RootState): DraftState => state.draft
export const selectTitle = (state: RootState): DraftState['title'] => state.draft.title /* eslint-disable-line prettier/prettier */
export const selectBody = (state: RootState): DraftState['body'] => state.draft.body /* eslint-disable-line prettier/prettier */

export const { updateTitle, updateBody, clearDraft } = draftSlice.actions

export default draftSlice.reducer

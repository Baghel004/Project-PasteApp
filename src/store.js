import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteslice.js'

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
})

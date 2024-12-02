import { configureStore } from '@reduxjs/toolkit'
import anecdotes from './anecdoteReducer'
import filter from './anecFilterReducer'
import notifications from './notificationReducer'

export default configureStore({
    reducer: {
        anecdotes, // FIXME: Give proper names
        filter,
        notifications,
    }
})
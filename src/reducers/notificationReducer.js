import { createSlice } from "@reduxjs/toolkit";

const initialNotifs = [
    // "Notification number 1!",
    // "Notification number 2!",
]

const createNotifId = () => (100000 * Math.random()).toFixed(0)

const toNotifObject = (content) => ({
    id: createNotifId(),
    content,
})

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialNotifs.map(n => toNotifObject(n)),
    reducers: {
        addNotif: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            // TODO: LEARN BETTER
            // The prepare callback is a Redux Toolkit feature specifically designed for this kind of preprocessing before the reducer runs.
            // Allows action to have other generated data on it and access that in dispatch callsites (otherwise couldn't get ID on creation)
            prepare: (content) => {
                return { payload: toNotifObject(content) }
            }
        },
        removeNotif: (state, action) => {
            return state.filter(n => n.id !== action.payload)
        }
    }
})

export default notificationSlice.reducer
export const { addNotif, removeNotif } = notificationSlice.actions
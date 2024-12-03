import { createSlice } from "@reduxjs/toolkit"
import * as anecdoteService from '../services/anecdotes' // TODO: Should be DI as part of store initialisation

  // FIXME: This access path seems poor. Mandates thunks need to know where their reducers store is on global tree
  // Feel like a action/thunk shouldn't have to know the path that it's own reducers state is stored on in global store
  // Anyway to pass different variable ot have this auto get it's own state, not global?
const selectAnecdotes = (state) => state.anecdotes;

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      state.forEach(anecdote => {
        if (anecdote.id === action.payload) {
          anecdote.votes += 1
        }
      })
    },
    addAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export default anecdoteSlice.reducer
export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

// Thunks - turns call site do(X).then(dispatch(Y)) into dispatch(Z)

//  "thunk action creator"
export const initializeAnecdotes = () => {
  // thunk action
  return async (dispatch, getState) => { // eslint-disable-line no-unused-vars
    anecdoteService.list()
      .then(a => {
        dispatch(setAnecdotes(a)) // This sees the setAnecdotes export. Works wherever it is because hoisting
      })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch, getState) => { // eslint-disable-line no-unused-vars
    console.log({content});
    const newAnecdote = await anecdoteService.create(content)
    const addAction = addAnecdote(newAnecdote)
    dispatch(addAction)
    return addAction
  }
}

export const addVote = (anecdoteId) => {
  return async (dispatch, getState) => {
    console.log({anecdoteId})
    // FIXME: This access path seems poor. Mandates thunks need to know where their reducers store is on global tree
    const anecdotes = selectAnecdotes(getState())
    const anecdote = anecdotes.find(a => a.id === anecdoteId)
    const respVote = await anecdoteService.setVotes(anecdoteId, anecdote.votes + 1)
    console.log({respVote});
    dispatch(voteAnecdote(anecdoteId))  // TODO: Weird, can desync here as not setting vote to what BE returned. Should refactor it to a setVote but whatever
  }
}
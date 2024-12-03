import { createSlice } from "@reduxjs/toolkit"
import * as anecdoteService from '../services/anecdotes' // FIXME: Should be DI as part of store initialisation


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
    const state = getState()
    console.log({state});
    const anecdote = state.anecdotes.find(a => a.id === anecdoteId)
    console.log({anecdote})
    const respVote = await anecdoteService.setVotes(anecdoteId, anecdote.votes + 1)
    console.log({respVote});
    dispatch(voteAnecdote(anecdoteId)) // TODO: Weird, can desync here as not setting vote to what BE returned. Should refactor it to a setVote but whatever
  }
}
import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      state.forEach(anecdote=>{
        if (anecdote.id === action.payload) {
          anecdote.votes+=1
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
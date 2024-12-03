import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { addVote } from '../reducers/anecdoteReducer'
import AnecdoteFilter from './AnecdoteFilter'
import { useNotification } from '../hooks/useNotification'

// Memoize as sort/filter returns new object everytime
const selectSortedAnecdotes = createSelector(
    state => state.anecdotes,
    state => state.filter,
    (anecdotes, filter) => {
        return [...anecdotes]
            .filter(a => a.content.includes(filter))
            .sort((a, b) => b.votes - a.votes)
    }
)

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(selectSortedAnecdotes)
    const notify = useNotification()
    const handleVote = (anecdote) => {
        dispatch(addVote(anecdote.id))
        notify(`Voted for ${anecdote.content}`)
    }
    return (
        <>
            <h2>Anecdotes</h2>
            <AnecdoteFilter />
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList
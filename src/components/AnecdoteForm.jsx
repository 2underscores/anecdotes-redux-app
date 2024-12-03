import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { useNotification } from '../hooks/useNotification'
import { create as anecdoteServiceCreate } from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const notify = useNotification()

    const submitCreateNote = async (e) => {
        e.preventDefault()
        const anecdoteContent = new FormData(e.target).get('newAnecdote')
        const newAnecdote = await anecdoteServiceCreate(anecdoteContent)
        console.log({newAnecdote})
        dispatch(addAnecdote(newAnecdote))
        notify(`Added Anecdote: ${newAnecdote}`)
        e.target.reset()
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={submitCreateNote}>
                <label htmlFor="newAnecdote">Anecdote:</label>
                <div><input id="newAnecdote" name="newAnecdote" /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { useNotification } from '../hooks/useNotification'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const notify = useNotification()

    const submitCreateNote = (e) => {
        e.preventDefault()
        const anecdoteContent = new FormData(e.target).get('newAnecdote')
        dispatch(addAnecdote(anecdoteContent))
        notify(`Added Anecdote: ${anecdoteContent}`)
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
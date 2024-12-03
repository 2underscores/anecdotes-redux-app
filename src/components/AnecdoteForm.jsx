import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useNotification } from '../hooks/useNotification'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const notify = useNotification()

    // Components should not know about service like this.
    // Avoid pattern: svc.post().then(res=>dispatch(res.data))
    // Component should only depend on state! And this flow passes things like ID fropm DB to dispatch call
    // TODO: CONFIRM - redux thunks for abstracting that behind a dispatch(rawContent) interface, no ID info
    // TODO: What if subsequently want ID? Think probs has a return or could use action prepare
    const submitCreateNote = async (e) => {
        e.preventDefault()
        const anecdoteContent = new FormData(e.target).get('newAnecdote')
        // Shouldn't really get ID from action? Break one way data flow?
        const DispatchCreateAnecdote = await dispatch(createAnecdote(anecdoteContent))
        console.log({DispatchCreateAnecdote});
        notify(`Added Anecdote: id=${DispatchCreateAnecdote.payload.id}, content=${DispatchCreateAnecdote.payload.content}`)
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
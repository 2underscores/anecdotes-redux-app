import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import * as anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    anecdoteService.list()
    .then(a => {
      dispatch(setAnecdotes(a))
    })
  }, [])

  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
      <Notification/>
    </div>
  )
}

export default App
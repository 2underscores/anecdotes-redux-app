import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(initializeAnecdotes())
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
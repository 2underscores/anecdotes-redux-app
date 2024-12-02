import { updateFilter } from "../reducers/anecFilterReducer"
import { useDispatch } from "react-redux"

const AnecdoteFilter = () => {
    const dispatch = useDispatch()

    return (
        <div style={{marginBottom: 10}}>
            <label htmlFor="anecdoteFilter">Filter:</label>
            <input type="text" id="anecdoteFilter" name="anecdoteFilter" onChange={e => {dispatch(updateFilter(e.target.value))}}></input>
        </div>
    )
}

export default AnecdoteFilter
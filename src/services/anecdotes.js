import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const list = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}

const create = async (content) => {
    const resp = await axios.post(baseUrl, {content, votes: 0})
    console.log(resp);
    return resp.data
}

const setVotes = async (id, newVotes) => {
    // Could do a GET then POST to increment, but has same hole of FE decides the final value
    // In prod, wouldn't use json DB and instead use BE with a vote endpoint that server side incremented (if requesting user unique)
    const resp = await axios.patch(`${baseUrl}/${id}`, {votes: newVotes})
    return resp.data
}

export { list, create, setVotes}
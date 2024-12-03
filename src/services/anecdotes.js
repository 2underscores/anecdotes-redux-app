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

export { list, create }
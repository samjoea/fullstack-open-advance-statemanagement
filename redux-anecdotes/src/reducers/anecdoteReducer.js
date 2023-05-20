import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: anecdotesAtStart.map(asObject),
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      return [...state, content]
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      const changedAnecdote = action.payload.changedAnecdote
      return state
        .map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
        .sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      const anecdote = action.payload
      return [...state, anecdote]
    }
  }
})

export const { updateAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const response = await anecdoteService.getAll()
    dispatch(setAnecdotes(response))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const response = await anecdoteService.createNew(content)
    dispatch(createAnecdote(response))
  }
}

export const addVotes = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToChange = getState().anecdotes.find(n => n.id === id)
        const changedAnecdote = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1
        }
    const updatedAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch(updateAnecdote({ id, changedAnecdote: updatedAnecdote }))
  }
}

export default anecdoteSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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

// eslint-disable-next-line no-unused-vars
const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      const content = action.payload
      return state.concat(content)
    },
    incrementVotes(state, action) {
      const id = action.payload.id
      const changedAnecdote = action.payload.newObject
      return state.map(anec => anec.id !== id ? anec : changedAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { newAnecdote, incrementVotes, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const anec = await anecdoteService.createNew(content)
    dispatch(newAnecdote(anec))
  }
}
export const updateVotes = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdoteToChange = state.anecdotes.find(n => n.id === id)
    const newObject = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
    dispatch(incrementVotes({ id, newObject }))
    await anecdoteService.update(id, newObject)
  }
}
export default anecdoteSlice.reducer
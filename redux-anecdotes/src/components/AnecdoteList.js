import { useDispatch, useSelector } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return [...state.anecdotes].sort((first, second) => second.votes - first.votes)
  })
  const filter = useSelector(({ filter }) => filter)
  const anecdotesToShow = filter
  ? anecdotes.filter(anec => anec.content.toLowerCase()
      .includes(filter.toLowerCase()))
  : anecdotes

  const vote = (id) => {
    dispatch(updateVotes(id))
    dispatch(setNotification('Thanks for voting!', 5))
  }

  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './service/anecdotesServices'
import { useSetNotification } from './contexts/NotificationContextProvider'

const App = () => {
  const queryClient = useQueryClient()
  const setNotification = useSetNotification()


  const updateAnecdote = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: (apiData) => { 
      const oldData = queryClient.getQueryData('anecdotes')
      const newData = oldData.map((anecdote) => anecdote.id === apiData.id ? apiData : anecdote)
      queryClient.setQueryData('anecdotes', newData)
      setNotification(`you voted '${apiData.content}'`)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdote.mutate({
        id: anecdote.id,
        newObject: { ...anecdote, votes: anecdote.votes + 1 }
      })
  }

  const anecdotes = useQuery({
    queryKey: 'anecdotes',
    queryFn: anecdoteService.getAll,
    retry: 1,
  })

  if (anecdotes.status === 'error') {
    console.log(anecdotes.error)
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {
        !anecdotes.isLoading ?
          anecdotes.data
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
        ): <p>Loading...</p>
      }
    </div>
  )
}

export default App

import { useMutation, useQueryClient } from "react-query"
import anecdoteService from "../service/anecdotesServices"
import { useSetNotification } from "../contexts/NotificationContextProvider"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const setNotification = useSetNotification()

  const createAnecdote = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (apiData) => {
      const oldData = queryClient.getQueryData('anecdotes')
      const newData = [...oldData, apiData]
      queryClient.setQueryData('anecdotes', newData)
      setNotification(`a new anecdote ${apiData.content} created!`)
    },
    onError: (error) => {
      setNotification(error.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

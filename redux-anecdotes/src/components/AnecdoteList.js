import React from 'react'
import { addVotes } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
      const { anecdotes, filter } = state
      if (filter !== '') { 
         return anecdotes.filter(anecdote => anecdote.content.includes(filter))
      }
      return anecdotes
   })
  const dispatch = useDispatch()

   const vote = (id) => {
     dispatch(addVotes(id))
   }
 
   return (
     <div>
       {
         anecdotes
           .map(anecdote =>
             <div key={anecdote.id}>
               <div>
                 {anecdote.content}
               </div>
               <div>
                 has {anecdote.votes}
                 <button onClick={() => {
                   dispatch(setNotificationWithTimeout(`you voted '${anecdote.content}'`, 5))
                   vote(anecdote.id)
                 }}>vote</button>
               </div>
             </div>
         )
       }
   </div>
    )
 }

export default AnecdoteList
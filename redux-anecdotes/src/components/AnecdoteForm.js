import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
   const dispatch = useDispatch()

   const addAnecdote = async (event) => {
     event.preventDefault()
     const content = event.target.anecdote.value
     event.target.anecdote.value = ''
     dispatch(createNewAnecdote(content))
  }
  
   return (
     <div>
         <h2>create new</h2>
       <form
         onSubmit={addAnecdote}
       >
         <div>
           <input
             name="anecdote"
             type='text'
           />
         </div>
           <button>create</button>
         </form>
      </div>
   )
 }

export default AnecdoteForm
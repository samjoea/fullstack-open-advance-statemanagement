import { createContext, useContext, useMemo, useReducer } from "react"

const notificationReducer = (state, action) => {
   switch (action.type) { 
      case 'SET_NOTIFICATION':
         return action.data
      case 'REMOVE_NOTIFICATION':
         return ''
      default: return state
   }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
   const [notification, dispatch] = useReducer(notificationReducer, '')

   const setNotification = (message) => {
      dispatch({
         type: 'SET_NOTIFICATION',
         data: message
      })
   }
   const removeNotification = () => {
      dispatch({
         type: 'REMOVE_NOTIFICATION'
      })
   }
   if(notification) setTimeout(removeNotification, 5000)

   const notificationFunctions = useMemo(() => ({
         notification,
         setNotification,
      }), [notification])

   return (
      <NotificationContext.Provider value={ notificationFunctions }>
         {children}
      </NotificationContext.Provider>
   )
}

export const useNotification = () => {
   const context = useContext(NotificationContext)
   return context.notification
}

export const useSetNotification = () => { 
   const context = useContext(NotificationContext)
   return context.setNotification
}

export default NotificationContext
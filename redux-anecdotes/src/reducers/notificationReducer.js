import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  timeoutCounter: 0
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      const message = action.payload
      return {
        message: message, 
        timeoutCounter: state.timeoutCounter + 1
      }
    },
    removeMessage(state, action) {
      if (action.payload === state.timeoutCounter) {
        return initialState
      }
      else return state
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions
export const setNotification = (message, seconds) => {
  return async (dispatch, getState) => {
    dispatch(setMessage(message))
    const timeoutCounter = getState().notification.timeoutCounter
    console.log(timeoutCounter)
    setTimeout(() => {
      dispatch(removeMessage(timeoutCounter))
    }, seconds * 1000)
  }
}
export default notificationSlice.reducer
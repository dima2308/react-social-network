const ADD_MESSAGE = 'ADD-MESSAGE'

let initialState = {
  dialogs: [
    { id: 1, name: 'Dima' },
    { id: 2, name: 'Oleg' },
    { id: 3, name: 'Alex' }
  ],

  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'Buy' },
    { id: 3, message: "What's up?" }
  ]
}

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      let text = action.message
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: text }]
      }
    }

    default:
      return state
  }
}

export const addMessage = (message) => ({ type: ADD_MESSAGE, message })

export default messagesReducer
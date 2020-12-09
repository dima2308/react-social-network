import messagesReducer from "./messagesReducer"
import profileReducer from "./profileReducer"


let store = {
  _state: {
    profile: {
      posts: [
        { id: 1, message: "Hi, all is good", author: "Dima" },
        { id: 2, message: "How are you?", author: "Olya" },
        { id: 3, message: "What's up?", author: "Oleg" },
      ],
      newPostText: ''
    },

    messages: {
      dialogs: [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Oleg' },
        { id: 3, name: 'Alex' }
      ],

      messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Buy' },
        { id: 3, message: "What's up?" }
      ],
      newTextMessage: ''
    }
  },

  _subscriber() { },

  subscribe(observer) {
    this._subscriber = observer
  },

  getState() {
    return this._state
  },

  dispatch(action) {
    this._state.profile = profileReducer(this._state.profile, action)
    this._state.messages = messagesReducer(this._state.messages, action)
    this._subscriber(this._state)
  }
}

export default store
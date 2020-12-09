import { profileAPI } from "../api/api"

const ADD_POST = 'ADD-POST'
const DELETE_POST = 'DELETE-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_USER_STATUS = 'SET-USER-STAUS'
const UPDATE_USER_STATUS = 'UPDATE-USER-STATUS'

let initialState = {
  posts: [
    { id: 1, message: "Hi, all is good", author: "Dima" },
    { id: 2, message: "How are you?", author: "Olya" },
    { id: 3, message: "What's up?", author: "Oleg" },
  ],
  newPostText: '',
  profile: null,
  status: ''
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.post,
        author: 'Alex'
      }

      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    }

    case SET_USER_PROFILE: {
      return {
        ...state, profile: action.profile
      }
    }

    case SET_USER_STATUS || UPDATE_USER_STATUS: {
      return {
        ...state, status: action.status
      }
    }

    case DELETE_POST:
      return { ...state, posts: state.posts.filter(p => p.id !== action.post_id) }

    default:
      return state;
  }
}

export const addPost = (post) => ({ type: ADD_POST, post })
export const deletePost = (post_id) => ({ type: DELETE_POST, post_id })
const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
const setUserStatus = (status) => ({ type: SET_USER_STATUS, status })

export const getUserProfile = (userId) => {
  return dispatch => {
    profileAPI.getUserProfile(userId)
      .then(response => dispatch(setUserProfile(response)))
  }
}

export const getUserStatus = (userId) => {
  return dispatch => {
    profileAPI.getUserStatus(userId)
      .then(response => dispatch(setUserStatus(response)))
  }
}

export const updateUserStatus = (status) => {
  return dispatch => {
    profileAPI.updateUserStatus(status)
      .then(response => {
        if (response.resultCode === 0) {
          dispatch(setUserStatus(status))
        }
      })
  }
}

export default profileReducer
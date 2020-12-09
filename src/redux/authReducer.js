import { stopSubmit } from "redux-form"
import { authAPI } from "../api/api"

const SET_USER_DATA = 'SET-USER-DATA'

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data
      }
    }

    default:
      return state
  }
}

const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  data: { userId, email, login, isAuth }
})

export const getCurrentUser = () => {
  return async dispatch => {
    let response = await authAPI.me()
    if (response.resultCode === 0) {
      let { id, email, login } = response.data
      dispatch(setAuthUserData(id, email, login, true))
    }
  }
}

export const login = (email, password, rememberMe) => {
  return async dispatch => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.resultCode === 0) {
      dispatch(getCurrentUser())
    } else {
      dispatch(stopSubmit('login', { _error: response.messages[0] }))
    }
  }
}

export const logout = () => {
  debugger
  return async dispatch => {
    let response = await authAPI.logout()
    if (response.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }
  }
}

export default authReducer
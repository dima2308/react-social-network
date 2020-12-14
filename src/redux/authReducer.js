import { stopSubmit } from "redux-form"
import { authAPI, securityAPI } from "../api/api"

const SET_USER_DATA = 'SET-USER-DATA'
const GET_CAPTCHA = 'SET-CAPTCHA'

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captcha: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data
      }
    }

    case GET_CAPTCHA: {
      return {
        ...state,
        captcha: action.payload
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

const getCaptcha = (captcha) => ({
  type: GET_CAPTCHA,
  payload: captcha
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

export const login = (email, password, rememberMe, captcha) => {
  return async dispatch => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === 0) {
      dispatch(getCurrentUser())
    } else {
      if (response.resultCode === 10) {
        dispatch(setCaptcha())
      }
      dispatch(stopSubmit('login', { _error: response.messages[0] }))
    }
  }
}

export const setCaptcha = () => {
  return async dispatch => {
    let response = await securityAPI.getCaptcha()
    let captcha = response.url
    dispatch(getCaptcha(captcha))
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
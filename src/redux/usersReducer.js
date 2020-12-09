import { usersAPI } from "../api/api"

const SET_USERS = 'SET_USERS'
const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState = {
  users: [],
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  isFollowing: []
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: [...action.users]
      }
    }

    case FOLLOW_TOGGLE: {
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userID) {
            if (u.followed) {
              return { ...u, followed: false }
            }
            else {
              return { ...u, followed: true }
            }
          }
          return u
        })
      }
    }

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }

    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalCount
      }
    }

    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }

    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        isFollowing: action.isFollowing
          ? [...state.isFollowing, action.userID]
          : state.isFollowing.filter(id => id !== action.userID)
      }
    }

    default:
      return state
  }
}

export const followToggle = (userID) => ({ type: FOLLOW_TOGGLE, userID })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleIsFollowing = (isFollowing, userID) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFollowing, userID })

export const getUsers = (currentPage, pageSize) => {
  return dispatch => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize).then(data => {
      dispatch(toggleIsFetching(false))
      dispatch(setUsers(data.items))
      dispatch(setTotalUsersCount(data.totalCount))
      dispatch(setCurrentPage(currentPage))
    })
  }
}

export const setFollowOrUnfollow = (id) => {
  return async dispatch => {
    dispatch(toggleIsFollowing(true, id))
    let response = await usersAPI.getFollowedFlag(id)
    if (response === false) {
      let followedResponse = await usersAPI.follow(id)
      if (followedResponse.resultCode === 0) {
        dispatch(followToggle(id))
      }
    } else {
      let followedResponse = await usersAPI.unFollow(id)
      if (followedResponse.resultCode === 0) {
        dispatch(followToggle(id))
      }
    }
    dispatch(toggleIsFollowing(false, id))
  }
}

export default usersReducer
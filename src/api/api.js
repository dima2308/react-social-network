import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'a36b0525-47dc-4bad-a78a-ef2fac9d8e5d'
  }
})

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10) {
    let response = await instance.get(`users?page=${currentPage}&count=${pageSize}`)
    return response.data
  },

  async getFollowedFlag(id) {
    let response = await instance.get(`follow/${id}`)
    return response.data
  },

  async follow(id) {
    let response = await instance.post(`follow/${id}`)
    return response.data
  },

  async unFollow(id) {
    let response = await instance.delete(`follow/${id}`)
    return response.data
  },

  async getUserProfile(userId) {
    return profileAPI.getUserProfile(userId)
  }
}

export const authAPI = {
  async me() {
    let response = await instance.get('auth/me')
    return response.data
  },

  async login(email, password, rememberMe) {
    let response = await instance.post('auth/login', { email, password, rememberMe })
    return response.data
  },

  async logout() {
    let response = await instance.delete('auth/login')
    return response.data
  }
}

export const profileAPI = {
  async getUserProfile(userId) {
    let response = await instance.get(`profile/${userId}`)
    return response.data
  },

  async getUserStatus(userId) {
    let response = await instance.get(`profile/status/${userId}`)
    return response.data
  },

  async updateUserStatus(status) {
    let response = await instance.put(`profile/status/`, { status })
    return response.data
  }
}
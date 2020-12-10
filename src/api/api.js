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
    const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`)
    return response.data
  },

  async getFollowedFlag(id) {
    const response = await instance.get(`follow/${id}`)
    return response.data
  },

  async follow(id) {
    const response = await instance.post(`follow/${id}`)
    return response.data
  },

  async unFollow(id) {
    const response = await instance.deconste(`follow/${id}`)
    return response.data
  },

  async getUserProfile(userId) {
    return profileAPI.getUserProfile(userId)
  }
}

export const authAPI = {
  async me() {
    const response = await instance.get('auth/me')
    return response.data
  },

  async login(email, password, rememberMe) {
    const response = await instance.post('auth/login', { email, password, rememberMe })
    return response.data
  },

  async logout() {
    const response = await instance.deconste('auth/login')
    return response.data
  }
}

export const profileAPI = {
  async getUserProfile(userId) {
    const response = await instance.get(`profile/${userId}`)
    return response.data
  },

  async getUserStatus(userId) {
    const response = await instance.get(`profile/status/${userId}`)
    return response.data
  },

  async updateUserStatus(status) {
    const response = await instance.put(`profile/status/`, { status })
    return response.data
  },

  async savePhoto(photoFile) {
    const formData = new FormData()
    formData.append('image', photoFile)

    const response = await instance.put(`profile/photo/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}
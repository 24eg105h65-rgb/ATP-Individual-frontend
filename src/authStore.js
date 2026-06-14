const authStore = {
  get token() {
    return localStorage.getItem('authToken')
  },

  get user() {
    const user = localStorage.getItem('authUser')
    return user ? JSON.parse(user) : null
  },

  get isAdmin() {
    return localStorage.getItem('isAdmin') === 'true'
  },

  login(token, user, isAdmin = false) {
    localStorage.setItem('authToken', token)
    localStorage.setItem('authUser', JSON.stringify(user))
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false')
  },

  logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    localStorage.removeItem('isAdmin')
  },
}

export default authStore

import axios from 'axios';
export const authService = {
  login,
  logout,
  signup,
  passwordReset,
  confirmAccount,
  updateProfile
};

function login(creds) {
  return new Promise((resolve, reject) => {
    axios.post('/login', creds).then(res => {
      if (res) {
        let user = Object.assign({}, res.data.user, {token: res.data.token})
        if (user.token) {
          localStorage.setItem('user', JSON.stringify(user))
        }
        resolve(user)
      }
    }, err => {
      reject(err)
    })
  })
}

function signup(details) {
  return new Promise((resolve, reject) => {
    axios.post('register', details).then(res => {
      if (res.status === 201) {
        let data = {result: res.data, type: 1}
        resolve(data)
      } else if (res.status === 200) {
        let data = {result: res.data, type: 0}
        resolve(data)
      }
    }, err => {
        reject(err)
    })
  })
}

function passwordReset(details) {
  return new Promise((resolve, reject) => {
      fetch('password_reset', details).then(res => {
          resolve(res.data)
      }, err => {
          reject(err)
      })
  })
}

function confirmAccount(token) {
  return new Promise((resolve, reject) => {
    axios.get(`/confirmation?confirmation_token=${token}`).then(res => {
        resolve(res.data)
    }, err => {
        reject(err)
    })
  })
}

function updateProfile(info) {
  return new Promise((resolve, reject) => {
    axios.put(`/update/${info.id}`, {email: info.email, password: info.password}).then(res => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}

function logout() {
  localStorage.clear();
}


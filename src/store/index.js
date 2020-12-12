import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


const store = new Vuex.Store({

  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },

  mutations: {
     auth_request(state){
      state.status = 'loading'
     },
     auth_success(state, token){
      state.status = 'success'
      state.token = token
     },
     auth_error(state){
      state.status = 'error'
     },
     logout(state){
      state.status = ''
      state.token = ''
     },
     token_refresh(state, token) {
      state.status = 'success'
      state.token = token
     }
  },

  actions: {
   login({commit}, {username, password}) {
      commit('auth_request')
      return fetch('http://localhost:5000/auth/jwt/create', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({username: username, password: password})
      })
      .then(res=> res.json())
      .then(resp => {
        if (resp.refresh) {
            const token = resp
            localStorage.setItem('token', JSON.stringify(token))
            axios.defaults.headers.common['Authorization'] = token.access
            commit('auth_success', token)
        }
        else {
            commit('auth_error')
            localStorage.removeItem('token')
        }
        return resp;
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('token')
        return err;
      })
    },

    join({commit}, {username, password, email}) {
      commit('auth_request')
      return fetch('http://localhost:5000/auth/users/', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({username: username, password: password, email: email})
      })
      .then(res=> res.json())
      .then(resp => {
        return resp;
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('token')
        return err;
      })
    },

    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },

    refresh_token({commit}) {
      console.log(JSON.parse(this.state.token))
      return fetch('http://localhost:5000/auth/jwt/refresh/', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({refresh: JSON.parse(this.state.token).refresh})
      })
      .then(res=> res.json())
      .then(resp => {
        if (resp.access) {
          let token =  JSON.parse(this.state.token);
          token.access = resp.access;
          localStorage.setItem('token', JSON.stringify(token))
          axios.defaults.headers.common['Authorization'] = token.access
          return resp;
        }
        else {
          this.logout();
          return {"ok": false};
        }
        
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('token')
        return err;
      })
    }
  },

  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }

})

export default store
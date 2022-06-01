import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { api } from "boot/axios";

export const useLoginStore = defineStore('login', {
  state: () => ({
    router: useRouter(),
    counter: 0,
    user: '',
    token: false,
    users: []
  }),

  getters: {
    activeUser: state => !!state.token,
    doubleCount(state) {
      return state.counter * 2
    },
  },

  actions: {
    async loginUser(body) {
      try {
        const res = await api.post("/login", body);
        this.user = res.data.user;
        this.token = true;
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
        api.defaults.headers.common['Authorization'] = res.data.token;
        this.router.push('/home');
        return res
      } catch (error) {
        return error.response.data.error
      }
    },
    logOut() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      this.user = '';
      this.token = false;
      api.defaults.headers.common['Authorization'] = '';
      this.router.push('/admin');
    },
    getUserFromStorage() {
      if (!this.token) {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let token = sessionStorage.getItem('token');
        if (token && user) {
          this.user = user;
          this.token = true;
          api.defaults.headers.common['Authorization'] = token;
        } else {
          //LOG OUT
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
          this.user = '';
          this.token = false;
          api.defaults.headers.common['Authorization'] = '';
          this.router.push('/admin');
        }
      }
    },
    //borrar
    async getAllUsersComplete() {
      try {
        const res = await api.get("/users/getAllUsers/complete");
        this.users = res.data;
      } catch (error) {
        return error.response.data.error
      }
    }
  }
})

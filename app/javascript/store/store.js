import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/router.js'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    bookInfo: {},
    bookInfoBool: false,
    signedIn: '',
    user: {
      id: 0
    }
  },
  mutations: {
    fetchSignedIn(state) {
      state.signedIn = localStorage.signedIn
    },
    fetchBooks(state) {
      state.books = [];
      axios.get('/api/books').then((res) => {
        for(var i = 0; i < res.data.books.length; i++) {
          state.books.push(res.data.books[i]);
        }
      }, (error) => {
        console.log(error);
      });
    },
    setBookInfo(state, { id } ) {
      axios.get(`api/books/${id}.json`).then(res => {
        state.bookInfo = res.data;
        state.bookInfoBool = true;
      });
    },
    deleteBook(state, { id }) {
      axios.delete(`/api/books/${id}`).then(res => {
        state.bookInfo = '';
        state.bookInfoBool = false;
      });
    },
    userId(state, id ){
      state.user.id = id;
      axios.get(`/api/user`, {
      params: {
        // ここにクエリパラメータを指定する
        id: id
      }}).then(res => {
        state.user = res.data.user;
        console.log(res.data)
      });
    }
  },
  actions: {
    doFetchSignedIn({ commit }) {
      commit('fetchSignedIn')
    },
    user_id({commit}, id){
      commit('userId', id)
    }
  }
})

<template>
   <div>
     <nav>
       <div class="nav-wrapper">
         <router-link to="/" class="brand-logo">人生図鑑</router-link>
         <ul id="nav-mobile" class="right">
           <li><router-link to="/signup" v-if="!signedIn">登録する</router-link></li>
           <li><router-link to="/signin" v-if="!signedIn">ログイン</router-link></li>
           <li><a href="/" v-if="signedIn" @click="signOut">ログアウト</a></li>
         </ul>
          <a v-if="$store.state.user.name" class="right">ようこそ{{$store.state.user.name}}さん</a>
       </div>
     </nav>
   </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Header',
    data() {
      return {
        user: this.$store.state.user
      }
    },
    computed: mapState([
      'signedIn'
    ]),
    mounted: function() {
      this.$store.dispatch('doFetchSignedIn')
    },
    methods: {
      setError(error, text) {
        this.error = (error.response && error.response.data && error.response.data.error) || text
      },
      signOut() {
        if(confirm("ログアウトしますか？")) {
          this.$http.secured.delete(`/api/signin`)
            .then(response => {
              delete localStorage.csrf
              delete localStorage.signedIn
              this.$store.dispatch('doFetchSignedIn')
            })
            .catch(error => {
              this.setError(error, 'Cannot sign out')
            })
        }
      }
    }
  }
</script>

<template>
  <div class="container">
    <h1 class="#f3e5f5 purple lighten-5 center">ログイン</h1>
    <form class="col" @submit.prevent="signin">
      <div class="text-red error" v-if="error"><i class="el-icon-error"></i>{{ error }}</div>

      <div class="row">
        <div class="input-field">
          <input placeholder="Email" type="text" class="validate" v-model="email" required="required">
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input placeholder="Password" type="text" class="validate" v-model="password" required="required">
        </div>
      </div>
      <div class="center">
        <button type="submit" class="btn waves-effect waves-light">ログイン</button>
        <router-link to="/signup" class="btn link-grey">新規登録</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  //　動作は，Signupコンポーネントと同じ。
  export default {
    name: 'Signin',
    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    created() {
      this.checkSignedIn()
    },
    updated() {
      this.checkSignedIn()
    },
    methods: {
      signin() {
        this.$http.plain.post('/api/signin', { email: this.email, password: this.password })
          .then(response => this.signinSuccessful(response))
          .catch(error => this.signinFailed(error))
      },
      signinSuccessful(response) {
        if (!response.data.csrf) {
          this.signinFailed(response)
          return
        }
        localStorage.csrf = response.data.csrf
        localStorage.signedIn = true
        this.$store.dispatch('doFetchSignedIn')
        this.$store.dispatch('user_id', response.data.user_id)
        this.error = ''
        this.$router.replace('/search')
      },
      signinFailed(error) {
        this.error = (error.response && error.response.data && error.response.data.error) || ''
        this.$message.error(this.error);
        delete localStorage.csrf
        delete localStorage.signedIn
      },
      checkSignedIn() {
        if (localStorage.signedIn) {
          this.$router.replace('/')
        }
      }
    }
  }
</script>
<style scoped>
  .error{
    font-weight: bold;
    color: red;
  }
</style>

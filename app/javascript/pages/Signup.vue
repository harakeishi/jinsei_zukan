<template>
  <div class="container">
    <h1 class="#f3e5f5 purple lighten-5 center">新規登録</h1>
    <form class="col" @submit.prevent="signup">
      <div class="text-red　error" v-if="error">{{ error }}</div>
      <div class="row">
        <div class="input-field">
          <input placeholder="Name" type="text" class="validate" v-model="name" required="required"></br>
        </div>
      </div>
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
      <div class="row">
        <div class="input-field">
          <input placeholder="Password_confirmation" type="text" class="validate" v-model="password_confirmation" required="required">
        </div>
      </div>
      <div class="center">
        <button type="submit" class="btn waves-effect waves-light">新規登録</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Signup',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
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
      signup() {
        this.$http.plain.post('/api/signup', { name: this.name, email: this.email, password: this.password, password_confirmation: this.password_confirmation })
          .then(response => this.signupSuccessful(response))
          .catch(error => this.signupFailed(error))
      },
      signupSuccessful(response) {
        if (!response.data.csrf) {
          this.signupFailed(response)
          return
        }
        localStorage.csrf = response.data.csrf
        localStorage.signedIn = true
        this.$store.dispatch('doFetchSignedIn')
        this.$store.dispatch('user_id', response.data.user_id)
        this.error = ''
        this.$router.replace('/search')
      },
      signupFailed(error) {
        this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
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

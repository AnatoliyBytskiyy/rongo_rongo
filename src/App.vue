<template>
  <div id="app">
    <div class="row">
      <div class="col-2"></div>
      <div id="nav" class="col">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        <span v-if="!isLoggedIn">
          | <router-link to="/login">Login</router-link> |
          <router-link to="/register">Register</router-link>
        </span>
        <span v-if="isLoggedIn">
          | <router-link to="/dashboard">Dashboard</router-link>
          <span v-if="isAdminIn">
            | <router-link to="/admin">Admin</router-link>
          </span>
          | <router-link to="/finding_friends">Finding friends</router-link>
          | <router-link to="/friends">Friends</router-link> |
          <a @click="logout">Logout</a>
        </span>
      </div>
      <div class="col-2">
        <div class="user_data" v-if="isLoggedIn">
          id: {{ userData.id }} <br>
          name: {{ userData.name }} <br>
          email: {{ userData.email }} <br>
          <span v-if="isAdminIn" style="color: green">admin</span>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function () { return this.$store.getters.isLoggedIn },
    isAdminIn: function () { return this.$store.getters.isAdminIn },
    userData: function () { return this.$store.getters.userData }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

$image-path: '~@/../mdb/mdbvue/img';
@import '~@/../mdb/mdbvue/scss/mdb-free.scss';

body {
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.user_data {
  text-align: left;
  padding: 30px 0px 0px 0px;
}
</style>

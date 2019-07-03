<template>
  <div id="app">
    <div id="nav">
      <h1>Fake Reddit</h1>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link v-if="isLoggedIn()" v-bind:to="'/users/' + user.id">My Profile</router-link></li>
        <li v-if="isLoggedIn()"><router-link to="/logout">Logout</router-link></li>
        <li v-if="!isLoggedIn()"><router-link to="/login">Login</router-link></li>
        <li v-if="!isLoggedIn()" class="cta"><router-link to="/signup">Sign Up</router-link></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      user: {}
    }
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      console.log(this.user);
    });
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem('jwt')) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

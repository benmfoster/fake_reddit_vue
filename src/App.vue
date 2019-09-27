<template>
  <div id="app">
    <div class="site-main">
      <!-- header -->
    <div class="header">
      
      <div class="container">
        <div class="row">
 <!-- navbar -->
    <nav class="navbar navbar-default animated slideInDown">
      <div class="container animated fadeOut" style="margin:0 auto;">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#amalia-navbar-collapse" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button><!-- .navbar-toggle -->
        </div><!-- .navbar-header -->

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="amalia-navbar-collapse">
          <ul class="nav navbar-nav">
            
            <li><router-link to="/">Home</router-link></li>
            <li><a href="https://fake-reddit-board.herokuapp.com/">Fake Reddit Board</a></li>
        <li v-if="isLoggedIn()"><router-link to='/posts/new'>New Post</router-link></li>
        <li v-if="isLoggedIn()"><router-link v-bind:to="'/users/' + currentUserId()">My Profile</router-link></li>
        <li v-if="isLoggedIn()"><router-link to="/logout">Logout</router-link></li>
        <li v-if="!isLoggedIn()"><router-link to="/login">Login</router-link></li>
        <li v-if="!isLoggedIn()" class="cta"><router-link to="/signup">Sign Up</router-link></li>
        <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Github <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="https://github.com/benmfoster/fake_reddit_vue">Frontend Repository (Vue.js)</a></li>
                <li><a href="https://github.com/benmfoster/fake_reddit">Backend Repository (Ruby on Rails)</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More Apps <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="https://bit-better.herokuapp.com">Bit Better (React.js)</a></li>
                <li><a href="https://singing-glass.herokuapp.com">singing glass (sound installation)</a></li>
              </ul>
            </li>
        <li class="cta"><a href="https://benmfoster.github.io">About Me</a></li>
          </ul><!-- .navbar-nav -->
        </div><!-- .navbar-collapse -->
      </div><!-- .container -->
    </nav><!-- .navbar -->
          
            <h1 class="site-title fadeOut" style="font-weight:normal;font-size:12px;"><router-link to="/">Fake Reddit</router-link><span>.</span></h1>
            <br />
            <p class="site-description animated bounceInUp">Misanthropes pile-driving the internet.</p>
          

        </div><!-- .row -->
      </div><!-- .container -->
    </div><!-- .header -->
   
    <router-view :key="$route.path" class="animated fadeIn"></router-view>
    <div class="footer animated fadeIn delay-1s">
      <div class="container">
        <div class="row">

          <div class="col-md-4">
            <a href="#" style="text-decoration:none;">
            <h3 style="text-align:center;">Back to<span>^</span></h3>
            </a>
            <p style="text-align:center;">If you <i>hate</i> it, <i>downvote</i> it.</p>
            
          </div><!-- .col-md-4 -->

        </div><!-- .row -->
      </div><!-- .container -->
    </div><!-- .footer -->
  </div>
  </div>
</template>

<style>
.fadeIn {
  animation-duration: 2s;
}
.fadeOut {
  animation-duration:120s;
}
.fadeOut:hover, :active {
  animation:0;
}
.bounceInUp {
  animation-duration: 1.5s;
}
</style>

<script>
import axios from 'axios';
export default {
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem('jwt')) {
        return true;
      } else {
        return false;
      }
    },
    currentUserId: function() {
      return localStorage.getItem('current_user_id');
    }
  }
};
</script>

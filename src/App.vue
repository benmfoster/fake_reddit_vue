<template>
  <div id="app">
    <div class="site-main">
      <!-- header -->
    <div class="header">
      
      <div class="container">
        <div class="row">
 <!-- navbar -->
    <nav class="navbar navbar-default animated slideInDown">
      <div class="container" style="margin:0 auto;">
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
            <li><a href="https://lit-escarpment-59964.herokuapp.com/">Fake Reddit Board</a></li>
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
        <li class="cta"><a href="https://benmfoster.github.io">About Me</a></li>
          </ul><!-- .navbar-nav -->
        </div><!-- .navbar-collapse -->
      </div><!-- .container -->
    </nav><!-- .navbar -->
          
            <h1 class="site-title fadey" style="font-weight:normal;font-size:12px;text-decoration:none;"><router-link to="/">Fake Reddit</router-link><span>.</span></h1>
            <br />
            <p class="site-description animated bounceInUp">Misanthropes pile-driving the internet.</p>
          

        </div><!-- .row -->
      </div><!-- .container -->
    </div><!-- .header -->
   
    <router-view :key="$route.path" v-if="displayRouterViewConst"></router-view>
    <div class="footer">
      <div class="container">
        <div class="row">

          <div class="col-md-4">
            <a href="#" style="text-decoration:none;">
            <h3 style="text-align:center;">Back to<span>^</span></h3>
            <p style="text-align:center;">If you <i>hate</i> it, <i>downvote</i> it.</p>
            </a>
          </div><!-- .col-md-4 -->

        </div><!-- .row -->
      </div><!-- .container -->
    </div><!-- .footer -->
  </div>
  </div>
</template>

<style>

.fadey {
  -webkit-animation: fadein 0.8s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 0.8s; /* Firefox < 16 */
        -ms-animation: fadein 0.8s; /* Internet Explorer */
         -o-animation: fadein 0.8s; /* Opera < 12.1 */
            animation: fadein 0.8s;
}

  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
</style>

<script>
import axios from 'axios';
export default {
  data: function() {
          return {
            displayRouterViewConst: false          
            };
        }, 
  created: function() {
      setTimeout(this.setRouterView, 900);
  },
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
    },
    setRouterView: function() {
      console.log('hi');
      this.displayRouterViewConst = true;
      vm.$forceUpdate();
    },
  }
};
</script>

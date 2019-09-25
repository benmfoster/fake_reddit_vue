<template>
    <div class="users-show">

      
        <!-- post-entry -->
      <div class="post-entry">
        <div class="container">
          <div class="row">

            <!-- content-area -->
            <div class="col-md-8">
              <h3 style="text-align:center;margin-bottom: 20px;">Recent Posts</h3>
              <div v-for="post in posts" :key="post.id">
                
              <article class="post">
                <div class="news-container">
                  <h2 class="news-title"><router-link v-bind:to="'../posts/' + post.id"><span v-if="isMostHated(post)" id="hated"><strong>Most Hated </strong></span>{{ post.title }}</router-link></h2>
                  <span class="news-category"><router-link v-bind:to="'users/' + user.id">{{ user.name }}</router-link></span>
                  <span class="news-date">{{ relativeDate(post.last_edited) }}</span>
                      <div class="news-entry">{{post.text.substring(0,470)}}<span style="color:gray;">{{post.text.substring(470,479)}}</span><span style="color:silver;">{{post.text.substring(479,490)}}</span><span style="color:lightgray;">{{post.text.substring(490,500)}}</span>
                        <span style="white-space:nowrap;"><span style="font-size:14px;"><i class="fa fa-comments-o"></i><router-link v-bind:to="'posts/' + post.id"> Comments {{ post.comments.length }}</router-link></span>
                        <span class="pointer lil-fade" style="display:inline-block;">
                        <span v-if="isLoggedIn()">
                            <span v-bind:class="{ hide: !(current_user.downvoted_post_ids[post.id] == true) }" v-on:click="removeDownvote(post)" style="font-size:25px;font-family: 'VT323', monospace;padding:5px;color:red;">↓{{ post.total_downvotes }}</span>
                            <span v-bind:class="{ hide: current_user.downvoted_post_ids[post.id] == true }" style="font-size:25px;font-family: 'VT323', monospace;padding:5px;color:navy;" v-on:click="downvote(post)">↓{{ post.total_downvotes }}</span>
                          </span>
                          <a v-else><span style="font-size:25px;font-family: 'VT323', monospace;padding:5px;color:navy;">↓{{ post.total_downvotes }}</span></a></span>
                        </span>
                </div></div><!-- .news-container -->
              </article>
      </div>
      </div>
      
      <!-- sidebar -->
       <div class="col-md-4">

               <section class="widget widget_about">
                 <div class="about-photo">
                   <img v-bind:src="user.profile_picture" alt="" />
                 </div><!-- .about-photo -->
                 <div class="about-author">
                   <router-link v-bind:to="'/users/' + user.id"><h3>{{ user.name }}</h3></router-link>
                 </div><!-- .about-author -->
                 <router-link v-bind:to="user.id + '/edit'"><button v-if="isLoggedIn() && current_user.id == user.id" class="btn btn-light">Edit Profile</button></router-link>
               </section><!-- .widget_about -->

             </div><!-- .col-md-4 -->

           </div><!-- .row -->
         </div><!-- .container -->
       </div><!-- .post-entry -->
    </div>

</template>

<style>
    .hide {
        display: none;
        visibility: hidden;
    } 
#hated {
      font-family: 'Titillium Web', sans-serif;
      font-size: 20px;
    }    
    .lil-fade {
  -webkit-animation: fadein 10s infinite ease-in-out; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 10s infinite ease-in-out; /* Firefox < 16 */
        -ms-animation: fadein 10s infinite ease-in-out; /* Internet Explorer */
         -o-animation: fadein 10s infinite ease-in-out; /* Opera < 12.1 */
            animation: fadein 10s infinite ease-in-out;
}
.blinky {
  display:inline-block;
  -webkit-animation: blink 8s infinite ease-in-out; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: blink 8s infinite ease-in-out; /* Firefox < 16 */
        -ms-animation: blink 8s infinite ease-in-out; /* Internet Explorer */
         -o-animation: blink 8s infinite ease-in-out; /* Opera < 12.1 */
            animation: blink 8s infinite ease-in-out;
} 

@keyframes blink {
      40%, 100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  }
/* Firefox < 16 */
@-moz-keyframes blink {
   40%, 100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes blink {
   40%, 100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
}

/* Internet Explorer */
@-ms-keyframes blink {
  40%, 100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
}

/* Opera < 12.1 */
@-o-keyframes blink {
   40%, 100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
}

 @keyframes fadein {
      40%, 100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  }
/* Firefox < 16 */
@-moz-keyframes blink {
   40%, 100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
}

* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
   40%, 100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  40%, 100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
   40%, 100% {
    opacity: 1;
  }
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
}
</style>

<script>
import axios from "axios";
import moment from 'moment';
export default {
  data: function() {
    return {
      user: {},
      posts: {},
      current_user: {},
      showComments: false 
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      this.posts = this.user.posts.reverse();
    });
    axios.get("/api/users/" + localStorage.getItem('current_user_id')).then(response => {
        this.current_user = response.data;
    });
  },
  methods: {
    removeDownvote: function(post) {
        axios.delete("/api/downvotes/" + post.id).then(response => {
            console.log("Success!", response.data);
        });
        this.current_user.downvoted_post_ids[post.id] = false;
        post.total_downvotes--;         
    },
    downvote: function(post) {
        console.log(post);
        var params = {post_id: post.id};
        axios.post("/api/downvotes", params).then(response => {
            console.log("Success!", response.data);
        }).catch(error => {
        this.errors = error.response.data.errors;
        this.status = error.response.status;
        });
        this.current_user.downvoted_post_ids[post.id] = true;
        post.total_downvotes++;
    },
    toggleComments: function() {
      if (this.showComments == true) {
        this.showComments = false;
      } else {
        this.showComments = true;
      }
    },
    shortener: function(string)	{
        return string.substring(0,500)+" [...]";
    },
    isLoggedIn: function() {
      if (localStorage.getItem('jwt')) {
        return true;
      } else {
        return false;
      }	
    },
    isMostHated: function(post) {
      if (localStorage.getItem('mostHatedId') == post.id) {
        return true;
      } else {
        return false;
      }
    },
    relativeDate: function(date) {
      return moment(date).fromNow();
    }	
    }	
  }

</script>
<template>
    <div class="users-show">

      
        <!-- post-entry -->
      <div class="post-entry">
        <div class="container">
          <div class="row">

            <!-- content-area -->
            <div class="col-md-8">
              <h3 style="text-align:center;">Recent Posts</h3>
              <div v-for="post in posts" :key="post.id">
                <span v-if="isMostHated(post)"><div class="gold-oval">
  <img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.expressmedals.com%2Fv%2Fvspfiles%2Fphotos%2F8200416-BLU-1.jpg&f=1" onmouseover="this.src='https://media3.giphy.com/media/3o7TKUeunlrFIX4QTe/200w.webp?cid=790b76115d38c97c2f537779363f60d2&rid=200w.webp';" onmouseout="this.src='https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cemetech.net%2Fprograms%2Fzipview.php%3Fid%3D1466%26file%3Dsrc%2Fgfx%2FOriginals%2FBlue-square.jpg&f=1';" />
  <small class="most-hated-text">🏆 most hated</small>
</div></span>
              <article>
                <div class="news-container">
                  <h1 class="news-title"><router-link v-bind:to="'../posts/' + post.id">{{ post.title }}</router-link></h1>
                  <span class="news-date">{{ post.last_edited }}</span>
                  <div class="news-entry">
                    <p>{{ shortener(post.text) }}</p>
                  </div><!-- .news-entry -->
                  <div class="news-footer">
                   
                      <i class="fa fa-comments-o"></i> <router-link v-bind:to="'/posts/' + post.id"> Comments {{ post.comments.length }} </router-link>

                      <span v-if="isLoggedIn()">

                        <button v-bind:class="{ hide: !(current_user.downvoted_post_ids[post.id] == true) }" v-on:click="removeDownvote(post)" style="margin-left: 10px; font-size:40px; padding: 10px;" class="btn btn-danger">↓ {{ post.total_downvotes }}</button>

                        <button v-bind:class="{ hide: current_user.downvoted_post_ids[post.id] == true }" v-on:click="downvote(post)" style="margin-left: 10px; font-size:40px; padding: 10px;" class="btn btn-primary">↓ {{ post.total_downvotes }}</button>

                      </span>

                      <span v-else>

                        <button style="margin-left: 10px; font-size:40px; padding: 10px;" class="btn btn-primary">↓ {{ post.total_downvotes }}</button>
                        
                      </span>
                    
                  </div><!-- .news-footer -->
                </div><!-- .news-container -->
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

  .gold-oval {
  width: 120px;
  height: 120px;
  background-color: gold;
  radius: 15px;
  border-radius: 50%;
  position: relative;
  text-align: center;
  margin: 0 auto 40px;
}

.gold-oval:hover {
  opacity: 0.9;
}

.gold-oval img {
  width: 80%;
  margin: 10%;
  border-radius: 50%;
}

.most-hated-text {
  background-color: gold;
  opacity: 0.9;
  border-radius: 15px;
  padding: 10px;
  font-family: Impact, Charcoal, sans-serif;
  color: black;
}

.most-hated-text:hover {
  color: dimgray;
}
        
</style>

<script>
import axios from "axios";
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
    }	
    }	
  }

</script>
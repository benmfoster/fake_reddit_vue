<template>
    <div class="posts-index">
        
        <!-- post-entry -->
      <div class="post-entry">
        <div class="container">
          <div class="row">

            <!-- content-area -->
            <div class="col-md-8 col-md-offset-2">
              <div class="row">

                <div v-if="isLoggedIn() && current_user.notifications.length > 0">

                  <h5>Notifications</h5>

                  <div v-for="notification in sortedNotifications">

                    <p v-bind:onmouseover="deleteNotification(notification.id)" v-if="notification.tag == true">

                      <router-link v-bind:to="'/users/' + notification.commenter_id">
                        {{ commenter(notification.commenter_id) }}
                      </router-link>

                       tagged you in a comment on 
                       <router-link v-bind:to="'/posts/' + notification.post_id">
                        {{ post(notification.post_id) }}
                       </router-link>

                       . {{ notification.created_at }}
                    </p>

                    <p v-bind:onmouseover="deleteNotification(notification.id)" v-else>

                      <router-link v-bind:to="'/users/' + notification.commenter_id">
                        {{ commenter(notification.commenter_id) }}
                      </router-link>

                       commented on 
                       <router-link v-bind:to="'/posts/' + notification.post_id">
                        {{ post(notification.post_id) }}
                       </router-link>

                       . {{ notification.created_at }}
                    </p>
                  </div>
                </div>


<div class="gold-oval">
  <img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.expressmedals.com%2Fv%2Fvspfiles%2Fphotos%2F8200416-BLU-1.jpg&f=1" onmouseover="this.src='https://media3.giphy.com/media/3o7TKUeunlrFIX4QTe/200w.webp?cid=790b76115d38c97c2f537779363f60d2&rid=200w.webp';" onmouseout="this.src='https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cemetech.net%2Fprograms%2Fzipview.php%3Fid%3D1466%26file%3Dsrc%2Fgfx%2FOriginals%2FBlue-square.jpg&f=1';" />
  <small class="most-hated-text">🏆 most hated</small>
</div>
                <div class="col-md-12">
                  <article class="post">
                    <div class="news-container">
                      <span class="news-category"><router-link v-bind:to="'users/' + mostHatedPost.author_id">{{ mostHatedPost.authored_by }}</router-link></span>
                      <router-link v-bind:to="'posts/' + mostHatedPost.id"><h1 class="news-title">{{ mostHatedPost.title }}</h1></router-link>
                      <span class="news-date">{{ mostHatedPost.date }}</span>
                      <div class="news-entry">
                        <p>{{ shortener(mostHatedPost.text) }}</p>
                      </div><!-- .news-entry -->
                      <div class="news-footer">
                        
                          <i class="fa fa-comments-o"></i> <router-link v-bind:to="'posts/' + mostHatedPost.id"> Comments {{ mostHatedPost.comments.length }} </router-link>

                          <span v-if="isLoggedIn()">
                            <button v-bind:class="{ hide: !(current_user.downvoted_post_ids[mostHatedPost.id] == true) }" v-on:click="removeDownvote(mostHatedPost)" style="margin-left: 10px; font-size:40px; padding: 10px;" class="btn btn-danger">↓ {{ mostHatedPost.total_downvotes }}</button>
                            <button v-bind:class="{ hide: current_user.downvoted_post_ids[mostHatedPost.id] == true }" v-on:click="downvote(mostHatedPost)" style="margin-left: 10px; font-size:40px; padding: 10px;" class="btn btn-primary">↓ {{ mostHatedPost.total_downvotes }}</button>
                          </span>
                          <span v-else><button style="margin-left: 10px; font-size:40px; padding: 10px;" class="btn btn-primary">↓ {{ mostHatedPost.total_downvotes }}</button></span>
                        
                      </div><!-- .news-footer -->
                    </div><!-- .news-container -->
                  </article><!-- article -->
                </div><!-- .col-md-12 -->


                <div class="col-md-12" v-for="post in posts" :key="post.id">
                  <article class="post" v-if="!(post.id == mostHatedPost.id)">
                    <div class="news-container">
                      <span class="news-category"><router-link v-bind:to="'users/' + post.author_id">{{ post.authored_by }}</router-link></span>
                      <h2 class="news-title"><router-link v-bind:to="'posts/' + post.id">{{ post.title }}</router-link></h2>
                      <span class="news-date">{{ post.date }}</span>
                      <div class="news-entry">
                        <p>{{ shortener(post.text) }}</p>
                      </div><!-- .news-entry -->
                      <div class="news-footer">
                        <ul>
                          <span><i class="fa fa-comments-o"></i> <router-link v-bind:to="'posts/' + post.id"> Comments {{ post.comments.length }} </router-link></span>
                          <span v-if="isLoggedIn()"><button v-bind:class="{ hide: !(current_user.downvoted_post_ids[post.id] == true) }" v-on:click="removeDownvote(post)" style="margin-left: 10px; font-size:40px; padding: 10px;" class="btn btn-danger">↓ {{ post.total_downvotes }}</button><button v-bind:class="{ hide: current_user.downvoted_post_ids[post.id] == true }" v-on:click="downvote(post)" style="margin-left: 10px;font-size:40px; padding: 10px;" class="btn btn-primary">↓ {{ post.total_downvotes }}</button></span>
                          <span v-if="!isLoggedIn()"><button style="margin-left: 10px;font-size:40px; padding: 10px;" class="btn btn-primary">↓ {{ post.total_downvotes }}</button></span>
                        </ul>
                      </div><!-- .news-footer -->
                    </div><!-- .news-container -->
                  </article><!-- article -->
                </div><!-- .col-md-12 -->

              </div><!-- .row -->
            </div><!-- .col-md-8 -->

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
    .downvote {
      font-size: 20;
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
    import axios from 'axios';

    export default {
        data: function() {
          return {
            posts: [],
            users: [],
            current_user: {},
            mostHatedPost: {},
            sortedNotifications: {}
          };
        },                  
        created: function() {
          if (this.isLoggedIn() == true) {
            axios.get("/api/users/" + localStorage.getItem('current_user_id')).then(response => {
                this.current_user = response.data;
                this.sortedNotifications = this.current_user.notifications.sort((a, b) => a.id - b.id);
            });
          }
          axios.get("/api/users/").then(response => {
              this.users = response.data;
          });
          axios.get("/api/posts").then(response => {
              this.posts = response.data.reverse();
              this.mostHatedPost = this.mostHated(this.posts);
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
              var params = {post_id: post.id};
              axios.post("/api/downvotes", params).then(response => {
              }).catch(error => {
              this.errors = error.response.data.errors;
              this.status = error.response.status;
              });
              this.current_user.downvoted_post_ids[post.id] = true;
              post.total_downvotes++;
            },
            shortener: function(string)	{
                return string.substring(0,500)+" [...]";
            },
            mostHated: function(posts) {
              var mostHated = this.posts[0];
              for(var i = 0; i < this.posts.length; i++) {
                if (this.posts[i].total_downvotes > mostHated.total_downvotes) {
                  mostHated = this.posts[i];
                }
              }
              localStorage.setItem('mostHatedId', mostHated.id);
              return mostHated;
            },
            isLoggedIn: function() {
              if (localStorage.getItem('jwt')) {
                return true;
              } else {
                return false;
              }	
            },
            commenter: function(commenter_id) {
              for(var i = 0; i < this.users.length; i++) {
                if (commenter_id == this.users[i].id) {
                  return this.users[i].name;
                }
              }
            },
            post: function(post_id) {
              for(var i = 0; i < this.posts.length; i++) {
                if (post_id == this.posts[i].id) {
                  return this.posts[i].title;
                }
              }
            },
            deleteNotification: function(notificationId) {
              axios.delete("/api/notifications/" + notificationId).then(response => {
                  console.log("Success!", response.data);
              });
            }
        }

    }  
</script>

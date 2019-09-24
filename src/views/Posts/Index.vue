<template>
    <div class="posts-index">
        
        <!-- post-entry -->
      <div class="post-entry">
        <div class="container">
          <div class="row">

            <!-- content-area -->
            <div style="padding:10px;">
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



                <div class="col-md-12">
                  <article class="post">
                    <div class="news-container">
                      
                      <router-link v-bind:to="'posts/' + mostHatedPost.id"><span id="hated"><strong>Most Hated </strong></span><span class="news-title">{{ mostHatedPost.title }}<span class="blinky">.</span></span></router-link>
                      <span class="news-category"><router-link v-bind:to="'users/' + mostHatedPost.author_id">{{ mostHatedPost.authored_by }}</router-link></span>
                      <span class="news-date">{{ relativeDate(mostHatedPost.date) }}</span>
                      <div class="news-entry">
                        {{ mostHatedPost.text.substring(0,470) }}
                        <span style="color:gray;">
                          {{ mostHatedPost.text.substring(470,479) }}
                        </span>
                        <span style="color:silver;">
                          {{ mostHatedPost.text.substring(479,490) }}
                        </span>
                        <span style="color:lightgray;">
                          {{ mostHatedPost.text.substring(490,500) }}
                        </span>
                         <span style="white-space:nowrap;"><span style="font-size:14px;"><i class="fa fa-comments-o"></i><router-link v-bind:to="'posts/' + mostHatedPost.id"> Comments {{ mostHatedPost.comments.length }}</router-link></span>
                         <span class="pointer lil-fade" style="display:inline-block;">
                         <span v-if="isLoggedIn()">
                            <span class="pointer" v-bind:class="{ hide: !(current_user.downvoted_post_ids[mostHatedPost.id] == true) }" v-on:click="removeDownvote(mostHatedPost)" style="font-size:25px;font-family: 'VT323', monospace;padding:5px;color:red;">↓{{ mostHatedPost.total_downvotes }}</span>
                            <span class="pointer" v-bind:class="{ hide: current_user.downvoted_post_ids[mostHatedPost.id] == true }" style="font-size:25px;font-family: 'VT323', monospace;padding:5px;color:navy;" v-on:click="downvote(mostHatedPost)">↓{{ mostHatedPost.total_downvotes }}</span>
                          </span>
                          <a v-else><span class="pointer" style="font-size:25px;font-family: 'VT323', monospace;padding:5px;color:navy;">↓{{ mostHatedPost.total_downvotes }}</span></a></span></span>
                      </div><!-- .news-entry -->
                    </div><!-- .news-container -->
                  </article><!-- article -->
                </div><!-- .col-md-12 -->


                <div class="col-md-12" v-for="post in posts" :key="post.id">
                  <article class="post" v-if="!(post.id == mostHatedPost.id)">
                    <div class="news-container">
                      <h2 class="news-title"><router-link v-bind:to="'posts/' + post.id">{{post.title}}</router-link><span class="blinky">.</span></h2>
                      <span class="news-category"><router-link v-bind:to="'users/' + post.author_id">{{ post.authored_by }}</router-link></span>
                      <span class="news-date">{{ relativeDate(post.date) }}</span>
                      <div class="news-entry">{{post.text.substring(0,470)}}<span style="color:gray;">{{post.text.substring(470,479)}}</span><span style="color:silver;">{{post.text.substring(479,490)}}</span><span style="color:lightgray;">{{post.text.substring(490,500)}}</span>
                        <span style="white-space:nowrap;"><span style="font-size:14px;"><i class="fa fa-comments-o"></i><router-link v-bind:to="'posts/' + post.id"> Comments {{ post.comments.length }}</router-link></span>
                        <span class="pointer lil-fade" style="display:inline-block;">
                        <span v-if="isLoggedIn()">
                            <span v-bind:class="{ hide: !(current_user.downvoted_post_ids[post.id] == true) }" v-on:click="removeDownvote(post)" style="font-size:25px;font-family: 'VT323', monospace;padding:5px;color:red;">↓{{ post.total_downvotes }}</span>
                            <span v-bind:class="{ hide: current_user.downvoted_post_ids[post.id] == true }" style="font-size:25px;font-family: 'VT323', monospace;padding:5px;color:navy;" v-on:click="downvote(post)">↓{{ post.total_downvotes }}</span>
                          </span>
                          <a v-else><span style="font-size:25px;font-family: 'VT323', monospace;padding:5px;color:navy;">↓{{ post.total_downvotes }}</span></a></span>
                        </span>
                      </div><!-- .news-entry -->
                      
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
    .hide {
        display: none;
        visibility: hidden;
    }
    .downvote {
      font-size: 20;
    }
    #hated {
      font-family: 'Titillium Web', sans-serif;
      font-size: 20px;
      font-weight: 200;
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

/* Safari, Chrome and Opera > 12.1 */
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
    import axios from 'axios';
    import moment from 'moment';

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
          vm.$forceUpdate();      
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
                return string.substring(0,500);
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
            },
            relativeDate: function(date) {
              return moment(date).fromNow();
            }
        }

    }  
</script>

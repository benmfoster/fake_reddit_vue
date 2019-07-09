<template>
    <div class="posts-index">
        
        <!-- post-entry -->
      <div class="post-entry">
        <div class="container">
          <div class="row">

            <!-- content-area -->
            <div class="col-md-8 col-md-offset-2">
              <div class="row">





                <div class="col-md-12">
                  <article class="post">
                    <div class="news-container">
                      <span class="news-category"><router-link v-bind:to="'users/' + mostHatedPost.author_id">{{ mostHatedPost.authored_by }}</router-link></span>
                      <h1 class="news-title"><router-link v-bind:to="'posts/' + mostHatedPost.id">Most Hated: {{ mostHatedPost.title }}</router-link></h1>
                      <span class="news-date">{{ mostHatedPost.date }}</span>
                      <div class="news-entry">
                        <p>{{ shortener(mostHatedPost.text) }}</p>
                      </div><!-- .news-entry -->
                      <div class="news-footer">
                        <ul>
                          <li><i class="fa fa-comments-o"></i> <router-link v-bind:to="'posts/' + mostHatedPost.id">Comments {{ mostHatedPost.comments.length }} </router-link></li>
                          <li><button v-bind:class="{ hide: !(current_user.downvoted_post_ids[mostHatedPost.id] == true) }" v-on:click="removeDownvote(mostHatedPost)" style="color:red;">↓ {{ mostHatedPost.total_downvotes }}</button><button v-bind:class="{ hide: current_user.downvoted_post_ids[mostHatedPost.id] == true }" v-on:click="downvote(mostHatedPost)">↓ {{ mostHatedPost.total_downvotes }}</button></li>
                        </ul>
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
                          <li><i class="fa fa-comments-o"></i> <router-link v-bind:to="'posts/' + post.id">Comments {{ post.comments.length }} </router-link></li>
                          <li><button v-bind:class="{ hide: !(current_user.downvoted_post_ids[post.id] == true) }" v-on:click="removeDownvote(post)" style="color:red;">↓ {{ post.total_downvotes }}</button><button v-bind:class="{ hide: current_user.downvoted_post_ids[post.id] == true }" v-on:click="downvote(post)">↓ {{ post.total_downvotes }}</button></li>
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
</style>

<script>
    import axios from 'axios';

    export default {
        data: function() {
            return {
                posts: [],
                current_user: {},
                mostHatedPost: {}
            };
        },
        created: function() {
            axios.get("/api/users/" + localStorage.getItem('current_user_id')).then(response => {
                this.current_user = response.data;
            });
            axios.get("/api/posts").then(response => {
                this.posts = response.data;
                this.mostHatedPost = this.mostHated(this.posts);
                console.log(this.mostHatedPost);
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
                return string.substring(0,500)+"[...]";
            },
            mostHated: function(posts) {
              var mostHated = this.posts[0];
              for(var i = 0; i < this.posts.length; i++) {
                if (this.posts[i].total_downvotes > mostHated.total_downvotes) {
                  mostHated = this.posts[i];
                }
              }
              console.log(mostHated);
              return mostHated;
            }	
        }	
    }  
</script>

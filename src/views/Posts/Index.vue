<template>
    <div class="posts-index">
        <div v-for="post in posts" :key="post.id">
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
                      <span class="news-category"><router-link v-bind:to="'users/' + post.author_id">{{ post.authored_by }}</router-link></span>
                      <h2 class="news-title"><router-link v-bind:to="'posts/' + post.id">{{ post.title }}</router-link></h2>
                      <span class="news-date">{{ post.date }}</span>
                      <div class="news-entry">
                        <p>{{ post.text }}</p>
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
                current_user: {}
            };
        },
        created: function() {
            axios.get("/api/users/" + localStorage.getItem('current_user_id')).then(response => {
                this.current_user = response.data;
            });
            axios.get("/api/posts").then(response => {
                this.posts = response.data;
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
            }		
        }	
    }  
</script>

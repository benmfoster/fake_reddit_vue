    <template>
    <!-- site-main -->
    <div class="site-main posts-show">     

      <!-- post-entry -->
      <div class="post-entry">
        <div class="container">
          <div class="row">

            <!-- content-area -->
            <div class="col-md-8">
              <article>
                <div class="news-container">
                  
                    <span v-if="isMostHated(post)"><h2>Most Hated:</h2></span><h1 class="news-title">{{ post.title }}</h1>
                    <span class="news-date">{{ post.date }}</span>
                    <div class="author-info">
                        <small>posted by <router-link v-bind:to="'../users/' + post.author_id">{{ post.authored_by }}</router-link></small>
                
                        
                      </div><!-- .author-info -->
                    <div class="news-image">
                      <img v-bind:src="post.image_url" />
                    </div><!-- .news-image -->
                    <div class="news-entry">
                      <p>{{ post.text }}</p>
                    </div><!-- .news-entry -->
                    

                    

                    
                    

                 
                  <div class="news-footer">

                    <div class="row">
                      <div class="col-md-6">
                      </div><!-- .col-md-6 -->
                      <div class="col-md-6">
                        <div class="news-footer-share">

                            <router-link v-bind:to="post.id">
                              Comments {{ post.comments.length }}
                            </router-link>

                            <span v-if="isLoggedIn()">

                              <button v-bind:class="{ hide: !(current_user.downvoted_post_ids[post.id] == true) }" v-on:click="removeDownvote(post)" style="color:red;">
                                ↓ {{ post.total_downvotes }}
                              </button>

                              <button v-bind:class="{ hide: current_user.downvoted_post_ids[post.id] == true }" v-on:click="downvote(post)">
                                ↓ {{ post.total_downvotes }}
                              </button>

                            </span>

                            <span v-else>
                              <button>↓ {{ post.total_downvotes }}</button>
                            </span>
    
                              <router-link v-bind:to="post.id + '/edit'">

                                <button class="btn btn-warning" v-if="isLoggedIn() && current_user.name == post.authored_by">
                                  Edit Post
                                </button>

                              </router-link>    
  
                        </div>
                      </div><!-- .col-md-6 -->
                    </div><!-- .row -->

                  </div><!-- .news-footer -->

                  <div class="news-author-bio">
                    <div class="author-avatar">
                        <router-link v-bind:to="'../users/' + post.author_id"><img v-bind:src="post.author_image" alt="" /></router-link>
                    </div><!-- .author-avatar -->
                    <div class="author-info">
                        <h4><router-link v-bind:to="'../users/' + post.author_id">{{ post.authored_by }}</router-link>
                            <small>posted this.</small></h4>
                    </div><!-- .author-info -->
                  </div><!-- .news-author-bio -->

                  

                 

                </div><!-- .news-container -->
              </article>

              <div id="comments" class="comments-area">
                <h2 class="comments-title" v-if="toggleCommentsHeader()">
                    {{ post.comments.length }} comments
                </h2><!-- .comments-title -->

                <ol class="comment-list" v-for="comment in post.comments">
                  <li>
                    
                        <div class="comment-author">
                          <img v-bind:src="comment.author_image" class="avatar" alt="" /> 
                          <router-link v-bind:to="'../users/' + comment.author_id">{{ comment.authored_by }}</router-link>
                        </div><!-- .comment-author -->
                        <div class="comment-metadata">
                          <time>{{ comment.last_edited }}</time>
                        </div><!-- .comment-metadata -->
                      <div class="comment-content">
                        <router-link v-bind:to="'/users/' + comment.tagged_user_id">
                          {{ findTaggedUserName(comment) }}
                        </router-link>
                        {{ comment.text }}
                        <small v-if="isLoggedIn() && comment.authored_by == current_user.name">
                          <span v-on:click="toggleEditComment(comment)" class="underline-on-hover"> Edit </span>
                          <span v-on:click="deleteComment(comment)" class="underline-on-hover">Delete</span>
                        </small>
                        <div v-if="currentComment === comment">
                          <input type="text" class="form-control" placeholder="Edit comment." v-model="commentEditText" />
                          <button v-on:click="submitCommentEdit(comment)">Submit</button>
                        </div>
                      </div><!-- .comment-content -->

                  </li>
                </ol>

                <ol class="comment-list" v-bind:class="{ hide: isSubmitted == false }">
                    <li>
                      <article class="comment-body">
                        <footer class="comment-meta">
                          <div class="comment-author">
                            <img v-bind:src="current_user.profile_picture" class="avatar" alt=""> 
                            <router-link v-bind:to="'../users/' + current_user.id">{{ current_user.name }}</router-link>
                          </div><!-- .comment-author -->
                          <div class="comment-metadata">
                          </div><!-- .comment-metadata -->
                        </footer><!-- .comment-meta -->
                        <div class="comment-content">
                          <router-link v-bind:to="'/users/' + taggedUserId">{{ newCommentTag }}</router-link>
                          {{ showNewComment }}
                          <small>
                            <span v-on:click="toggleEditComment(newCommentObject)" class="underline-on-hover"> Edit </span>
                            <span v-on:click="deleteComment(newCommentObject)" class="underline-on-hover">Delete</span>
                          </small>
                          <div v-if="currentComment === newCommentObject">
                            <input type="text" class="form-control" placeholder="Edit comment." v-model="commentEditText" />
                            <button v-on:click="submitCommentEdit(newCommentObject)">Submit</button>
                        </div>
                        </div><!-- .comment-content -->                      
                      </article><!-- .comment-body -->
                    </li>
                  </ol>

                <div id="respond" class="comment-respond" v-if="isLoggedIn()">
                  <h3 class="comment-reply-title">Leave a Reply</h3>

                  <form v-on:submit.prevent="submit()">
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="Tag someone. " v-model="taggedUserName">
                      <div v-if="taggedUserName.length > 0 && isShowTaggedUsersDropdown">
                        <div class="dropdown">
                          <div class="dropdown-content">
                            <div v-for="user in filteredItems">
                                <img v-bind:src="user.profile_picture" class="avatar" alt="" width="20px" />
                              <span v-on:click="fillSearchBar(user)" style="margin-left: 8px;"> {{ user.name }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    <div class="form-group">
                      <textarea class="form-control" rows="5" placeholder="Message: " v-model="newComment"></textarea>
                    </div>
                    <button class="btn btn-secondary btn-lg btn-block btn-square btn-bordered" type="submit">Submit</button>
                  </form>
                </div><!-- #respond -->
              </div><!-- #comments -->

            </div><!-- .col-md-8 -->


          </div><!-- .row -->
        </div><!-- .container -->
      </div><!-- .post-entry -->  

    </div><!-- .site-main -->
</template>

<style>
  .hide {
          display: none;
          visibility: hidden;
      }
  .underline-on-hover:hover {
      text-decoration: underline;
  }
</style>
        
<script>
    import axios from "axios";

export default {
  data: function() {
    return {
      post: {},
      user: {},
      current_user: {},
      errors: [],
      newComment: "",
      showNewComment: "",
      newCommentObject: {},
      isSubmitted: false,
      users: [],
      taggedUserName: "",
      taggedUserId: 0,
      isShowTaggedUsersDropdown: true,
      newCommentTag: "",
      commentEditText: "",
      currentComment: {}
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
    });
    axios.get("/api/users/" + localStorage.getItem('current_user_id')).then(response => {
        this.current_user = response.data;
    });
    axios.get("api/users").then(response => {
      this.users = response.data;
    });
    axios.get("/api/posts/" + this.$route.params.id).then(response => {
      this.post = response.data;
    });
  },
  computed: {
    filteredItems() {
      return this.users.filter(user => {
         return user.name.toLowerCase().indexOf(this.taggedUserName.toLowerCase()) > -1
      })
    }
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
            console.log("Success!", response.data);
        }).catch(error => {
        this.errors = error.response.data.errors;
        this.status = error.response.status;
        });
        this.current_user.downvoted_post_ids[post.id] = true;
        post.total_downvotes++;
    },		
    submit: function() {
      for(var i = 0; i < this.users.length; i++) {
        if (this.taggedUserName.toLowerCase().substring(1) == this.users[i].name.toLowerCase()) {
          this.taggedUserId = this.users[i].id;
          var params = {
            user_id: this.users[i].id,
            post_id: this.post.id
          };
          axios.post("/api/notifications", params).then(response => { 
            console.log(response.data);
          }).catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
          });
        }
      }
          var formData = new FormData();
          formData.append("text", this.newComment);
          formData.append("post_id", this.post.id);
          formData.append("tagged_user_id", this.taggedUserId);
          axios.post("/api/comments", formData).then(response => {
          this.newCommentObject = response.data;
          }).catch(error => {
            this.errors = error.response.data.errors;
            this.status = error.response.status;
          });
          this.isSubmitted = true;
          this.newCommentTag = this.taggedUserName;
          this.taggedUserName = "";
          this.showNewComment = this.newComment;
          this.newComment = "";  
    },
    toggleEditComment: function(comment) {
      if(this.currentComment === comment) {
        this.currentComment = {};
      } else {
        this.currentComment = comment;
      }
      console.log(comment.text);
      this.commentEditText = comment.text;
    },
    submitCommentEdit: function(comment) {
      comment.text = this.commentEditText;
      this.showNewComment = this.commentEditText;
      var params = {
        text: this.commentEditText
      };
      axios.patch("/api/comments/" + comment.id, params).then(response => {
            console.log("Success!", response.data);
        }).catch(error => {
        this.errors = error.response.data.errors;
        this.status = error.response.status;
        });
      this.currentComment = {};
    },
    deleteComment: function(comment) {
        axios.delete("/api/comments/" + comment.id).then(response => {
            console.log("Success!", response.data);
        });
        if (comment == this.newCommentObject) {
          this.isSubmitted = false;
        } else {
          this.post.comments.splice(this.post.comments.indexOf(comment), 1);
        }
    },
    toggleCommentsHeader: function() {
      if (this.post.comments.length > 0) {
        return true
      } else if (this.isSubmitted == true) {
        return true
      } else {
        return false
      }
    },
    isLoggedIn: function() {
      if (localStorage.getItem('jwt')) {
        return true;
      } else {
        return false;
      }	
    },
    isMostHated: function(post) {
      if (post.id == localStorage.getItem('mostHatedId')) {
        return true;
      } else {
        return false;
      }
    },
    findTaggedUserName: function(comment)	{
      for(var i = 0; i < this.users.length; i++) {
        if (this.users[i].id == comment.tagged_user_id) {
          return this.users[i].name;
        }
      }
    },
    showTaggedUsersDropdown: function() {
      this.isShowTaggedUsersDropdown = true;
    },
    fillSearchBar: function(user) {
      this.taggedUserName = "@" + user.name;
      this.isShowTaggedUsersDropdown = false;
      this.taggedUserId = user.id;
    }
  }
};
</script>
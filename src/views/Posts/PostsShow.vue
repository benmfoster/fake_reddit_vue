    <template>
    <!-- site-main -->
    <div class="site-main posts-show">     

      <!-- post-entry -->
      <div class="post-entry">
        <div class="container">
          <div class="row">
<div class="news-image">
                      <img v-bind:src="post.image_url" alt="" />
                    </div><!-- .news-image -->
            <!-- content-area -->
            <div class="col-md-12">
              
              <article>
                <div class="news-container">
                  
                    <h2 class="news-title"><span v-if="isMostHated(post)" id="hated"><strong>Most Hated </strong></span>{{ post.title }}<span class="blinky">.</span></h2>
                    
                    <div class="news-author-bio">
                    <div class="author-avatar">
                        <router-link v-bind:to="'../users/' + post.author_id"><img v-bind:src="post.author_image" alt="" /></router-link>
                    </div><!-- .author-avatar -->
                    <div class="author-info">
                        <h4 class="news-category"><router-link v-bind:to="'../users/' + post.author_id">{{ post.authored_by }}</router-link>
                            <small>posted this <span class="news-date">{{ relativeDate(post.date) }}</span></small></h4>
                    </div><!-- .author-info -->
                  </div><!-- .news-author-bio -->
                    
                    <div class="news-entry" style="margin-top:5px;">
                      {{ post.text }}
                    
                    

                    

                    
                    

                 
                 
<span class="pointer lil-fade" style="white-space:nowrap;display:inline-block;">

                            <span v-if="isLoggedIn()">

                              <span v-bind:class="{ hide: !(current_user.downvoted_post_ids[post.id] == true) }" v-on:click="removeDownvote(post)" style="font-size:25px;font-family: 'VT323', monospace;padding:5px;color:red;">
                                ↓{{ post.total_downvotes }}
                              </span>

                              <span v-bind:class="{ hide: current_user.downvoted_post_ids[post.id] == true }" v-on:click="downvote(post)" style="font-size:25px;font-family: 'VT323', monospace;padding:5px;color:navy;">
                                ↓{{ post.total_downvotes }}
                              </span>

                            </span>

                            <span v-else>
                              <span style="font-size:25px;font-family: 'VT323', monospace;padding:5px;color:navy;">↓{{ post.total_downvotes }}</span>
                            </span>
 </span>
                            </div><!-- .news-entry -->
    
                              <router-link v-bind:to="post.id + '/edit'">

                                <button style="float:right;" v-if="isLoggedIn() && current_user.name == post.authored_by">
                                  Edit Post
                                </button>

                              </router-link>    
 
                        

                  

                  

                 

                </div><!-- .news-container -->
              </article>

              <div id="comments" class="comments-area">
                <h2 class="comments-title" v-if="toggleCommentsHeader()">
                    {{ numberOfComments }} comments
                </h2><!-- .comments-title -->

                <ol class="comment-list" v-for="comment in sortedComments">
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
</style>
        
<script>
    import axios from "axios";
    import moment from 'moment';

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
      taggedUserId: -1,
      isShowTaggedUsersDropdown: true,
      newCommentTag: "",
      commentEditText: "",
      currentComment: {},
      sortedComments: {},
      numberOfComments: 0
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
      this.sortedComments = this.post.comments.sort((a, b) => a.id - b.id);
      this.numberOfComments = this.post.comments.length;
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
      if (this.taggedUserName.length > 0) {
        for(var i = 0; i < this.users.length; i++) {
          if (this.taggedUserName.toLowerCase().substring(1) == this.users[i].name.toLowerCase()) {
            this.taggedUserId = this.users[i].id;
            var params = {
              user_id: this.users[i].id,
              post_id: this.post.id,
              tag: true
            };
            console.log(params);
          }
        }
      } else {
          var params = {
            post_id: this.post.id,
            user_id: this.post.author_id,
            tag: false           
          };
          console.log(params);
      }
      if (this.current_user.id != this.post.author_id) {
        axios.post("/api/notifications", params).then(response => { 
            console.log(response.data);
          }).catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
          });
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
      this.numberOfComments += 1; 
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
          return "@" + this.users[i].name;
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
    },
    relativeDate: function(date) {
      return moment(date).fromNow();
    }
  }
};
</script>
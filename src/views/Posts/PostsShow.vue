<template>
  <div class="posts-show">

    <h3>{{ post.title }}</h3>
            <router-link v-bind:to="'../users/' + post.author_id"><p>{{ post.authored_by }}</p></router-link>
            <img v-bind:src="post.image_url" />
            <p>{{ post.text }}</p>
            
            <small>

                <router-link v-bind:to="post.id">Comments {{ post.comments.length }}</router-link>

                    <button v-bind:class="{ hide: !(current_user.downvoted_post_ids[post.id] == true) }" v-on:click="removeDownvote(post)" style="color:red;">

                        ↓ {{ post.total_downvotes }}

                    </button>

                    <button v-bind:class="{ hide: current_user.downvoted_post_ids[post.id] == true }" v-on:click="downvote(post)">

                        ↓ {{ post.total_downvotes }}
                        
                    </button>

            </small>

    <div v-if="current_user.name == post.authored_by">
      <router-link v-bind:to="post.id + '/edit'">
        <button class="btn btn-warning">Edit Post</button>
      </router-link>
    </div>
    
    
      <h4>Comments</h4>
      <div v-for="comment in post.comments">
        <h5><router-link v-bind:to="'../users/' + comment.author_id">{{ comment.authored_by }}</router-link></h5>
        <p>{{ comment.text }}</p>
        <div v-if="comment.authored_by == current_user.name" v-on:click="deleteComment(comment)">
          <small>Delete</small>
        </div>
      </div>

    <div v-bind:class="{ hide: isSubmitted == false }">
      <h5>{{ current_user.name }}</h5>
      <p>{{ newComment }}</p>
      <div v-on:click="deleteComment(newCommentId)">
        <small>Delete</small>
      </div>
    </div>

    <h4>New Comment</h4>
    <form v-on:submit.prevent="submit()">
      <input type="text" v-model="newComment"/>
      <button type="submit">Submit</button>
    </form>
    
  </div>
</template>

<style>
.hide {
        display: none;
        visibility: hidden;
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
      newCommentId: {},
      isSubmitted: false,
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
    });
    axios.get("/api/users/" + localStorage.getItem('current_user_id')).then(response => {
        this.current_user = response.data;
    });
    axios.get("/api/posts/" + this.$route.params.id).then(response => {
      this.post = response.data;
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
            console.log("Success!", response.data);
        }).catch(error => {
        this.errors = error.response.data.errors;
        this.status = error.response.status;
        });
        this.current_user.downvoted_post_ids[post.id] = true;
        post.total_downvotes++;
    },		
    submit: function() {
      var formData = new FormData();
      formData.append("text", this.newComment);
      formData.append("post_id", this.post.id);
  		axios.post("/api/comments", formData).then(response => {
      this.newCommentId = response.data;
  		}).catch(error => {
        this.errors = error.response.data.errors;
        this.status = error.response.status;
      });
      this.isSubmitted = true;
    },
    deleteComment: function(comment) {
        axios.delete("/api/comments/" + comment.id).then(response => {
            console.log("Success!", response.data);
        });
        if (comment == this.newCommentId) {
          this.isSubmitted = false;
        } else {
          this.post.comments.splice(this.post.comments.indexOf(comment), 1);
        }
    }
  }
};
</script>
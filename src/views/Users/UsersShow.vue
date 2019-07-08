<template>
    <div class="users-show">
        <h2>{{ user.name }}</h2>
        <img v-bind:src="user.profile_picture" alt="" />
        <div v-if="user.id == current_user.id"><router-link v-bind:to="'/users/' + current_user.id + '/edit'"><p>Edit Profile</p></router-link></div>
        <h3>Posts</h3>
        <div v-for="post in user.posts">
          <h4><router-link v-bind:to="'../posts/' + post.id">{{ post.title }}</router-link></h4>
          <p>{{ post.last_edited }}</p>
          <small>

                <router-link v-bind:to="'../posts/' + post.id">
                  Comments {{ post.comments.length }}
                </router-link>

                    <button v-bind:class="{ hide: !(current_user.downvoted_post_ids[post.id] == true) }" v-on:click="removeDownvote(post)" style="color:red;">

                        ↓ {{ post.total_downvotes }}

                    </button>

                    <button v-bind:class="{ hide: current_user.downvoted_post_ids[post.id] == true }" v-on:click="downvote(post)">

                        ↓ {{ post.total_downvotes }}
                        
                    </button>

            </small>

          <p>{{ post.text }}</p>
          <div v-for="comment in post.comments"> 
            <router-link v-bind:to="'/users/' + comment.author_id">
              <p>{{ comment.authored_by }} </p>
            </router-link>         
            <p>{{ comment.text }}</p>
            <p>{{ comment.last_edited }} </p>
          </div>
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
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      current_user: {} 
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
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
    }	
  }
};
</script>
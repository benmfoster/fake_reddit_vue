<template>
    <div class="users-show">
        <h2>{{ user.name }}</h2>
        <img v-bind:src="user.profile_picture" alt="" />
        <router-link v-bind:to="'/users/' + user.id + '/edit'"><p>Edit Profile</p></router-link>
        <h3>Posts</h3>
        <div v-for="post in user.posts">
          <h4>{{ post.title }}</h4>
          <p>{{ post.last_edited }}</p>
          <p>{{ post.downvotes }} Downvotes</p>
          <p>{{ post.text }}</p>
          <div v-for="comment in post.comments">          
            <p>{{ comment.text }}</p>
            <router-link v-bind:to="'/users/' + comment.author_id"><p>{{ comment.authored_by }} </p></router-link>
            <p>{{ comment.last_edited }} </p>
          </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {}   
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      console.log(this.user);
    });
  },
  methods: {
  }
};
</script>
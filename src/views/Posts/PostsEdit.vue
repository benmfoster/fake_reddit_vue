<template>
	<div class="posts-edit">
				<div class="post-entry">
				<div class="container">
				<h1 class="text-center">Edit Post</h1>

				<ul>
				<li v-for="error in errors">{{ error }}</li>
				</ul>

				<form v-on:submit.prevent="submit()">
			<div class="form-group">
				<input type="text" class="input-lg form-control" placeholder="Title:" v-model="post.title">
			</div>
			<div class="form-group">
				<textarea type="text" class="input-lg form-control" rows="10" placeholder="Text:" v-model="post.text"></textarea>
			</div>
			<div class="form-group">
				<input type="text" class="input-lg form-control" placeholder="Image Url:" v-model="post.image_url">
			</div>
			<button type="submit" class="btn btn-block btn-square btn-lg btn-secondary">Update</button>
			<router-link to="/../">
					<button class="btn btn-block btn-square btn-danger btn-lg" v-on:click="destroyPost()">Delete Post</button>
					</router-link>
			</form>
			</div>
			</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      errors: [],
      post: {}      
    };
  },
  created: function() {
      axios.get("/api/posts/" + this.$route.params.id).then(response => {
      this.post = response.data;
    });  
  },
  methods: {
  	submit: function() {
  		var params = {
              title: this.post.title,
              text: this.post.text,
              image_url: this.post.image_url
  		};
  		axios.patch("/api/posts/" + this.post.id, params).then(response => {
  			console.log("Success!", response.data);
  			this.$router.push("/posts/" + this.post.id);
  		}).catch(error => {
  			this.errors = error.response.data.errors;
  		});
  	},
  	destroyPost: function() {
  		if(confirm("Do you really want to delete " + this.post.name + "?"))
  		axios.delete("/api/posts/" + this.post.id).then(response => {
  			console.log("Success!", response.data);
  			this.$router.push("/");
  		});
  	}
  }
};
</script>
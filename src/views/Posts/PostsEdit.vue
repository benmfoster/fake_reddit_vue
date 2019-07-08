<template>
	<div class="posts-edit">
		
		<h1 class="text-center">Edit Post</h1>

		<ul>
		  <li v-for="error in errors">{{ error }}</li>
		</ul>

		<form v-on:submit.prevent="submit()">
		  <div class="form-row">
		    <div class="form-group col-md-6">
		      <label for="title">Title</label>
		      <input type="text" class="form-control" id="title" placeholder="title" v-model="post.title">
		    </div>
		    <div class="form-group col-md-6">
		      <label for="text">Body</label>
		      <input type="text" class="form-control" id="text" placeholder="body text" v-model="post.text">
		    </div>
            <div class="form-group col-md-6">
		      <label for="image_url">Image</label>
		      <input type="text" class="form-control" id="image_url" placeholder="url" v-model="post.image_url">
		    </div>
		  </div>
		  <div class="form-group col-md-12 text-center">
		  	<button type="submit" class="btn btn-primary">Update Post</button>
		  </div>		  
		</form>

		<div class="text-center">
			<router-link to="/../">
				<button class="btn btn-danger" v-on:click="destroyPost()">Delete Post</button>
			</router-link>
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
              image_url: this.image_url
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
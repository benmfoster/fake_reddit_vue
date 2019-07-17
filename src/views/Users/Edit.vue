<template>
	<div class="users-edit">
		<div class="post-entry">
        <div class="container">
			<div class="row">

            <!-- content-area -->
            <div class="col-md-8">
		
		<h1>Edit Profile</h1>

		<ul>
		  <li v-for="error in errors">{{ error }}</li>
		</ul>

		<section class="widget widget_about">
			<div class="news-image">
            	<img v-bind:src="user.profile_picture" alt="" />
            </div>
		</section>


		<form v-on:submit.prevent="submit()">
		  <div class="form-group">
		    <div class="form-group">
		      
		      <input type="text" class="input-lg form-control" id="name" placeholder="name" v-model="user.name">
		    </div>
			<div class="form-group">
		      
		      <input type="text" class="input-lg form-control" id="email" placeholder="email" v-model="user.email">
		    </div>
		    <div class="form-group">
				<input type="file" v-on:change="setFile($event)" ref="fileInput">
			</div>
            <div class="form-group">
		      <input type="password" class="form-control" id="password" placeholder="password" v-model="user.password">
		    </div>
		  </div>
		  	<button type="submit" class="btn btn-block btn-square btn-lg btn-secondary">Update</button>
			  <router-link to="/logout">
			  <button class="btn btn-block btn-square btn-danger btn-lg" v-on:click="destroyUser()">Delete Account</button>
					</router-link>
		  
		  
		</form>

					</div>
				</div>
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
	  user: {},
	  newProfilePicture: ""      
    };
  },
  created: function() {
      axios.get("/api/users/" + this.$route.params.id).then(response => {
		this.user = response.data;
		console.log(this.user);
	});  
	axios.get("/api/comments/").then(response => {
		this.comments = response.data;
		console.log(this.comments);
    });  
  },
  methods: {
	setFile: function(event) {
		if (event.target.files.length > 0) {
			this.newProfilePicture = event.target.files[0];
		}
    },
  	submit: function() {
  		var formData = new FormData();
			  formData.append("name", this.user.name);
			  formData.append("email", this.user.email);
              formData.append("profile_picture_url", this.newProfilePicture);
			  formData.append("password", this.user.password);
			  formData.append("id", this.user.id);
  		axios.patch("/api/users/" + this.user.id, formData).then(response => {
  			console.log("Success!", response.data);
  			this.$router.push("/users/" + this.user.id);
  		}).catch(error => {
  			this.errors = error.response.data.errors;
  		});
  	},
  	destroyUser: function() {
  		if(confirm("Do you really want to delete " + this.user.name + "?"))
		for(var i = 0; i < this.user.posts.length; i++) {
			axios.delete("api/posts/" + this.user.posts[i].id).then(response => {
				console.log("Success!", response.data);
			});
		}
		for(var i = 0; i < this.user.comments.length; i++) {
			axios.delete("api/comments/" + this.user.comments[i].id).then(response => {
				console.log("Success!", response.data);
			});
		}
		for(var i = 0; i < this.comments.length; i++) {
			var params = {tagged_user_id: -1};
			if (this.comments[i].tagged_user_id == this.user.id) {
				axios.patch("api/comments/" + this.comments[i].id, params).then(response => {
					console.log("Success!", response.data);
				});
			}
		}
		axios.delete("/api/users/" + this.user.id).then(response => {
			console.log("Success!", response.data);
			this.$router.push("/logout");
		});
  	}
  }
};
</script>
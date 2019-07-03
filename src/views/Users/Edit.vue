<template>
	<div class="users-edit">
		
		<h1 class="text-center">Edit Profile</h1>

		<ul>
		  <li v-for="error in errors">{{ error }}</li>
		</ul>

		<form v-on:submit.prevent="submit()">
		  <div class="form-row">
		    <div class="form-group col-md-6">
		      <label for="name">Name</label>
		      <input type="text" class="form-control" id="name" placeholder="name" v-model="user.name">
		    </div>
		    <div class="form-group col-md-6">
		      <label for="profile_picture">Profile Picture</label>
		      <input type="text" class="form-control" id="profile_picture" placeholder="url" v-model="user.profile_picture">
		    </div>
            <div class="form-group col-md-6">
		      <label for="profile_picture">Password</label>
		      <input type="text" class="form-control" id="password" placeholder="password" v-model="user.password">
		    </div>
		  </div>
		  <div class="form-group col-md-12 text-center">
		  	<button type="submit" class="btn btn-primary">Update Profile</button>
		  </div>
		  
		</form>

		<div class="text-center">
			<router-link to="/logout">
				<button class="btn btn-danger" v-on:click="destroyUser()">Delete Account</button>
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
  	submit: function() {
  		var params = {
              name: this.user.name,
              profile_picture_url: this.user.profile_picture,
              password: this.user.password,
              id: this.user.id
  		};
  		axios.patch("/api/users/" + this.user.id, params).then(response => {
  			console.log("Success!", response.data);
  			this.$router.push("/users/" + this.user.id);
  		}).catch(error => {
  			this.errors = error.response.data.errors;
  		});
  	},
  	destroyUser: function() {
  		if(confirm("Do you really want to delete " + this.user.name + "?"))
  		axios.delete("/api/users/" + this.user.id).then(response => {
  			console.log("Success!", response.data);
  			this.$router.push("/");
  		});
  	}
  }
};
</script>
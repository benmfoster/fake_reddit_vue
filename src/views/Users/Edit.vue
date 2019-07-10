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
		      <input type="text" class="input-lg form-control" id="profile_picture" placeholder="url" v-model="user.profile_picture">
		    </div>
            <div class="form-group">
		      <input type="text" class="form-control" id="password" placeholder="password" v-model="user.password">
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
<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit()" style="margin-bottom: 20px;">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Name:</label> 
          <input type="text" class="form-control" v-model="name">
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Profile Picture:</label>
          <input type="file" v-on:change="setFile($event)" ref="fileInput">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      newProfilePicture: "",
      errors: []
    };
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.newProfilePicture = event.target.files[0];
      }
    },
    submit: function() {
      var formData = new FormData();
        formData.append("name", this.name);
        formData.append("email", this.email);
        formData.append("profile_picture_url", this.newProfilePicture);
        formData.append("password", this.password);
        formData.append("password_confirmation", this.passwordConfirmation);
      axios.post("/api/users", formData).then(response => {
        this.$router.push("/login");
        }).catch(error => {
          this.errors = error.response.data.errors;
        });     
    }    
  }
}
</script>
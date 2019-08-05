<template>
  <div class="posts-new">
    <div class="post-entry">
				<div class="container">
          <div class="row">

            <!-- content-area -->
            <div class="col-md-8">

    <h1 class="text-center">New Post</h1>

    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <form v-on:submit.prevent="submit()">
      <div class="form-group">
        <input type="text" class="input-lg form-control" placeholder="Title:" v-model="newPostTitle">
      </div>
      <div class="form-group">
       <textarea type="text" class="input-lg form-control" rows="10" placeholder="Text:" v-model="newPostText"></textarea>
      </div>
      <div class="form-group">
        <input type="file" v-on:change="setFile($event)" ref="fileInput">
      </div>
        <button type="submit" class="btn btn-block btn-square btn-lg btn-secondary">Submit</button>
    </form>

    
      </div>
        </div></div></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newPostTitle: "",
      newPostText: "",
      newPostImage: "",
      errors: [],
      status: ""
    };
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.newPostImage = event.target.files[0];
      }
    },
    submit: function() {
      var formData = new FormData();
          formData.append("title", this.newPostTitle);
          formData.append("text", this.newPostText);
          formData.append("image_url", this.newPostImage); 
      axios
          .post("/api/posts", formData)
          .then(response => {
          this.$router.push("/posts/" + response.data.id);
          })
          .catch(error => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
      });
    }
  }
};
</script>
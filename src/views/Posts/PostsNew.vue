<template>
  <div class="posts-new">
    <div class="post-entry">
				<div class="container">

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
        <input type="text" class="input-lg form-control" placeholder="Image Url:" v-model="newPostImage">
      </div>
      <button type="submit" class="btn btn-block btn-square btn-lg btn-secondary">Submit</button>
    </form>

    <!-- <form v-on:submit.prevent="submit()">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="title">Title</label>
          <input type="text" class="form-control" placeholder="title" v-model="newPostTitle">
        </div>
        <div class="form-group col-md-6">
          <label for="text">Text</label>
          <input type="text" class="form-control" id="text" placeholder="text" v-model="newPostText">
        </div>
      </div>
      <div class="form-group col-md-12">
        <label for="image_url">Image</label>
        <input type="text" class="form-control" placeholder="url" v-model="newPostImage">
      </div>
      <div class="form-group col-md-12 text-center">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </form> -->
      </div>
        </div>
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
      submit: function() {
        var params = {
            title: this.newPostTitle,
            text: this.newPostText,
            image_url: this.newPostImage
        };
        axios
            .post("/api/posts", params)
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
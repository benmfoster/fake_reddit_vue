<template>
    <div class="posts-index">
        <div v-for="post in posts" :key="post.id">

            <h3>{{ post.title }}</h3>
            <small>{{ post.authored_by }}</small>
            <p>{{ post.text }}</p>
            
            <small>

                Comments {{ post.comments.length }}

                    <button v-bind:class="{ hide: !(user.downvoted_post_ids[post.id] == true) }" v-on:click="setCurrentPost(post)" style="color:red;">

                        ↓ {{ post.downvotes.length + post.down }}

                    </button>

                    <button v-bind:class="{ hide: user.downvoted_post_ids[post.id] == true }" v-on:click="downvote(post)">

                        ↓ {{ post.downvotes.length + post.down }}
                        
                    </button>

            </small>

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
    import axios from 'axios';

    export default {
        data: function() {
            return {
                posts: [],
                currentPost: [],
                user: {},
            };
        },
        created: function() {
            axios.get("/api/users/" + this.$route.params.id).then(response => {
                this.user = response.data;
                console.log(this.user);
            });
            axios.get("/api/posts").then(response => {
                this.posts = response.data;
                console.log(this.posts);
            });
        },
        methods: {
            setCurrentPost: function(post) {
                this.currentPost = post;
            },
            removeDownvote: function(post) {
                for(var i = 0; i < post.downvotes.length; i++) {
                    if(this.currentPost.downvotes[i].user_id == this.user.id) {
                        axios.delete("/api/downvotes/" + post.downvotes[i].id).then(response => {
                                    console.log("Success!", response.data);
                        });
                    }
                }
                this.user.downvoted_post_ids[post.id] = false;
                post.down--;            
            },
            downvote: function(post) {
                var formData = new FormData();
                formData.append("post_id", post.id);
                axios.post("/api/downvotes", formData).then(response => {
                    post.downvotes.push(response.data.downvote.downvote);
                    console.log("Success!", response.data);
                }).catch(error => {
                this.errors = error.response.data.errors;
                this.status = error.response.status;
                });
                this.user.downvoted_post_ids[post.id] = true;
                post.down++;
            }		
        }	
    }  
</script>

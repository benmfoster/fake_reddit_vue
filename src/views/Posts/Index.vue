<template>
    <div class="posts-index">
        <div v-for="post in posts" :key="post.id">

            <h3>{{ post.title }}</h3>
            <small>{{ post.authored_by }}</small>
            <p>{{ post.text }}</p>
            
            <small>

                Comments {{ post.comments.length }}

                    <button v-bind:class="{ hide: !(user.downvoted_post_ids[post.id] == true) }" v-on:click="removeDownvote(post)" style="color:red;">

                        ↓ {{ post.total_downvotes }}

                    </button>

                    <button v-bind:class="{ hide: user.downvoted_post_ids[post.id] == true }" v-on:click="downvote(post)">

                        ↓ {{ post.total_downvotes }}
                        
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
            removeDownvote: function(post) {
                axios.delete("/api/downvotes/" + post.id).then(response => {
                    console.log("Success!", response.data);
                });
                this.user.downvoted_post_ids[post.id] = false;
                post.total_downvotes--;         
            },
            downvote: function(post) {
                var params = {post_id: post.id};
                axios.post("/api/downvotes", params).then(response => {
                    console.log("Success!", response.data);
                }).catch(error => {
                this.errors = error.response.data.errors;
                this.status = error.response.status;
                });
                this.user.downvoted_post_ids[post.id] = true;
                post.total_downvotes++;
            }		
        }	
    }  
</script>

<template>
    <div class="posts-index">
        <div v-for="post in posts" :key="post.id">
            <h3>
                <router-link v-bind:to="'posts/' + post.id">
                    {{ post.title }}
                </router-link>
            </h3>
            <small>
                <router-link v-bind:to="'users/' + post.author_id">
                    {{ post.authored_by }}
                </router-link>
            </small>
                <p>{{ post.text }}</p>
            <small>

                Comments {{ post.comments.length }}

                    <button v-bind:class="{ hide: !(current_user.downvoted_post_ids[post.id] == true) }" v-on:click="removeDownvote(post)" style="color:red;">

                        ↓ {{ post.total_downvotes }}

                    </button>

                    <button v-bind:class="{ hide: current_user.downvoted_post_ids[post.id] == true }" v-on:click="downvote(post)">

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
                current_user: {}
            };
        },
        created: function() {
            axios.get("/api/users/" + localStorage.getItem('current_user_id')).then(response => {
                this.current_user = response.data;
            });
            axios.get("/api/posts").then(response => {
                this.posts = response.data;
            });
        },
        methods: {
            removeDownvote: function(post) {
                axios.delete("/api/downvotes/" + post.id).then(response => {
                    console.log("Success!", response.data);
                });
                this.current_user.downvoted_post_ids[post.id] = false;
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
                this.current_user.downvoted_post_ids[post.id] = true;
                post.total_downvotes++;
            }		
        }	
    }  
</script>

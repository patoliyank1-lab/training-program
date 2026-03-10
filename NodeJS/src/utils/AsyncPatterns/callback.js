import { fakeAPi } from "./fakeApi.js";


// create callback function to handel API.
 function fetchData(callback, time, res) {
     const response = callback()
     setTimeout(() => {
        console.log(`after ${time} second.`)
        console.log(response)
       return res.json(JSON.stringify(response)) 
    }, time * 1000);
}



export const callbackRouteForFAkeApi = (req, res) => {
    fetchData(() => fakeAPi , 3, res);
}

export const callbackRouteForApi = (req, res) => {
    fetchData(() => fetch('https://dummyjson.com/users?delay=1000'), 5, res);
}


// callback hell example for handel asynchronous tasks 
function fetchUser(callback) {
    setTimeout(() => {
        callback({ id: 1, name: 'John' });
    }, 1000);
}

function fetchPosts(userId, callback) {
    setTimeout(() => {
        callback([{ id: 101, title: 'Post 1' }]);
    }, 1000);
}

function fetchComments(postId, callback) {
    setTimeout(() => {
        callback([{ id: 201, text: 'Great post!' }]);
    }, 1000);
}

export const  callbackRouteForCallbackHell = (req, res,next) => fetchUser((user) => {
    console.log('User:', user);
    fetchPosts(user.id, (posts) => {
        console.log('Posts:', posts);
        fetchComments(posts[0].id, (comments) => {
            console.log('Comments:', comments);
            res.json({
                User: user,
                Posts: posts,
                Comments: comments,
            })
        });
    });
});
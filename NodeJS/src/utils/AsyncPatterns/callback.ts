import { fakeAPi } from "./fakeApi.js";
import type { Response, Request, NextFunction } from "express";

// create callback function to handel API.
 function fetchData(callback:() => void, time:number, res:Response) {
     const response = callback()
     setTimeout(() => {
        console.log(`after ${time} second.`)
        console.log(response)
       return res.json(JSON.stringify(response)) 
    }, time * 1000);
}



export const callbackRouteForFAkeApi = (req:Request, res:Response) => {
    fetchData(() => fakeAPi , 3, res);
}

export const callbackRouteForApi = (req:Request, res:Response) => {
    fetchData(() => fetch('https://dummyjson.com/users?delay=1000'), 5, res);
}


// callback hell example for handel asynchronous tasks 
function fetchUser(callback: ({}:any) => void) {
    setTimeout(() => {
        callback({ id: 1, name: 'John' });
    }, 1000);
}

function fetchPosts(userId:number, callback:({}:any) => void) {
    setTimeout(() => {
        callback([{ id: 101, title: 'Post 1' }]);
    }, 1000);
}

function fetchComments(postId:number, callback:({}:any) => void) {
    setTimeout(() => {
        callback([{ id: 201, text: 'Great post!' }]);
    }, 1000);
}

export const  callbackRouteForCallbackHell = (req:Request, res:Response,next:NextFunction) => fetchUser((user:{id:number}) => {
    console.log('User:', user);
    fetchPosts(user.id, (posts:Array<any>) => {
        console.log('Posts:', posts);
        fetchComments(posts[0].id, (comments:object) => {
            console.log('Comments:', comments);
            res.json({
                User: user,
                Posts: posts,
                Comments: comments,
            })
        });
    });
});
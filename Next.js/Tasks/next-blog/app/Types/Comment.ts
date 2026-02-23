export interface Comment {
id:string;  
postId:string;
massage:string;
user:{
    userId:string | null;
    name:string;
    email:string;
}
  createdAt:string;
}
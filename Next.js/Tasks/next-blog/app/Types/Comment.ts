export interface Comment {
postId:string;
massage:string;
user:{
    userId:string | null;
    name:string;
    email:string;
}
  createdAt:string;
}
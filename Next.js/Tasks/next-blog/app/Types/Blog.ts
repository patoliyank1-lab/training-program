export interface Post {
  id: string,
  thumbnail:string,
  title: string,
  body: string,
  tags: string[],
  Category:string,
  likes: number,
  likesUser:{
    userId:string;
    email:string
  },
  comments:number
  views: number,
  userId: string
  createdAt:string,
}
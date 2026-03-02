export interface User {
    id: string;
    name: string;
    age: number;
    gender: string;
    email: string;
    password: string;
    avatar: string;
    applyJOb : string[],
    createdAt: string;
}


export interface StoreUser {
    id: string
    name: string
    email: string
    role: 'admin' | 'user'
    avatar: string
  }



  export interface Category {
  id: string,
  name: string,
}

export interface Location {
  id:string,
  name:string
} 

export interface Jobs {
  id: number;
  title: string;
  company: string;
  location:string;
  type: string;
  description: string;
  postedDate: string;
  requirements: string[],
  skills: string[],
  salary: string,
  status: string
}
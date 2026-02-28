export interface User {
    id: string;
    name: string;
    age: number;
    gender: string;
    email: string;
    password: string;
    avatar: string;
    role: 'admin' | 'user';
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
  catalogId: string,
  name: string,
  isActive: boolean
  createdAt:string
}

export interface Jobs {
   name: string,
}
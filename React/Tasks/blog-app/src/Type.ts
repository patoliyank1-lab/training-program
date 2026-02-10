export interface User {
    id: string;
    fullName: string;
    email: string;
    number?: string;
    username: string;
    password: string;
    createdAt: string;
}


export interface Blog {
    id: string;
    img?:string;
    u_id:string;
    title: string;
    description: string;
    likes: number;
    share: number;
    view: number;
    createdAt: string;
}

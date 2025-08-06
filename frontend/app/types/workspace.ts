import type { User } from "./user";

export interface Workspace{
    _id:string;
    name:string;
    description?:string;
    owner:User|string;
    color:string;
    members:{
        user:User,
        role:"admin"|"member"|"Owner"|"Viewer";
        joinedAt:Date;
    } [];
    createdAt:Date;
    updatedAt:Date; 
}
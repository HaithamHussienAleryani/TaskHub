export type User = {
    _id: number;
    name: string;
    createdAt: Date;
    email: string;
    isEmailVerified:boolean;
    updatedAt:Date;
   profilePicture?:string; 

}
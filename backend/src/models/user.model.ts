import mongoose from "mongoose";

export interface User{
    id:string;
    email:string;
    password: string;
    name:string;
    address:string;
    isAdmin:boolean;
}

export const UserSchema = new mongoose.Schema<User>(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        address: {type: String, required: true},
        isAdmin: {type: Boolean, default: false},
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);

export const UserModel = mongoose.model<User>("user", UserSchema);



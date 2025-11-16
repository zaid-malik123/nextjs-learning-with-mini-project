import mongoose from "mongoose";

interface userI{
    _id?: mongoose.Types.ObjectId
    userName?: string,
    email?: string,
    password?: string,
    image?: string,
    createdAt?: Date,
    updatedAt?: Date

}

const userSchema = new mongoose.Schema<userI>({
    userName: String,
    email: String,
    password: String,
    image: String
},{timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User

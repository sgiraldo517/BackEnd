import mongoose from "mongoose";

//! Creacion de coleccion
const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true },
    age: { type: Number },
    password: { type: String, required: true },
    rol: { type: String, default: "usuario" },
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel
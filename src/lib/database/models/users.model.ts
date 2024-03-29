import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
}, {
    timestamps: true
})

const User = models.User || model("User", UserSchema);

export default User;
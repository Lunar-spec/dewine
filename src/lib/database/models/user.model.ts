import { Model, Schema, model } from "mongoose";
interface UserDoc extends Document {
    name: string;
    email: string;
    emailVerified?: Date | null;
    password: string;
    image?: string | null;
    role?: "USER" | "ADMIN";
    createdAt: Date;
    updatedAt: Date;
}

interface UserModel extends Model<UserDoc> { }

const UserSchema = new Schema<UserDoc, UserModel>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailVerified: {
        type: Date,
        default: null
    },
    password: {
        type: String,
    },
    image: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
}, {
    timestamps: true
});

// console.log(models.User);
// export default models.User || model<UserDoc, UserModel>("User", UserSchema);
let User: any;
try {
    User = model("User");
} catch {
    User = model("User", UserSchema);
}

export default User;
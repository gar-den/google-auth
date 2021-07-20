import mongoose, { Schema, model, mongo } from "mongoose";

const UserSchema: Schema = new Schema({
    id: String,
    password: String,
    email: String,
    nickname: String,
    like_array: {
      type: Array,
      default: [],
    },
    order_array: {
      type: Array,
      default: [],
    },
});

export default mongoose.model("Users", UserSchema);
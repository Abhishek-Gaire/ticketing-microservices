import mongoose from "mongoose";
import { Password } from "../services/password";

// 1. Attributes required to create a User
interface UserAttrs {
  email: string;
  password: string;
}

// 2. Interface describing a User document (what you get back from MongoDB)
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// 3. Interface describing the User model (allows custom static methods)
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // timestamps: true,
    toJSON: {
      transform(doc, ret) {
        // Remove the password and __v from the response
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  // Only hash the password if it has been modified (or is new)
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// Add a static method to enforce type-safe creation
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };

import { Request, Response, Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "@mcrosrvtickets/common";

import { User } from "../models/user";

const router: Router = Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Please enter an email address"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("The password must be at least 6 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({
      email,
      password,
    });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
    return;
  }
);

export { router as signupRouter };

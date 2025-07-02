import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

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

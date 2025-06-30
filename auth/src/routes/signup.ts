import {Request, Response, Router} from "express";
import {body, validationResult} from "express-validator";
import {RequestValidationError} from "../errors/request-validation-error";
import {DatabaseConnectionError} from "../errors/database-connection-error";

const router: Router = Router();

router.post("/api/users/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter an email address"),
    body("password")
      .trim()
      .isLength({min: 6, max: 20})
      .withMessage("The password must be at least 6 characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const {email, password} = req.body;

    console.log("Creating User")
    throw new DatabaseConnectionError();
    res.send("hi")

  })

export {router as signupRouter}
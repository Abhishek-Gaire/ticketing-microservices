import { Router } from "express";

const router: Router = Router();

router.post("/api/users/signout", (req, res) => {
  // Clear the JWT from the session
  req.session = null;

  res.send({});
  return;
});

export { router as signoutRouter };

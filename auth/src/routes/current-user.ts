import { Request, Response, Router } from "express";

import { currentUser } from "@mcrosrvtickets/common";

const router: Router = Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
    return;
  }
);

export { router as currentUserRouter };

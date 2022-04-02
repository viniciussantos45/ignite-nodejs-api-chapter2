import { Router } from "express";

import { authenticateRoutes } from "./Authenticate.routes";
import { categoriesRoutes } from "./Categories.routes";
import { specificationsRoutes } from "./Specifications.routes";
import { usersRoutes } from "./Users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use(authenticateRoutes);

export { router };

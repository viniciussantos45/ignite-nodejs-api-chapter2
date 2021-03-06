import { Router } from "express";

import { authenticateRoutes } from "@shared/infra/http/routes/authenticate.routes";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);

router.use(ensureAuthenticated);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/rentals", rentalRoutes);

export { router };

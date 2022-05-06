import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", createRentalController.handle);

export { rentalRoutes };

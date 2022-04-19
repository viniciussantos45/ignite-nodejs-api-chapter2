import express, { NextFunction, Request, Response } from "express";
import swagger from "swagger-ui-express";
import "express-async-errors";
import "reflect-metadata";

import createConnection from "@shared/infra/typeorm";
import "@shared/container";

import swaggerSetup from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import { router } from "./routes";

createConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swagger.serve, swagger.setup(swaggerSetup));
app.use(router);

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return response
				.status(err.statusCode)
				.json({ message: err.message });
		}
		return response
			.status(500)
			.json({ message: `Internal server error - ${err.message}` });
	}
);

app.listen(3333, () => console.log("Server is running"));

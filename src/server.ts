import express from "express";
import swagger from "swagger-ui-express";

import { router } from "./routes";
import swaggerSetup from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swagger.serve, swagger.setup(swaggerSetup));
app.use(router);

app.listen(3333, () => console.log("Server is running"));

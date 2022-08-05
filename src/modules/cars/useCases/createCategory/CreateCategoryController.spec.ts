import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
let userToken: string;

describe("Create Category Controller", () => {
	beforeAll(async () => {
		connection = await createConnection();

		await connection.runMigrations();

		const id = uuidV4();
		const password = await hash("admin", 8);

		await connection.query(
			`INSERT INTO USERS(id, name, email, password, admin, driver_license, created_at)
			values('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, 'xxx', now())
		`
		);

		const responseToken = await request(app)
			.post("/sessions")
			.send({ email: "admin@rentx.com.br", password: "admin" });

		userToken = responseToken.body.token;
	});
	afterAll(async () => {
		await connection.dropDatabase();
		await connection.close();
	});

	it("should be able to create a new category", async () => {
		const response = await request(app)
			.post("/categories")
			.send({ name: "Category supertest", description: "Supertest" })
			.set({
				Authorization: `Bearer ${userToken}`,
			});

		expect(response.status).toBe(201);
	});

	it("should not be able to create a new category if name exists", async () => {
		const response = await request(app)
			.post("/categories")
			.send({ name: "Category supertest", description: "Supertest" })
			.set({
				Authorization: `Bearer ${userToken}`,
			});

		expect(response.status).toBe(400);
	});
});

import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
let userToken: string;

describe("List Categories Controller", () => {
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

	it("should be able to list all categories", async () => {
		await request(app)
			.post("/categories")
			.send({ name: "Category supertest", description: "Supertest" })
			.set({
				Authorization: `Bearer ${userToken}`,
			});

		const response = await request(app)
			.get("/categories")
			.set({
				Authorization: `Bearer ${userToken}`,
			});

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(response.body[0]).toHaveProperty("id");
		expect(response.body[0].name).toEqual("Category supertest");
	});
});

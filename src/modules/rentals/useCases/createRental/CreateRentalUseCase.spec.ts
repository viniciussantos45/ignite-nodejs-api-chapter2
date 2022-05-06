import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DateProvider } from "@shared/container/providers/DateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DateProvider;

describe("Create Rental", () => {
	const dayAdd24Hours = dayjs().add(1, "day").toDate();

	beforeEach(() => {
		dateProvider = new DateProvider();
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
		createRentalUseCase = new CreateRentalUseCase(
			rentalsRepositoryInMemory,
			dateProvider
		);
	});

	it("should be able to create a new rental", async () => {
		const rental = await createRentalUseCase.execute({
			user_id: "1234",
			car_id: "121212",
			expected_return_date: dayAdd24Hours,
		});

		expect(rental).toHaveProperty("id");
		expect(rental).toHaveProperty("start_date");
	});

	it("should not be able to create a new rental if there is another open to the same user", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "1234",
				car_id: "121212",
				expected_return_date: dayAdd24Hours,
			});

			const rental = await createRentalUseCase.execute({
				user_id: "1234",
				car_id: "121212",
				expected_return_date: dayAdd24Hours,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a new rental if there is another open to the same car", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "123",
				car_id: "test",
				expected_return_date: dayAdd24Hours,
			});

			const rental = await createRentalUseCase.execute({
				user_id: "321",
				car_id: "test",
				expected_return_date: dayAdd24Hours,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a new rental with invalid return time", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "123",
				car_id: "test",
				expected_return_date: dayjs().toDate(),
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});

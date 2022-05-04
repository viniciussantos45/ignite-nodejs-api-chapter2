import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create car specification", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		specificationsRepositoryInMemory =
			new SpecificationsRepositoryInMemory();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepositoryInMemory,
			specificationsRepositoryInMemory
		);

		createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
	});
	it("should not be able to add a new specification to a non-existent car", async () => {
		expect(async () => {
			const car_id = "123";
			const specifications_id = ["54321"];

			await createCarSpecificationUseCase.execute({
				car_id,
				specifications_id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should be able to add a new specification to de car", async () => {
		const car = await createCarUseCase.execute({
			name: "Name car",
			brand: "Toyota",
			category_id: "category",
			daily_rate: 123.4,
			description: "Teste",
			fine_amount: 60,
			license_plate: "ABC-1234",
		});

		const specification = await specificationsRepositoryInMemory.create({
			name: "Test",
			description: "Test",
		});

		const car_id = car.id;
		const specifications_id = [specification.id];

		const specificationsCar = await createCarSpecificationUseCase.execute({
			car_id,
			specifications_id,
		});

		expect(specificationsCar).toHaveProperty("specifications");
		expect(specificationsCar.specifications.length).toBe(1);
	});
});

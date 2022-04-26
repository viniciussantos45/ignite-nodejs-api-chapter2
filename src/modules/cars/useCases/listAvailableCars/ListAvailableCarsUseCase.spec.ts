import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepostoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
	beforeEach(() => {
		carsRepostoryInMemory = new CarsRepositoryInMemory();
		listCarsUseCase = new ListAvailableCarsUseCase(carsRepostoryInMemory);
	});

	it("should be able to list all available cars", async () => {
		const car = await carsRepostoryInMemory.create({
			name: "Car 1",
			brand: "Chevrolet",
			category_id: "Category id",
			daily_rate: 1,
			description: "Car description",
			fine_amount: 1,
			license_plate: "ABC-1234",
		});

		// await carsRepostoryInMemory.create({
		// 	name: "Car not available",
		// 	brand: "Chevrolet",
		// 	category_id: "Category id",
		// 	daily_rate: 1,
		// 	description: "Car description",
		// 	fine_amount: 1,
		// 	license_plate: "ABC-1234",
		// });

		const cars = await listCarsUseCase.execute({});
		console.log(cars);
		expect(cars).toEqual([car]);
	});

	it("should be able to list all available cars by name", async () => {
		const car = await carsRepostoryInMemory.create({
			name: "Car 1",
			brand: "Chevrolet",
			category_id: "Category id",
			daily_rate: 1,
			description: "Car description",
			fine_amount: 1,
			license_plate: "ABC-1234",
		});

		await carsRepostoryInMemory.create({
			name: "Car not available",
			brand: "Chevrolet",
			category_id: "Category id",
			daily_rate: 1,
			description: "Car description",
			fine_amount: 1,
			license_plate: "ABC-1234",
		});

		const cars = await listCarsUseCase.execute({
			name: "Car 1",
		});
		expect(cars).toEqual([car]);
	});
	it("should be able to list all available cars by brand", async () => {
		const car = await carsRepostoryInMemory.create({
			name: "Car 1",
			brand: "Chevrolet",
			category_id: "Category id",
			daily_rate: 1,
			description: "Car description",
			fine_amount: 1,
			license_plate: "ABC-1234",
		});

		await carsRepostoryInMemory.create({
			name: "Car not available",
			brand: "Toyota",
			category_id: "Category id",
			daily_rate: 1,
			description: "Car description",
			fine_amount: 1,
			license_plate: "ABC-1234",
		});

		const cars = await listCarsUseCase.execute({
			brand: "Chevrolet",
		});
		expect(cars).toEqual([car]);
	});

	it("should be able to list all available cars by category id", async () => {
		const car = await carsRepostoryInMemory.create({
			name: "Car 1",
			brand: "Chevrolet",
			category_id: "categoria doida",
			daily_rate: 1,
			description: "Car description",
			fine_amount: 1,
			license_plate: "ABC-1234",
		});

		await carsRepostoryInMemory.create({
			name: "Car not available",
			brand: "Toyota",
			category_id: "Category id",
			daily_rate: 1,
			description: "Car description",
			fine_amount: 1,
			license_plate: "ABC-1234",
		});

		const cars = await listCarsUseCase.execute({
			category_id: "categoria doida",
		});
		expect(cars).toEqual([car]);
	});
});

import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
	name: string;
	description: string;
	daily_rate: number;
	license_plate: string;
	fine_amount: number;
	brand: string;
	category_id: string;
}

@injectable()
class CreateCarUseCase {
	constructor(
		@inject("CarsRepository")
		private carsRepository: ICarsRepository
	) {
		// ...
	}
	async execute({
		name,
		brand,
		category_id,
		daily_rate,
		description,
		fine_amount,
		license_plate,
	}: IRequest): Promise<Car> {
		const carExists = await this.carsRepository.findByLicensePlate(
			license_plate
		);

		if (carExists) {
			throw new AppError("Car already exists !");
		}

		const car = await this.carsRepository.create({
			daily_rate,
			brand,
			category_id,
			description,
			fine_amount,
			license_plate,
			name,
		});

		return car;
	}
}

export { CreateCarUseCase };

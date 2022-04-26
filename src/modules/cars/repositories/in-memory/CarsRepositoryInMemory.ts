import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IFindAvailableDTO } from "@modules/cars/dtos/IFindAvailableDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
	cars: Car[] = [];

	async create({
		daily_rate,
		brand,
		category_id,
		description,
		fine_amount,
		license_plate,
		name,
	}: ICreateCarDTO): Promise<Car> {
		const car = new Car();

		Object.assign(car, {
			daily_rate,
			brand,
			category_id,
			description,
			fine_amount,
			license_plate,
			name,
		});

		this.cars.push(car);

		return car;
	}

	async findByLicensePlate(license_plate: string): Promise<Car> {
		return this.cars.find((car) => car.license_plate === license_plate);
	}

	async findAvailable(data: IFindAvailableDTO): Promise<Car[]> {
		const cars = this.cars.filter((car) => {
			if (!car.available) {
				return null;
			}

			if (Object.keys(data).length === 0) {
				return car;
			}

			if (
				Object.values(data).every((value) => {
					if (value === null || value === undefined) {
						return true;
					}

					return false;
				})
			) {
				return car;
			}

			if (
				(data.name && data.name === car.name) ||
				(data.brand && data.brand === car.brand) ||
				(data.category_id && data.category_id === car.category_id)
			) {
				return car;
			}

			return null;
		});
		return cars;
	}
}

export { CarsRepositoryInMemory };

import { inject, injectable } from "tsyringe";

import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
	name: string;
	description: string;
}

@injectable()
class CreateSpecificationUseCase {
	constructor(
		@inject("SpecificationsRepository")
		private specificationsRepository: SpecificationsRepository
	) {
		// ...
	}

	async execute({ name, description }: IRequest) {
		const specificationExists =
			await this.specificationsRepository.findByName(name);

		if (specificationExists) {
			throw new AppError("Specification already exists!");
		}

		await this.specificationsRepository.create({
			name,
			description,
		});
	}
}
export { CreateSpecificationUseCase };

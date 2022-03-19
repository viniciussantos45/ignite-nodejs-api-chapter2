import { SpecificationsRepository } from "../repositories/SpecificationRepository";

interface IRequest {
	name: string;
	description: string;
}

class CreateSpecificationService {
	constructor(private specificationsRepository: SpecificationsRepository) {
		// ...
	}

	execute({ name, description }: IRequest) {
		const specificationExists =
			this.specificationsRepository.findByName(name);

		if (specificationExists) {
			throw new Error("Specification already exists!");
		}

		this.specificationsRepository.create({
			name,
			description,
		});
	}
}
export { CreateSpecificationService };

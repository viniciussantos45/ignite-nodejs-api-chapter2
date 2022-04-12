import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {
		// ...
	}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		// Usuario existe
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError("Email or password incorrect");
		}

		const passwordMatch = await compare(password, user.password);

		// Senha está correta
		if (!passwordMatch) {
			throw new AppError("Email or password incorrect");
		}

		const token = sign({}, "5cd575046fb1c2c3fc3afe3582b3085f", {
			subject: user.id,
			expiresIn: "1d",
		});

		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email,
			},
		};
		return tokenReturn;
	}
}
export { AuthenticateUserUseCase };

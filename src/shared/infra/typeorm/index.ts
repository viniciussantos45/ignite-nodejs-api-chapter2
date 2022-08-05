import "reflect-metadata";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

function isTest() {
	let { NODE_ENV } = process.env;

	if (NODE_ENV) {
		NODE_ENV = NODE_ENV.trim();
	}

	return NODE_ENV === "test";
}

export default async (host = "host.docker.internal"): Promise<Connection> => {
	const defaultOptions = await getConnectionOptions();

	return createConnection(
		Object.assign(defaultOptions, {
			host: isTest() ? "localhost" : host,
			database: isTest() ? "rentx_test" : defaultOptions.database,
		})
	);
};

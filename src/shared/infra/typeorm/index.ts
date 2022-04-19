import "reflect-metadata";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "host.docker.internal"): Promise<Connection> => {
	const defaultOptions = await getConnectionOptions();

	return createConnection(Object.assign(defaultOptions, { host }));
};

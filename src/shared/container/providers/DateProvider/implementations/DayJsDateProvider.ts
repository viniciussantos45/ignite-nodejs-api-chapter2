import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../interfaces/IDateProvider";

dayjs.extend(utc);

class DayJsDateProvider implements IDateProvider {
	addDays(days: number): Date {
		return dayjs().add(days, "days").toDate();
	}
	dateNow(): Date {
		return dayjs().toDate();
	}
	convertToUTC(date?: Date): string {
		return dayjs(date).utc().local().format();
	}
	compareHours(start_date: Date, end_date: Date): number {
		const start_date_utc = this.convertToUTC(start_date);
		const end_date_utc = this.convertToUTC(end_date);

		return dayjs(end_date_utc).diff(start_date_utc, "hours");
	}
}

export { DayJsDateProvider };

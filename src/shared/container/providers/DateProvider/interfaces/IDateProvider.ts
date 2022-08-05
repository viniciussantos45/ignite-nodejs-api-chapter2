interface IDateProvider {
	addDays(days: number): Date;
	compareHours(start_date: Date, end_date: Date): number;
	convertToUTC(date?: Date): string;
	dateNow(): Date;
}

export { IDateProvider };

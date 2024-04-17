import "colors"
import { get } from "./api/42.js";
import { listEvents, postEvent } from "./api/gcal.js";

async function main() {
	const events = await get('events', params);
	if (!events)
		return null;
	const exams = await get('exams', params);
	if (!exams)
		return null;
	const calendar = await listEvents();

	for (let i = 0; i < exams.length; i++)
		events.push(exams[i]);

	if (!events.length) {
		console.log("No events to create.".yellow);
		return null;
	}
	console.log("GET OK!".green + " Inserting...".blue);

	for (let i = 0; i < events.length; i++) {
		const result = await postEvent('POST', events[i]);
		if (result.status === 'confirmed')
			console.log("POST OK!".green + ` Inserted ${i + 1} event${i ? 's' : ''}.`);
		else {
			console.error(`POST Error: ${result.error.code}. `.red + result.error.message);
			break;
		}
	}
}

const err1 = 0
const err2 = 0

const params = {
	CALENDAR_ID: process.env.CALENDAR_ID,
	TOKEN_42: err1 ? '' : process.env.TOKEN_42,
	TOKEN_GOOGLE: err2 ? '' : process.env.TOKEN_GOOGLE,
	begin_at: '2024-04-15',
	end_at: '2024-04-22', // Excluded from scope, so count 1 more day
}


main()
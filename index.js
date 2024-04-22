import "colors"
import { get, getToken as get42Token } from "./api/42.js";
import { insert, getToken as getGoogleToken } from "./api/gcal.js";

async function main() {
	return

	const events = await get('events', params);
	if (!events)
		return null;
	const exams = await get('exams', params);
	if (!exams)
		return null;

	for (let i = 0; i < exams.length; i++)
		events.push(exams[i]);

	if (!events.length) {
		console.log("No events to create.".yellow);
		return null;
	}
	console.log("GET OK!".green);

	let i = 0;
	while (i < events.length) {
		const result = await insert('POST', events[i], params);
		if (!result)
			break;
		else
			i++;
	}
	console.log(`Updated ${i} event${i === 1 ? '' : 's'}.`.blue)
}

const err1 = 0
const err2 = 0

const token_42 = await get42Token()
const token_Google = await getGoogleToken()

const params = {
	CALENDAR_ID: process.env.CALENDAR_ID,
	TOKEN_42: err1 ? '' : token_42,
	TOKEN_GOOGLE: err2 ? '' : token_Google,
	begin_at: '2024-04-22',
	end_at: '2024-04-29', // Excluded from scope, so count 1 more day
}

main()
import "colors"
import { get, getToken } from "./api/42.js";
import { insert } from "./api/gcal.js";

async function main() {
	const token_42 = await getToken();
	if (!token_42) return null;

	const params = {
		CALENDAR_ID: process.env.CALENDAR_ID,
		TOKEN_42: err1 ? '' : token_42,
		TOKEN_GOOGLE: err2 ? '' : process.env.TOKEN_GOOGLE,
		begin_at: process.env.BEGIN_AT,
		end_at: process.env.END_AT,
	}

	const events = await get('events', params);
	if (!events) return null;

	const exams = await get('exams', params);
	if (!exams) return null;

	for (let i = 0; i < exams.length; i++)
		events.push(exams[i]);

	if (!events.length) {
		console.log("No events to create.".yellow);
		return null;
	}
	console.log("[42] ".grey + "GET OK!".green);

	let i = 0;
	while (i < events.length) {
		const result = await insert('POST', events[i], params);
		if (!result)
			break;
		else
			i++;
	}
	console.log("[Google] ".grey + `Updated ${i} event${i === 1 ? '' : 's'}.`.blue)
}

const err1 = 0
const err2 = 0

main()
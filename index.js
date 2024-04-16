import "colors"

async function getEvents(exam) {
	const myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token42}`);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow"
	};

	console.log(`Getting ${exam ? 'exams' : 'events'}...`.blue)
	const result = await fetch(`https://api.intra.42.fr/v2/campus/12/${exam ? 'exams' : 'events'}?range[begin_at]=${begin_at}, ${end_at}`, requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.error(error));

	if (result.error) {
		if (result.status) {
			console.error(`GET Error: ${result.status}. `.red + result.error);
		} else if (result.message) {
			console.error(`GET Error: ${result.error}. `.red + result.message);
		} else {
			console.error(result);
		}
		return null;
	}
	else {
		const ret = [];
		for (let i = 0; i < result.length; i++) {
			ret.push({
				"summary": result[i].name,
				"description": result[i].description,
				"location": result[i].location,
				"start": {
					"dateTime": result[i].begin_at
				},
				"end": {
					"dateTime": result[i].end_at
				},
				"colorId": `${exam ? '4' : '5'}`
			});
			/*
				'1' Lavender
				'2' Sage
				'3' Grape
				'4' Flamingo
				'5' Banana
				'6' Tangerine
				'7' Peacock
				'8' Graphite
				'9' Blueberry
				'10' Basil
				'11' Tomato
			*/
		}
		return ret;
	}
}

async function newPostEvents(events) {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", `Bearer ${tokenGoogle}`);

	const raw = JSON.stringify(events);

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	return fetch("https://www.googleapis.com/calendar/v3/calendars/ion@s19.be/events", requestOptions)
		.then((response) => response.json())
		.then((result) => {
			return result;
		})
		.catch((error) => console.error(error));
}

async function main() {
	const events = await getEvents(0);
	if (!events) return null;
	const exams = await getEvents(1);
	if (!exams) return null;

	for (let i = 0; i < exams.length; i++) { events.push(exams[i]); }

	if (!events.length) {
		console.log("No events to create.".yellow);
		return null;
	}
	console.log("GET OK!".green + " Inserting...".blue);

	for (let i = 0; i < events.length; i++) {
		const result = await newPostEvents(events[i]);
		if (result.status === 'confirmed') {
			console.log("POST OK!".green + ` Inserted ${i + 1} event${i ? 's' : ''}.`);
		}
		else {
			console.error(`POST Error: ${result.error.code}. `.red + result.error.message);
			break;
		}
	}
}

const err1 = 0
const token42 = err1 ? '' : process.env.TOKEN_42
const err2 = 0
const tokenGoogle = err2 ? '' : process.env.TOKEN_GOOGLE
const begin_at = '2024-04-15'
const end_at = '2024-04-22' // Excluded from scope, so count 1 more day

main()
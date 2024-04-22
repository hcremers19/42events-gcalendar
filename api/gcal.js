import "colors"

async function get(event, params) {
	const myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${params.TOKEN_GOOGLE}`);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow"
	};

	return fetch(`https://www.googleapis.com/calendar/v3/calendars/${params.CALENDAR_ID}/events/${event.id}`, requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.error(error));
}

export async function insert(method, event, params) {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", `Bearer ${params.TOKEN_GOOGLE}`);

	const raw = JSON.stringify(event);

	const requestOptions = {
		method: method,
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	const result = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${params.CALENDAR_ID}/events${method === 'PUT' ? '/' + event.id : ''}`, requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.error(error));

	if (result.error) {
		if (result.error.code === 409)
			return insert('PUT', event, params);
		else {
			console.error(`${method} Error: ${result.error.code}. `.red + result.error.message);
			return null;
		}
	}
	else {
		console.log(`${method} OK!`.green);
		return result;
	}
}

async function list(params) {
	const myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${params.TOKEN_GOOGLE}`);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow"
	};

	const result = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${params.CALENDAR_ID}/events?timeMin=${params.begin_at + 'T00:00:00%2B02:00'}&timeMax=${params.end_at + 'T00:00:00%2B02:00'}`, requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.error(error));

	if (result.error) {
		console.error(`GET Error: ${result.error.code}. `.red + result.error.message);
		return null;
	}
	else {
		console.log("GET OK!".green);
		return result.items;
	}
}
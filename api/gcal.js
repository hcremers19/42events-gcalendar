import "colors"

export async function postEvent(method, event) {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", `Bearer ${TOKEN_GOOGLE}`);

	const raw = JSON.stringify(event);

	const requestOptions = {
		method: method,
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	return fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events${method === 'PUT' ? '/' + event.id : ''}`, requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.error(error));
}

export async function listEvents() {
	const myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${TOKEN_GOOGLE}`);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow"
	};

	return fetch(`https://www.googleapis.com/calendar/v3/calendars/ion@s19.be/events?timeMin=${begin_at + '%2B02:00'}&timeMax=${end_at + '%2B02:00'}`, requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.error(error));
}
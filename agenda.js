import "colors"

const main = async (begin_at, end_at, token42, tokenGoogle) => {
	async function getEvents() {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token42}`);

		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow"
		};

		const result = await fetch(`https://api.intra.42.fr/v2/campus/12/events?range[begin_at]=${begin_at}, ${end_at}`, requestOptions)
			.then((response) => response.json())
			.then((result) => result)
			.catch((error) => console.error(error));

		if (result.error) {
			console.error(`GET Error ${result.status}: `.red + result.error);
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
					"colorId": "5"
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

	const events = await getEvents()

	// console.log(events)
	if (!events || !events.length) {
		console.log("No events to create.".yellow)
		return null
	}
	console.log("GET OK!".green + " Creating events...")

	for (let i = 0; i < events.length; i++) {
		const result = await newPostEvents(events[i])
		if (result.status === 'confirmed') {
			console.log("POST OK!".green + ` Created ${i + 1} event${i ? 's' : ''}.`)
		}
		else {
			console.error(`POST Error ${result.error.code}: `.red + result.error.message)
			break
		}
	}
}

const token42 = 'oui'
// const token42 = 'adef4d87d37ba7f43dec3b134a2612813a68abccf16882b2b58e84f139642f10'
const tokenGoogle = 'oui'
// const tokenGoogle = 'ya29.a0Ad52N383baQ9j5PkjMIr0HLkyASKRooSfnfdbtJ3wKsWibFrH0wV8euF9T4HCGll_PNvo0-0S_5185SEJCZm42wvcy7aDViVueGtN7j6qa2Y6LeYHRsRXbugdcMRIl2fESVYfR4oDs7mb2FOG6uNi3qrbx0VCc5vr2CVaCgYKAdISARASFQHGX2MiVc7q5-DoOpu4D0Bde-uwkQ0171'
const begin_at = '2024-04-15'
const end_at = '2024-04-15'

main(begin_at, end_at, token42, tokenGoogle)

// Manage empty call returns 
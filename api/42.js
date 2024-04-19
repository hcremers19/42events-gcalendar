import "colors"

export async function get(scope, params) {
	const myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${params.TOKEN_42}`);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow"
	};

	console.log(`Getting ${scope}...`.blue)
	const result = await fetch(`https://api.intra.42.fr/v2/campus/12/${scope}?range[begin_at]=${params.begin_at}, ${params.end_at}`, requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.error(error));

	if (result.error) {
		if (result.status)
			console.error(`GET Error: ${result.status}. `.red + result.error);
		else if (result.message)
			console.error(`GET Error: ${result.error}. `.red + result.message);
		else
			console.error(result);

		return null;
	}
	else {
		const ret = [];
		for (let i = 0; i < result.length; i++) {
			ret.push({
				"id": `${scope === 'exams' ? 'b' : 'a'}` + result[i].id,
				"summary": result[i].name,
				"description": result[i].description,
				"location": result[i].location,
				"start": { "dateTime": result[i].begin_at },
				"end": { "dateTime": result[i].end_at },
				"colorId": `${scope === 'exams' ? '4' : '5'}` // '4' = Flamingo, '5' = Banana
			});
		}
		return ret;
	}
}
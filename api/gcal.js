import "colors"

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

    if (result.status === 'confirmed')
        console.log("POST OK!".green + ` Inserted ${i + 1} event${i ? 's' : ''}.`);
    else {
        console.error(`POST Error: ${result.error.code}. `.red + result.error.message);
        return null;
    }
}

export async function list(params) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${params.TOKEN_GOOGLE}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const result = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${params.CALENDAR_ID}/events?timeMin=${params.begin_at + '%2B02:00'}&timeMax=${params.end_at + '%2B02:00'}`, requestOptions)
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => console.error(error));

    if (result.status === 'confirmed')
        console.log("GET OK!".green);
    else {
        console.error(`GET Error: ${result.error.code}. `.red + result.error.message);
        return null;
    }
}
# 42 Events to Google Calendar

This is a small script that allows students from School 42 to export the events and exams available on their campus to their Google Calendar

## Install

Clone the repository
```sh
git clone git@github.com:hcremers19/42events-gcalendar.git && cd 42events-gcalendar
```

Install the modules
```sh
yarn install
```

Rename `.env.example` to `.env` and insert your current tokens where needed. (You need to have a [42API app](https://api.intra.42.fr/apidoc/guides/getting_started) and a [Google Developer app](https://console.cloud.google.com/) setup)
```properties
CALENDAR_ID=<usually your email>
TOKEN_42=<your token here>
TOKEN_GOOGLE=<your token here>
```

Run
```sh
yarn test
```

## Roadmap

- Don't insert doubles
- Generate the tokens in the app via the user's client id and client secret
- Convert the script into a web app
- Allow the user to change the dates and the colors in-app
- Allow any user of 42 and Google to use the app with their credentials
- Show events related only to the user and not to the whole campus
- Remove debug lines and send to prod
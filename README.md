# 42 Events to Google Calendar

This is a small script that allows students from School 42 to export the events and exams available on their campus to their Google Calendar

## Install

Clone the repository
```bash
git clone git@github.com:hcremers19/42events-gcalendar.git && cd 42events-gcalendar
```

Install the modules
```bash
yarn install
```

Rename `.env.example` to `.env` and insert your updated tokens where needed
```settings
TOKEN_42=<your token here>
TOKEN_GOOGLE=<your token here>
```

Run
```bash
yarn test
```

## Roadmap

- Generate the tokens in the app via the user's client id and client secret
- Convert the script into a web app
- Allow the user to change the dates and the colors in-app
- Allow any user of 42 and Google to use the app with their credentials

# Ratsig
App for [INTP](https://www.16personalities.com/intp-personality) folks to keep track of their mental health. Allows to create daily entries, store custom metricks and assign tags to each day. Tags can represent places, people, activities or emotions. In addition app creates weekly and monthly summaries of your days using Chat GPT-3.5 turbo. In the future will provide more ways to analyze the data.

## Technologies
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![SolidJS](https://img.shields.io/badge/SolidJS-2c4f7c?style=for-the-badge&logo=solid&logoColor=c8c9cb) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## This project is WIP
Anyway, here are the mockups. I don't really spend a lot of time on styling and UX just until the product is almost MVP.
<img src="https://iili.io/Jj2ncf2.png" width="500">
<img src="https://iili.io/Jj2xLAX.png" width="500">


## Roadmap && TODOs
Following lean startup principles, to achieve a minimum viable product ASAP. Let's call it version 0.1
### API
- [x] basic login system
  - [x] central auth provider
  - [x] google login
- [x] auth endpoint
- [x] add entries
- [x] create tags
- [x] assign tags to entries
- [x] create summaries of a given time frame
- [ ] refactor && self code review

### Frontend
- [x] login page
- [x] basic calendar
  - [ ] multi month support
- [x] add an entry for a given day
- [x] select and assign tags
- [x] create summaries
- [ ] error handling
- [ ] central data provider, with ability to:
  - [ ] fetch data
  - [ ] update data on the frontend
  - [ ] sync with the backend
  - [ ] provide interfaces for implementing skeleton loaders for interface elements 
- [ ] make it pretty, follow the mockup
  - [ ] polish UX (error handling, loaders, animations etc.)  

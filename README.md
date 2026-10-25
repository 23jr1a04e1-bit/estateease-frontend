# EstateEase

A modern, responsive real estate web app for buying, renting, and listing properties across India. Built with React + Vite + JavaScript.

## Features

- **Homepage** with hero, search bar, Buy/Rent/Sell shortcuts, and featured listings
- **Buy** and **Rent** pages with filters (location, city, property type, max price, min area, bedrooms)
- **Property details** page with specs, description, amenities, and price card
- **Sell** page to submit a new listing to your backend
- **Login & Register** UI
- **User dashboard** — saved properties, your listings, profile
- **Admin dashboard** — overview table of all properties (UI preview)
- **Premium** subscription plans (UI preview — no payments)
- **Chatbot** placeholder widget for future AI integration
- Prices in **₹ (Indian rupees)** and area in **m² (square metres)**
- Fully mobile-responsive

## Backend integration

The frontend talks to a Spring Boot backend at `http://localhost:8080`:

- `GET http://localhost:8080/api/properties` — list properties
- `GET http://localhost:8080/api/properties/{id}` — one property
- `POST http://localhost:8080/api/properties` — create a listing (Sell page)
- `POST http://localhost:8080/api/auth/login` and `/api/auth/register` — auth

All backend calls live in `src/services/api.js`. If the backend is unreachable, the app shows clearly labelled **sample properties** so the UI still works.

To point the app at a different backend, change `BACKEND_URL` in `src/services/api.js`.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Important notes

- This is the **frontend only**. It does not create or run a backend.
- Login, admin permissions, payments, and subscriptions are **UI previews** — they are not secure or functional until implemented and tested on the backend.
- Auth uses a local session flag for demo purposes only.

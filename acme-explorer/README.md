🌍 Acme Explorer - Frontend

This project is a web application developed using Angular as part of the Master MIS-CLOUD Front-End Technologies course.

The application allows users to explore trips using a dynamic backend (JSON Server) and includes a basic authentication system.

🚀 Features

🔐 Authentication system (login/logout)

🛡️ Route protection using Auth Guard

🧠 Reactive state management using Angular Signals

🌐 REST API consumption using JSON Server

🗺️ Dynamic trip listing from backend

🎯 Filter trips by difficulty (easy, medium, hard)

🎨 Modern and responsive UI (cards, badges, hover effects)

🔄 Navigation using Angular Router

👤 Test Credentials

To access the application, use:

Email: test@acme.com

Password: 1234

🧭 Application Flow

The application starts on the login page.

The user enters valid credentials.

After login, the user is redirected to the home page.

From there, the user can navigate to:

🏠 Home

🧳 Trips

The trips page:

Fetches data from JSON Server

Displays trips in a card layout

Allows filtering by difficulty

Allows cancelling trips (UI state)

The user can logout at any time from the header.

If not authenticated:

Access to /trips is blocked

User is redirected to /login

🔒 Route Protection

The route /trips is protected using an Auth Guard

Only authenticated users can access it

Unauthorized users are redirected to /login

🌐 Backend (JSON Server)

This project uses JSON Server as a mock backend.

▶️ Run JSON Server
npx json-server --watch db.json --port 3000

API endpoint:

http://localhost:3000/trips
🧩 Project Structure
src/app/
│
├── core/
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── trip.service.ts
│   └── guards/
│       └── auth.guard.ts
│
├── features/
│   ├── auth/
│   ├── home/
│   └── trips/
│       └── trip-display/
│
├── shared/
│   ├── header/
│   └── footer/
│
└── app.routes.ts
🛠️ Technologies Used

Angular (Standalone Components)

TypeScript

Angular Signals

Angular Router

JSON Server (mock backend)

HTML / SCSS

▶️ How to Run the Project
1. Install dependencies
npm install
2. Run JSON Server (IMPORTANT)
npx json-server --watch db.json --port 3000
3. Run Angular app
npm start
4. Open in browser
http://localhost:4200
⚠️ Notes

Authentication is simulated (mock) (no Firebase integration)

Credentials are hardcoded for demonstration purposes

JSON Server is used as a fake backend API

Trips are dynamically loaded from /trips

📦 Delivery Note

The node_modules folder has been removed to reduce project size

To run the project, install dependencies using npm install

🏁 Final Result

This project demonstrates:

Frontend architecture using Angular

Authentication and route protection

API integration with a mock backend

Clean UI and user experience
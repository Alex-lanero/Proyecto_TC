🌍 Acme Explorer - Frontend

This project is a web application developed using Angular as part of the Master MIS-CLOUD Front-End Technologies course.

The application allows users to explore trips using a dynamic backend (JSON Server) and includes authentication, role-based behavior, and UI enhancements.

🚀 Features
🔐 Authentication & Security
Login / Logout system
Route protection using Auth Guard
Role-based behavior (user / admin)
🧠 State & Architecture
Reactive state management using Angular Signals
Component-based architecture (parent + child components)
Clean separation: core / features / shared
🌐 Backend Integration
REST API consumption using JSON Server
Dynamic data loading from backend
Create new trips (admin only)
🧳 Trips Functionality
Dynamic trip listing from backend
Filter trips by difficulty (easy, medium, hard)
Cancel trips (UI state)
Role-based filtering:
Users see user trips + admin trips
Admin sees all trips
🧩 Components
TripDisplayComponent (parent)
TripCardComponent (child)
Displays trip summary
Expandable card → shows additional information on click
🎨 UI / UX Enhancements
Responsive card layout
Hover effects and animations
Expandable cards (details on click)
Styled difficulty badges (easy / medium / hard)
Improved form UI for trip creation
🌍 Internationalization (i18n)
Custom Translate Pipe
Language switcher (ES / EN)
Real-time UI updates without reload
Language persistence using localStorage
🔧 Pipes
Built-in pipe:
date pipe used in footer
Custom pipes:
translate pipe (UI translations)
difficulty styling (badges/colors)
👤 Test Credentials

To access the application:

Normal user
Email: test@acme.com
Password: 1234

Admin user
Email: admin@acme.com
Password: 1234

🧭 Application Flow
The application starts on the login page.
The user enters valid credentials.
After login, the user is redirected to the home page.
From there, the user can navigate to:
🏠 Home
🧳 Trips
Trips Page
Fetches data from JSON Server
Displays trips using reusable card component
Allows:
Filtering by difficulty
Cancelling trips
Expanding cards to view more details
Admin Features

If the logged user is admin:

Can create new trips via form
Can choose visibility:
user trip
admin trip
Access Control

If the user is not authenticated:

Access to /trips is blocked
Redirected to /login
🔒 Route Protection
/trips is protected using an Auth Guard
Only authenticated users can access it
🌐 Backend (JSON Server)

This project uses JSON Server as a mock backend.

▶️ Run JSON Server
npx json-server --watch db.json --port 3000
API endpoint
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
│       ├── trip-display/
│       └── trip-card/   ← child component
│
├── shared/
│   ├── header/
│   ├── footer/
│   └── pipes/
│       ├── translate.pipe.ts
│       └── difficulty.pipe.ts
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
Authentication is simulated (no Firebase)
Credentials are hardcoded
JSON Server acts as a mock backend
Trips are dynamically loaded from /trips
Language selection is stored in localStorage
📦 Delivery Note

Before submitting:

Remove:

node_modules/
.angular/
dist/

Install dependencies using:

npm install
🏁 Final Result

This project demonstrates:

Angular architecture with standalone components
Authentication and route protection
Backend integration using JSON Server
Reusable components (parent/child)
Custom pipes and built-in pipes
Internationalization (ES/EN)
Interactive and modern UI
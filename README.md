TMS Client — Training Management System

Angular frontend for the CoTBE Training Management System (TMS). The application provides the user-facing interface for authentication, course management, enrollment management, and the instructor Command Center.

## 📸 Screenshots

### Login
![Login](docs/screenshots/login.png)

### Register
![Register](docs/screenshots/register.png)

### Student Dashboard
![Student Dashboard](docs/screenshots/student-dashboard.png)

### Course Catalog
![Course Catalog](docs/screenshots/course-list.png)

### Course Enrollment
![Enrollment Form](docs/screenshots/enrollment-form.png)

### Instructor Command Center
![Instructor Dashboard](docs/screenshots/instructor-dashboard.png)

### Enrollment Records
![Enrollment List](docs/screenshots/enrollment-list.png)

### Grade Submission
![Grade Submission](docs/screenshots/grade-submission.png)
🛠️ Tech Stack
Concern	Technology
Framework	Angular
Language	TypeScript
UI	HTML / CSS
Routing	Angular Router
HTTP	Angular HttpClient
Testing	Jasmine / Karma
E2E Testing	Playwright
API	ASP.NET Core 10 REST API
📁 Project Structure
Tms-client/
├── src/
│   │   index.html
│   │   main.ts
│   │   proxy.conf.json
│   │   styles.scss
│   │
│   ├── app/
│   │   │   app.component.ts
│   │   │   app.config.ts
│   │   │   app.html
│   │   │   app.routes.ts
│   │   │   app.scss
│   │   │   app.spec.ts
│   │   │   app.ts
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │       login.component.html
│   │   │   │   │       login.component.scss
│   │   │   │   │       login.component.ts
│   │   │   │   └── register/
│   │   │   │           register.component.html
│   │   │   │           register.component.scss
│   │   │   │           register.component.ts
│   │   │   ├── course-detail/
│   │   │   │       course-detail.component.html
│   │   │   │       course-detail.component.scss
│   │   │   │       course-detail.component.ts
│   │   │   ├── course-list/
│   │   │   │       course-list.component.html
│   │   │   │       course-list.component.scss
│   │   │   │       course-list.component.ts
│   │   │   ├── enrollment-form/
│   │   │   │       enrollment-form.component.html
│   │   │   │       enrollment-form.component.scss
│   │   │   │       enrollment-form.component.ts
│   │   │   ├── enrollment-list/
│   │   │   │       enrollment-list.component.html
│   │   │   │       enrollment-list.component.scss
│   │   │   │       enrollment-list.component.ts
│   │   │   ├── grade-submission/
│   │   │   │       grade-submission.component.html
│   │   │   │       grade-submission.component.scss
│   │   │   │       grade-submission.component.spec.ts
│   │   │   │       grade-submission.component.ts
│   │   │   ├── instructor-dashboard/
│   │   │   │       instructor-dashboard.component.html
│   │   │   │       instructor-dashboard.component.scss
│   │   │   │       instructor-dashboard.component.ts
│   │   │   ├── student-dashboard/
│   │   │   │       student-dashboard.component.html
│   │   │   │       student-dashboard.component.scss
│   │   │   │       student-dashboard.component.ts
│   │   │   └── unauthorized/
│   │   │           unauthorized.component.html
│   │   │           unauthorized.component.scss
│   │   │           unauthorized.component.ts
│   │   │
│   │   ├── guards/
│   │   │       role.guard.ts
│   │   │
│   │   ├── interceptors/
│   │   │       credentials.interceptor.ts
│   │   │       error.interceptor.ts
│   │   │       jwt.interceptor.ts
│   │   │
│   │   ├── models/
│   │   │       course.model.ts
│   │   │       enrollment.model.ts
│   │   │
│   │   ├── services/
│   │   │       auth.service.ts
│   │   │       course.service.ts
│   │   │       enrollment.service.spec.ts
│   │   │       enrollment.service.ts
│   │   │       grade.service.spec.ts
│   │   │       grade.service.ts
│   │   │       live-sync.ts
│   │   │
│   │   ├── store/
│   │   │       course.store.ts
│   │   │       enrollment.store.ts
│   │   │
│   │   └── ui/
│   │       ├── analytics-chart/
│   │       │       analytics-chart.component.html
│   │       │       analytics-chart.component.scss
│   │       │       analytics-chart.component.ts
│   │       └── course-card/
│   │               course-card.component.html
│   │               course-card.component.scss
│   │               course-card.component.spec.ts
│   │               course-card.component.ts
│   │
│   └── environments/
│           environment.development.ts
│           environment.ts
│
├── tests/
├── playwright/
│   └── .auth/
├── playwright-report/
├── public/
├── playwright.config.ts
├── angular.json
├── package.json
└── README.md

✨ Features
Authentication
Login page with username/email and password
Authentication guard for protected routes
Admin authentication for E2E tests
Reusable Playwright authentication state
Courses
Course card component
Course title and course information display
Enrollment action
Instructor Command Center integration
Enrollments
Retrieve enrollments from the API
Approve student enrollments
HTTP request/response testing
Routing
/login — Login page
/command-center — Protected instructor dashboard
Unknown routes redirect to /login
🔐 Authentication

Protected routes use the application's authentication guard.

The main protected route is:

/command-center


Playwright authentication can be configured using environment variables:

TMS_ADMIN_EMAIL
TMS_ADMIN_USER
TMS_ADMIN_PASS


Example PowerShell configuration:

$env:TMS_ADMIN_EMAIL="admin@example.com"
$env:TMS_ADMIN_PASS="your-password"


Do not commit real credentials to the repository.

🚀 Getting Started
Prerequisites
Node.js
npm
Angular CLI
Running TMS API

Check Node and npm:

node --version
npm --version

1. Install dependencies
npm install

2. Start the development server
npm start


The application will normally be available at:

http://localhost:4200

🧪 Testing
Unit and Integration Tests

Run the Angular test suite:

npm test


The project includes tests for:

App component
Course card component
Enrollment service
HTTP requests and responses
Enrollment approval
Playwright E2E Tests

Run all end-to-end tests:

npx playwright test


Run tests with the browser visible:

npx playwright test --headed


Run a specific test:

npx playwright test tests/example.spec.ts


View the Playwright HTML report:

npx playwright show-report

🎭 Playwright Authentication

Playwright uses a reusable authenticated browser state for admin tests.

The authentication setup:

Navigates to /login
Fills the username/email
Fills the password
Clicks Sign In
Verifies the Command Center heading
Saves the authenticated browser state

The state is stored at:

playwright/.auth/admin.json


The authentication state should not be committed to Git.

Add the following to .gitignore if necessary:

playwright/.auth/

📡 API Integration

The Angular application communicates with the TMS ASP.NET Core API.

Example enrollment endpoint:

GET /api/enrollments


Approve enrollment:

POST /api/enrollments/{id}/approve


The frontend uses Angular's HttpClient for API communication.

🧩 Development

Start the frontend:

npm start


Start the backend API separately:

dotnet run --project TmsApi.Api/TmsApi.Api.csproj


Make sure the API is running before testing features that require backend communication.

📋 Test Coverage

The project currently includes coverage for:

Course title rendering
Course enrollment button events
Enrollment retrieval
Enrollment approval
HTTP request methods and URLs
Application routing
Authentication flow
Protected Command Center access
Browser-based E2E scenarios
🏗️ Project Goals

This project is part of the CoTBE Software Engineering Programme and demonstrates modern frontend development practices including:

Component-based Angular development
Service-based API integration
Route guards
Unit and integration testing
Semantic accessibility-based Playwright locators
Reusable authentication state
End-to-end browser testing
Clean Git commit practices
📄 License

School project — CoTBE Software Engineering Programme 2026.
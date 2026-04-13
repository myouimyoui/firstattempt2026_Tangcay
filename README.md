## Tangcay

#### Framework: Svelte JS

#### Module: Document Request

#### Installation

Prerequisites
Make sure the following are installed on your machine:

- [Node 18.13.0 or higher](https://nodejs.org/en) — required to run Svelte
- [Git](https://git-scm.com/) — required to clone the repository

To replicate and run this project follow the following steps using Windows Powershell:

```bash
winget install OpenJS.NodeJS.LTS
nvm install lts
nvm use lts
git clone https://github.com/myouimyoui/document-request-page.git
cd document-request-page
npm install
npm run dev -- --open
```

### AI Tools:

1. Chat GPT - used to create the prompt for the webpage
2. Gemini (Pro) - Webpage creation and refining the css

### Prompt:

GPT prompt:
Create a prompt that is using Svelte.js to create a website. follow the flow and don't add anything or unnecessary things other what's inside the file attachments

File Attachments: unversity portal document request system pdf file

Gemini prompt:
Create a Svelte.js website UI high-fidelity prototype for an University Portal Document Request system that follows this flow: Alumni Login Page where an alumnus logs in using their university account to track appointments and requests, supporting organized scheduling and reduced waiting time; Alumni Dashboard displaying all pending, approved, and ready document requests with tracking capability; Alumni Profile showing account information; Document Request Selection Page displaying available document requests; Appointment Selection Page showing all requestable documents with their prices for complete information; Request Review Page summarizing the request including document, date, time, and price for confirmation; Order Tracker allowing real-time tracking of request status (processed, approved, ready for release); Transaction History displaying payment records with accurate dates, amounts, full details, and access to digital and printable receipts; Staff Login Page allowing staff to log in using university email to track requests; Staff Dashboard showing all pending, approved, and ready requests upon login; Staff Profile allowing viewing and updating of account information; and Status Filter Page enabling staff to filter document requests by status for easier approval and organized workflow. Use Tailwind CSS Styling, Use color #1E3A8A and #FFFFFF for the font use EB Garamond 

File attachments: image AdDU logo

#### Screenshots

## Alumni Screens
### Login Screen
![Login Page](assets/images/login-page.png)
### Alumni Dashboard
![Alumni Dashboard](assets/images/alumni-dashboard.png)
### Alumni Request Document
![Alumni Request Document](assets/images/alumni-request-document.png)
![Alumni Review Request](assets/images/alumni-review-request.png)
### Alumni Tracker
![Alumni Tracker](assets/images/alumni-tracker.png)
### Alumni History
![Alumni History](assets/images/alumni-history.png)
### Alumni Profile
![Alumni Profile](assets/images/alumni-profile.png)

## Staff Screens
### Login Screen
![Login Page](assets/images/login-staff.png)
### Staff Dashboard
![Staff Dashboard](assets/images/staff-dashboard.png)
### Manage Request
![Manage Request](assets/images/manage-request.png)
![Manage Request Pending](assets/images/manage-request-pending.png)
![Manage Request Approved](assets/images/manage-request-approved.png)
![Manage Request Ready](assets/images/manage-request-ready.png)
### Staff Profile
![Staff Profile](assets/images/staff-profile.png)
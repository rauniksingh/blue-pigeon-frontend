# Blue Pigeon — Search & Discoverability UI

Frontend application for the Blue Pigeon voice-first messaging platform.
Built with React and Tailwind CSS. Provides a Slack-like interface for
searching across messages, channels, topics, and users.

---

## Live URLs

| Service     | URL                            |
|-------------|--------------------------------|
| Frontend UI | http://34.227.72.164:3001      |
| Backend API | http://34.227.72.164:7001/api  |

---

## Test Credentials

| Email                  | Password    | Access                                             |
|------------------------|-------------|----------------------------------------------------|
| alice@bluepigeon.io    | password123 | All channels including private #payments and #devops |
| bob@bluepigeon.io      | password123 | #engineering, #payments, #devops                   |
| carol@bluepigeon.io    | password123 | #engineering, #general, #design only               |
| dave@bluepigeon.io     | password123 | #general, #design only                             |
| eve@bluepigeon.io      | password123 | #engineering, #general only                        |

> **Permission filtering test:** Login as `carol` and search "payment"
> — she has no access to the private #payments channel so payment
> messages and topics will not appear in her results.

---

## Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Framework | React 18 + TypeScript   |
| Styling   | Tailwind CSS v3         |
| Routing   | React Router v6         |
| HTTP      | Axios                   |
| Build     | Create React App        |
| Container | Docker + Nginx          |
| CI/CD     | GitHub Actions          |

---

## Project Structure

```
src/
├── api/                Axios client with auth interceptors
├── components/
│   ├── layout/         Navbar, Sidebar
│   ├── search/         SearchBar, SearchResults, result cards, modal
│   └── common/         Spinner, EmptyState
├── context/            AuthContext — global auth state
├── hooks/              useSearch, useChannel, useTopic
├── pages/              LoginPage, RegisterPage, MainPage, ChannelPage, TopicPage
└── types/              TypeScript interfaces
```

---

## Features

### Search
- Unified search bar in the navbar
- Debounced input — fires after 400ms of no typing
- Grouped results — Messages, Channels, Topics, Users
- Result count badges per entity
- Loading and empty states

### Messages
- Click a message result to open a detail modal
- Modal shows full transcript, sender, channel, topic, timestamp
- Navigate to topic from modal — scrolls to and highlights the target message

### Channels
- Slack-like sidebar showing all accessible channels
- Private channels shown with a lock icon
- Click a channel to view its topics

### Topics
- Click a topic to view all messages inside it
- Breadcrumb navigation back to the parent channel

### Auth
- JWT-based login and register
- Token stored in localStorage
- Auto redirect to login on 401

---

## Run Locally

### Prerequisites

- Node.js 18+
- Backend API running (see backend README)

### Steps

**1. Clone the repository**

```bash
git clone https://github.com/rauniksingh/blue-pigeon-ui.git
cd blue-pigeon-ui
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment**

Create a `.env` file at the root:

```env
REACT_APP_API_URL=http://localhost:7001/api
```

> To use the live backend instead of running locally:
> ```env
> REACT_APP_API_URL=http://34.227.72.164:7001/api
> ```

**4. Start the app**

```bash
npm start
```

App runs at `http://localhost:3000`

---

## Run with Docker

```bash
docker build \
  --build-arg REACT_APP_API_URL=http://localhost:7001/api \
  -t bluepigeon-frontend .

docker run -p 3001:80 bluepigeon-frontend
```

App runs at `http://localhost:3001`

---

## Deployment

The app is deployed on AWS EC2 using Docker and GitHub Actions.

Push to `main` branch triggers:
1. Docker image build with `REACT_APP_API_URL` injected at build time
2. Push to Docker Hub
3. SSH deploy to EC2
4. Container restart with latest image

---
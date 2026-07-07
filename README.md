ICEGLOBAL — A Decade of Immersive Expo Experiences

ICEGLOBAL is a photo/media gallery web app showcasing over 1,000 curated moments from a decade of expo experiences — where brands connect, innovate, and inspire.

🔗 Live Site: https://iceglobal.in


✨ Features


Gallery browsing with filters by year, category, and tag, plus keyword search and pagination
GET /gallery?year=YYYY&category=...&tag=...&search=...&page=1&pageSize=24
VIP / tagged content views for curated highlight collections
Responsive, animated UI built with Tailwind CSS, shadcn/ui, and Framer Motion
Fast client-side routing via React Router
Data fetching & caching with TanStack React Query
Form handling & validation with React Hook Form + Zod



🛠️ Tech Stack

Frontend


React 18 + TypeScript
Vite (build tool, via @vitejs/plugin-react-swc)
Tailwind CSS + tailwindcss-animate
shadcn/ui (built on Radix UI primitives)
React Router DOM — routing
TanStack React Query — data fetching/caching
React Hook Form + Zod — forms & validation
Framer Motion — animations
Recharts, Embla Carousel, Lucide Icons, Sonner (toasts)


Backend / Infra


backend/ — API server (see BACKEND_PLAN.md for details)
nginx/ — reverse proxy / production server config
Deployed on a self-managed server behind Nginx, serving the static dist/ build



📂 Project Structure

iceglobal/
├── backend/           # API server
├── docs/              # Project documentation
├── nginx/             # Nginx server configuration
├── public/            # Static assets
├── src/                # React application source
├── .env.example        # Sample environment variables
├── BACKEND_PLAN.md      # Backend architecture/planning notes
├── NEW_HOME_SECTIONS.md # Notes on homepage sections
├── RULES.md             # Project conventions/rules
├── SECTION_WORKFLOW.md  # Workflow notes for building sections
├── docker_setup.md      # Docker setup notes
├── tailwind.config.ts
├── vite.config.ts
└── package.json


🚀 Getting Started

Prerequisites


Node.js (v18+ recommended)
npm / bun (repo includes a bun.lockb, npm also works)


Installation

bashgit clone https://github.com/Rahul-mahato963/iceglobal.git
cd iceglobal
npm install

Environment Variables

Copy the example env file and fill in your own values:

bashcp .env.example .env

Run Locally

bashnpm run dev

This starts the Vite dev server (default: http://localhost:5173).

Build for Production

bashnpm run build

The production-ready static files will be output to dist/.

Preview Production Build

bashnpm run preview


🌐 Deployment


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ccb396d8-3b13-4e82-9818-2b23eb658149" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b44c0144-668b-43d9-8a4f-dbecd7877f35" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/42709b9d-030c-4d8c-8bdc-de8d73c69559" />


The production build is served via Nginx from a static dist/ directory:

bashsudo rsync -a --delete /root/app/dist/ /var/www/iceglobal.in/dist/
sudo chown -R www-data:www-data /var/www/iceglobal.in
sudo nginx -t
sudo systemctl reload nginx

See docker_setup.md and the nginx/ folder for full deployment configuration.


🤝 Contributing


Fork the repo
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

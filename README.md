SupaChat – Conversational Analytics App with Full DevOps Lifecycle

SupaChat is a full-stack conversational analytics application that allows users to query a PostgreSQL blog analytics database using natural language.
The project demonstrates a production-style DevOps lifecycle including containerization, reverse proxy configuration, CI/CD automation, and full monitoring & logging stack.

Live Architecture Overview

User → Nginx → Frontend (Next.js) → Backend (FastAPI) → Supabase PostgreSQL
Monitoring stack collects metrics and logs from all services.

Components:

Frontend: Next.js chat interface
Backend: FastAPI API with query translator
Database: Supabase PostgreSQL
Reverse Proxy: Nginx
Containerization: Docker & Docker Compose
CI/CD: GitHub Actions
Monitoring: Prometheus + Grafana
Logging: Loki + Promtail
Metrics: cAdvisor + Node Exporter
Deployment: AWS EC2
Features
Application Features
Chat-based analytics interface
Natural language → SQL translation
Data visualization using charts
Table results display
Query history
Error handling and loading states
REST API with documentation

Example queries:

Show top trending topics in last 30 days
Compare article engagement by topic
Plot daily views trend for AI articles
Tech Stack
Frontend
Next.js
React
Recharts
Backend
FastAPI
SQLAlchemy
Supabase PostgreSQL
Pydantic
DevOps & Infrastructure
Docker
Docker Compose
AWS EC2
Nginx
CI/CD
GitHub Actions
Docker Hub
Monitoring & Logging
Prometheus
Grafana
Loki
Promtail
cAdvisor
Node Exporter
Project Structure
supachat/
│
├── backend/
│   ├── app/
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── Dockerfile
│   └── nextjs app
│
├── nginx/
│   └── default.conf
│
├── monitoring/
│   ├── prometheus/
│   ├── grafana/
│   ├── loki/
│   └── promtail/
│
├── docker-compose.yml
├── README.md
└── .github/workflows/deploy.yml
Architecture Diagram (Logical)
User
 │
 ▼
Nginx Reverse Proxy
 │
 ├── Frontend (Next.js)
 │
 └── Backend (FastAPI)
         │
         ▼
   Supabase PostgreSQL


Monitoring Stack
 │
 ├── Prometheus (metrics)
 ├── Grafana (dashboards)
 ├── Loki (logs)
 ├── Promtail (log collector)
 ├── cAdvisor (container metrics)
 └── Node Exporter (system metrics)
Local Development Setup
Clone repository
git clone https://github.com/akash-Paiavula/supachat.git
cd supachat
Run using Docker Compose
docker compose up --build

Application will run at:

Frontend:

http://35.170.248.25

Backend API docs:

http://35.170.248.25/docs

Health endpoint:

http://35.170.248.25/health

Prometheus:

http://35.170.248.25:9090

Grafana:

http://35.170.248.25:3001

Loki readiness:

http://35.170.248.25:3100/ready
Environment Variables

Backend .env

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
DATABASE_URL=postgresql_connection_string

Frontend environment variable:

NEXT_PUBLIC_API_BASE_URL=http://35.170.248.25/api
Docker Setup

Services included:

frontend container
backend container
nginx reverse proxy
prometheus monitoring
grafana dashboards
loki logging
promtail log collector
cadvisor container metrics
node exporter system metrics

Run:

docker compose up -d

Stop:

docker compose down
Nginx Reverse Proxy

Routing configuration:

/ → frontend
/api → backend
/health → backend health endpoint
/docs → FastAPI docs

Includes:

gzip compression
caching headers
websocket support
CI/CD Pipeline

GitHub Actions workflow automatically:

builds docker images
pushes images to Docker Hub
connects to EC2 via SSH
pulls latest images
restarts containers

Workflow file:

.github/workflows/deploy.yml

Trigger:

git push origin main

Deployment becomes automatic.

Monitoring Stack
Prometheus

Collects metrics from:

FastAPI metrics endpoint
cAdvisor container metrics
node-exporter system metrics

Metrics include:

CPU usage
memory usage
container health
request metrics
Grafana Dashboards

Visualizes:

CPU usage
memory consumption
container performance
API metrics
request latency

Access Grafana:

http://<EC2-IP>:3001

Default login:

username:

admin

password:

admin123
Loki Logging

Centralized log aggregation.

Logs collected from:

backend container
frontend container
nginx
docker services

Query logs in Grafana using Loki datasource.

Example query:

{container="supachat_backend"}
Health Checks

Backend health endpoint:

GET /health

Example response:

{
  "status": "ok",
  "service": "SupaChat API"
}
AI Tools Used

AI-assisted tools were used during development:

ChatGPT for architecture guidance
Copilot for code suggestions
AI debugging assistance for Docker, CI/CD, monitoring setup
Deployment (AWS EC2)

Application deployed on AWS EC2 instance using Docker Compose.

Public access via:

Frontend:

http://<EC2-IP>

Grafana:

http://<EC2-IP>:3001

Prometheus:

http://<EC2-IP>:9090
DevOps Lifecycle Covered

Build:

full-stack application

Dockerize:

multi-container architecture

Deploy:

AWS EC2

Reverse Proxy:

Nginx configuration

CI/CD:

GitHub Actions automated pipeline

Monitoring:

Prometheus metrics
Grafana dashboards
Loki log aggregation
Submission Deliverables
GitHub repository
working deployed application
CI/CD pipeline
monitoring dashboards
demo video
Author

Akash Paiavula

DevOps & Full Stack Developer

Skills demonstrated:

Docker
AWS
CI/CD
Monitoring
FastAPI
Next.js
PostgreSQL
Nginx
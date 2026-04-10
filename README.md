# 📊 SupaChat – Conversational Analytics App with Full DevOps Lifecycle

SupaChat is a full-stack conversational analytics application that allows users to query a PostgreSQL blog analytics database using natural language.

The project demonstrates a **production-style DevOps lifecycle** including containerization, reverse proxy configuration, CI/CD automation, and full monitoring & logging stack.

---

# 🏗️ Architecture Diagram

![Architecture Diagram](Containerized%20web%20app%20architecture%20workflow.png)

---

# 🔎 Live Architecture Overview

User → Nginx → Frontend (Next.js) → Backend (FastAPI) → Supabase PostgreSQL  

Monitoring stack collects metrics and logs from all services.

---

# 🧩 Components

### Application Layer

Frontend  
Next.js chat interface

Backend  
FastAPI API with query translator

Database  
Supabase PostgreSQL

Reverse Proxy  
Nginx

---

### DevOps & Infrastructure

Containerization  
Docker & Docker Compose

CI/CD  
GitHub Actions

Deployment  
AWS EC2

---

### Monitoring & Logging Stack

Prometheus → metrics collection  
Grafana → dashboards visualization  
Loki → centralized logging  
Promtail → log collector  
cAdvisor → container metrics  
Node Exporter → system metrics  

---

# 🚀 Features

### Application Features

- chat-based analytics interface
- natural language → SQL translation
- charts visualization
- table results display
- query history
- loading & error handling
- REST API documentation

---

# 🧪 Example Queries

- Show top trending topics in last 30 days
- Compare article engagement by topic
- Plot daily views trend for AI articles

---

# ⚙️ Tech Stack

## Frontend
- Next.js
- React
- Recharts

## Backend
- FastAPI
- SQLAlchemy
- Pydantic
- Supabase PostgreSQL

## DevOps & Infrastructure
- Docker
- Docker Compose
- AWS EC2
- Nginx

## CI/CD
- GitHub Actions
- Docker Hub

## Monitoring & Logging
- Prometheus
- Grafana
- Loki
- Promtail
- cAdvisor
- Node Exporter

---

# 📂 Project Structure


supachat/
│
├── backend/
│ ├── app/
│ ├── Dockerfile
│ └── requirements.txt
│
├── frontend/
│ ├── Dockerfile
│ └── nextjs app
│
├── nginx/
│ └── default.conf
│
├── monitoring/
│ ├── prometheus/
│ ├── grafana/
│ ├── loki/
│ └── promtail/
│
├── docker-compose.yml
├── README.md
└── .github/workflows/deploy.yml


---

# 🔄 Logical Architecture Flow

User
 ↓
Nginx Reverse Proxy
 ↓
Frontend (Next.js)
 ↓
Backend (FastAPI)
 ↓
Supabase PostgreSQL

---

# 📊 Monitoring Stack Architecture

Prometheus → metrics collection  
Grafana → dashboards  
Loki → logs  
Promtail → log collector  
cAdvisor → container metrics  
Node Exporter → system metrics  

---

# 🛠️ Local Development Setup

Clone repository

```bash
git clone https://github.com/akash-Paiavula/supachat.git
cd supachat

Run using Docker Compose

docker compose up --build
🌐 Application URLs

Frontend
http://35.170.248.25

API Documentation
http://35.170.248.25/docs

Health Endpoint
http://35.170.248.25/health

Prometheus
http://35.170.248.25:9090

Grafana
http://35.170.248.25:3001

Loki
http://35.170.248.25:3100/ready

🔐 Environment Variables

Backend .env

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
DATABASE_URL=postgresql_connection_string

Frontend environment variable

NEXT_PUBLIC_API_BASE_URL=http://35.170.248.25/api
🐳 Docker Setup

Services included

frontend container
backend container
nginx reverse proxy
prometheus monitoring
grafana dashboards
loki logging
promtail log collector
cadvisor container metrics
node exporter system metrics

Run containers

docker compose up -d

Stop containers

docker compose down
🌍 Nginx Reverse Proxy

Routing configuration

/ → frontend
/api → backend
/health → backend health endpoint
/docs → FastAPI documentation

Includes

gzip compression
caching headers
websocket support
🔁 CI/CD Pipeline

GitHub Actions workflow automatically

builds docker images
pushes images to Docker Hub
connects to EC2 via SSH
pulls latest images
restarts containers

Workflow file

.github/workflows/deploy.yml

Trigger deployment

git push origin main

Deployment becomes automatic.

📊 Monitoring Details

Prometheus collects metrics from

FastAPI metrics endpoint
cAdvisor container metrics
node-exporter system metrics

Metrics include

CPU usage
memory usage
container health
request metrics
📈 Grafana Dashboards

Visualizes

CPU usage
memory consumption
container performance
API metrics
request latency

Grafana URL

http://<EC2-IP>:3001

Default login

username: admin
password: admin123

🧾 Loki Logging

Centralized log aggregation

Logs collected from

backend container
frontend container
nginx
docker services

Example query

{container="supachat_backend"}
❤️ Health Check

Backend health endpoint

GET /health

Example response

{
  "status": "ok",
  "service": "SupaChat API"
}
🤖 AI Tools Used

AI-assisted tools were used during development

ChatGPT for architecture guidance
Copilot for code suggestions
AI debugging for Docker, CI/CD, monitoring
☁️ Deployment (AWS EC2)

Application deployed on AWS EC2 using Docker Compose

Public access

Frontend
http://<EC2-IP>

Grafana
http://<EC2-IP>:3001

Prometheus
http://<EC2-IP>:9090

🔄 DevOps Lifecycle Covered

Build
full-stack application

Dockerize
multi-container architecture

Deploy
AWS EC2

Reverse Proxy
Nginx configuration

CI/CD
GitHub Actions automation

Monitoring
Prometheus metrics
Grafana dashboards
Loki logs

📦 Submission Deliverables
GitHub repository
deployed application
CI/CD pipeline
monitoring dashboards
demo video
👨‍💻 Author

Akash Paiavula

DevOps & Full Stack Developer

Skills demonstrated

Docker
AWS
CI/CD
Monitoring
FastAPI
Next.js
PostgreSQL
Nginx
📜 License

Educational and demonstration purpose project.


---

If you'd like, I can also:
- add **GitHub badges**
- create **project description (2 lines)**
- create **demo video explanation script**
- check your repo structure matches README
- generate **diagram for project flow explanation**
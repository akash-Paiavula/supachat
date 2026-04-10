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

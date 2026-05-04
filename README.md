# 🔐 Professional Authentication System

**A production-ready, enterprise-grade authentication service built with modern technologies.**

> Sistem autentikasi profesional dan canggih dengan fitur-fitur lengkap untuk portfolio dan production use.

---

## ✨ Fitur Utama

### 🔑 Core Authentication
- ✅ JWT Authentication (Access + Refresh Tokens)
- ✅ Email & Password Registration
- ✅ Secure Login Flow
- ✅ Password Reset & Recovery
- ✅ Email Verification
- ✅ Session Management dengan Redis

### 🌐 Social Authentication
- ✅ Google OAuth 2.0
- ✅ GitHub OAuth 2.0
- ✅ Microsoft OAuth (Extensible)
- ✅ Account Linking

### 🔒 Advanced Security
- ✅ Multi-Factor Authentication (MFA/2FA)
- ✅ TOTP/Authenticator App Support
- ✅ Backup Codes
- ✅ Role-Based Access Control (RBAC)
- ✅ Permission Management
- ✅ Rate Limiting & Brute Force Protection
- ✅ Audit Logging
- ✅ Session Tracking
- ✅ Login Attempt Monitoring

### 📊 Admin Features
- ✅ User Management Dashboard
- ✅ Role & Permission Management
- ✅ Audit Log Viewer
- ✅ Security Analytics
- ✅ User Activity Monitoring

### 📈 Production Ready
- ✅ Docker & Docker Compose
- ✅ CI/CD Pipeline (GitHub Actions)
- ✅ Monitoring & Metrics (Prometheus/Grafana)
- ✅ Comprehensive Logging (Winston)
- ✅ Health Check Endpoints
- ✅ API Documentation (Swagger/OpenAPI)

---

## 🛠️ Technology Stack

### Backend
```
Node.js 20+ | TypeScript | NestJS
PostgreSQL | Redis | Docker
```

### Frontend
```
React 18+ | Next.js 14+ | TypeScript
TailwindCSS | Zustand | React Hook Form
```

### DevOps
```
Docker | Docker Compose
Prometheus | Grafana | GitHub Actions
```

---

## 📦 Dependencies Overview

### Core (Backend)
| Package                   | Version | Purpose               |
|---------------------------|---------|-----------------------|
| `@nestjs/core`            | ^10.x   | NestJS framework      |
| `@nestjs/jwt`             | ^11.x   | JWT token generation  |
| `@nestjs/passport`        | ^10.x   | Passport integration  |
| `typeorm`                 | ^0.3.x  | ORM for database      |
| `pg`                      | ^8.x    | PostgreSQL driver     |
| `redis`                   | ^4.x    | Redis client          |
| `bcryptjs`                | ^2.4.x  | Password hashing      |
| `passport-jwt`            | ^4.x    | JWT strategy          |
| `passport-google-oauth20` | ^2.x    | Google OAuth          |
| `passport-github2`        | ^0.1.x  | GitHub OAuth          |
| `nodemailer`              | ^6.x    | Email sending         |
| `speakeasy`               | ^2.x    | TOTP generation       |
| `helmet`                  | ^7.x    | Security headers      |

### Frontend (Next.js)
| Package                 | Version | Purpose |
|-------------------------|---------|-------------------|
| `next`                  | ^14.x   | React framework   |
| `react-hook-form`       | ^7.x    | Form management   |
| `zustand`               | ^4.x    | State management  |
| `@tanstack/react-query` | ^5.x    | Data fetching     |
| `axios`                 | ^1.x    | HTTP client       |
| `jose`                  | ^5.x    | JWT handling      |
| `tailwindcss`           | ^3.x    | CSS framework     |

Lihat [PLANNING.md](PLANNING.md) untuk daftar lengkap dependencies.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v20+
- Docker & Docker Compose
- Git

### Installation (Docker - Recommended)

```bash
# 1. Clone repository
cd /mnt/i/Portofolio/auth

# 2. Copy environment
cp .env.example .env.backend

# 3. Start services
docker-compose up -d

# 4. Access services
# Backend: http://localhost:3000
# Frontend: http://localhost:3001
# PgAdmin: http://localhost:5050
# Grafana: http://localhost:3002
```

### Manual Setup

```bash
# Backend
cd backend
npm install
npm run typeorm:migration:run
npm run start:dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
auth/
├── backend/              # NestJS Backend Service
│   ├── src/
│   │   ├── auth/        # Authentication module
│   │   ├── users/       # User management
│   │   ├── roles/       # Role management
│   │   ├── oauth/       # OAuth integrations
│   │   ├── mfa/         # Multi-factor auth
│   │   ├── audit/       # Audit logging
│   │   └── common/      # Shared utilities
│   └── test/            # Tests
├── frontend/             # Next.js Frontend
│   ├── src/
│   │   ├── app/         # Next.js pages
│   │   ├── components/  # React components
│   │   └── services/    # API services
│   └── test/            # Tests
├── scripts/             # Database & seed scripts
├── monitoring/          # Prometheus config
├── docker-compose.yml   # Docker services
├── PLANNING.md         # Detailed planning
└── QUICKSTART.md       # Setup guide
```

---

## 🔐 Security Features

### Authentication Methods
- **JWT**: Stateless token-based auth
- **Session**: Server-side session management (Redis)
- **OAuth**: Social login integration
- **2FA**: TOTP-based multi-factor authentication

### Security Measures
- ✅ Password hashing (bcryptjs, 12 salt rounds)
- ✅ HTTPS ready with helmet.js
- ✅ CORS configured
- ✅ Rate limiting on sensitive endpoints
- ✅ SQL injection prevention (TypeORM)
- ✅ CSRF protection
- ✅ Audit logging for all actions
- ✅ Session invalidation on logout
- ✅ Token blacklisting
- ✅ Secure HTTP headers

### Environment Variables
All sensitive data via `.env` file:
```
JWT_SECRET
DATABASE_PASSWORD
MAIL_PASSWORD
OAUTH_SECRETS
etc.
```

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov

# Coverage target: 80%+
```

---

## 📊 API Documentation

### Available at Runtime
```
Swagger UI: http://localhost:3000/api/docs
OpenAPI JSON: http://localhost:3000/api/docs-json
```

### Main Endpoints

**Authentication**
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
```

**OAuth**
```
GET    /api/v1/auth/oauth/google
GET    /api/v1/auth/oauth/github
GET    /api/v1/auth/oauth/callback/:provider
```

**MFA**
```
POST   /api/v1/auth/mfa/setup
POST   /api/v1/auth/mfa/verify
POST   /api/v1/auth/mfa/disable
```

**Users**
```
GET    /api/v1/users/profile
PUT    /api/v1/users/profile
GET    /api/v1/users/sessions
```

Lihat [PLANNING.md](PLANNING.md#7-api-endpoints) untuk API lengkap.

---

## 🐳 Docker Services

| Service | Port | Purpose |
|---------|------|---------|
| Backend | 3000 | NestJS API |
| Frontend | 3001 | Next.js App |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache/Sessions |
| PgAdmin | 5050 | DB Management |
| Prometheus | 9090 | Metrics |
| Grafana | 3002 | Dashboards |

**Commands:**
```bash
docker-compose up -d              # Start all
docker-compose down               # Stop all
docker-compose logs -f backend    # Backend logs
docker-compose ps                 # Status
```

---

## 📈 Monitoring & Metrics

### Prometheus
Access: http://localhost:9090

Metrics tracked:
- Request count
- Response time
- Error rates
- Database queries
- Active sessions
- Cache hits/misses

### Grafana
Access: http://localhost:3002 (admin/admin)

Pre-configured dashboards:
- API Performance
- Database Health
- Redis Stats
- Error Tracking

---

## 🚀 Deployment

### Production Build
```bash
# Backend
npm run build
npm run start:prod

# Frontend
npm run build
npm start
```

### Docker Deployment
```bash
docker-compose -f docker-compose.yml \
               -f docker-compose.prod.yml \
               up -d
```

### CI/CD Pipeline
GitHub Actions configured for:
- ✅ Automated testing
- ✅ Code quality checks
- ✅ Docker build & push
- ✅ Deployment automation

---

## 📚 Documentation

- **[PLANNING.md](PLANNING.md)** - Detailed technical planning
  - Stack details
  - Database schema
  - Security implementation
  - All features explained
  - Timeline & milestones

- **[QUICKSTART.md](QUICKSTART.md)** - Setup & run guide
  - Step-by-step installation
  - Docker commands
  - Project structure
  - Troubleshooting

- **API Docs** - Available at `/api/docs`
  - Swagger UI
  - Interactive testing
  - Request/response examples

---

## 🛠️ Development Commands

### Backend
```bash
npm run start:dev        # Development mode
npm run build            # Build for production
npm run test             # Run tests
npm run lint             # Lint code
npm run format           # Format code
npm run typeorm:migration:create   # Create migration
npm run typeorm:migration:run      # Run migrations
npm run db:seed         # Seed database
npm run db:reset        # Reset database
```

### Frontend
```bash
npm run dev              # Development mode
npm run build            # Build for production
npm start                # Start production
npm run test             # Run tests
npm run lint             # Lint code
```

---

## 📋 Feature Checklist

- [ ] Backend setup with NestJS
- [ ] Database design & migrations
- [ ] JWT authentication
- [ ] User registration & login
- [ ] Password reset flow
- [ ] Email verification
- [ ] OAuth integrations (Google, GitHub)
- [ ] MFA/2FA setup
- [ ] Role & permission management
- [ ] Audit logging
- [ ] Frontend dashboard
- [ ] Admin panel
- [ ] Testing (unit + E2E)
- [ ] API documentation
- [ ] Docker setup
- [ ] CI/CD pipeline
- [ ] Monitoring setup
- [ ] Performance optimization
- [ ] Security audit
- [ ] Production deployment

---

## 🆘 Troubleshooting

### Port Conflicts
```bash
# Change ports in docker-compose.yml
# or kill process on port
lsof -i :3000
kill -9 <PID>
```

### Database Issues
```bash
# Reset database
npm run db:reset

# View logs
docker-compose logs postgres
```

### Redis Issues
```bash
docker-compose restart redis
docker-compose logs redis
```

---

## 📖 Best Practices Implemented

✅ Clean code architecture
✅ Separation of concerns
✅ Type-safe with TypeScript
✅ Environment-based configuration
✅ Comprehensive error handling
✅ Input validation
✅ Security best practices
✅ Performance optimization
✅ Scalable database design
✅ Containerization ready
✅ Monitoring & logging
✅ Test coverage
✅ Documentation
✅ CI/CD ready

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Create Pull Request

---

## 📄 License

MIT License - feel free to use this project for your portfolio

---

## 👨‍💻 Author

**Your Name**
- Portfolio: [your-portfolio.com](https://your-portfolio.com)
- GitHub: [@yourname](https://github.com/yourname)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourname)

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check [QUICKSTART.md](QUICKSTART.md) for troubleshooting
- Review [PLANNING.md](PLANNING.md) for detailed documentation

---

## 🎯 Next Steps

1. **Read** [PLANNING.md](PLANNING.md) for architecture details
2. **Follow** [QUICKSTART.md](QUICKSTART.md) for setup
3. **Run** `docker-compose up -d` to start development
4. **Access** http://localhost:3000 for backend
5. **Build** amazing features! 🚀

---

**Made with ❤️ for professional portfolios**

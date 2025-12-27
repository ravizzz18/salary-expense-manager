# Production Deployment Guide

## 🚀 Deployment Options

This application can be deployed using multiple methods. Choose the one that best fits your needs.

---

## Option 1: Vercel (Recommended for Quick Deploy)

### Backend Deployment

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Backend:**
   ```bash
   cd backend
   vercel
   ```

3. **Configure Environment Variables in Vercel Dashboard:**
   - Go to your project settings
   - Add these environment variables:
     - `NODE_ENV` = `production`
     - `MONGODB_URI` = Your MongoDB Atlas connection string
     - `JWT_SECRET` = Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
     - `JWT_EXPIRE` = `7d`
     - `ALLOWED_ORIGINS` = Your frontend URL (e.g., `https://yourapp.vercel.app`)

### Frontend Deployment

1. **Update `.env` in frontend:**
   ```env
   VITE_API_URL=https://your-backend.vercel.app/api
   ```

2. **Deploy Frontend:**
   ```bash
   cd frontend
   vercel
   ```

---

## Option 2: Docker Deployment

### Prerequisites
- Docker and Docker Compose installed

### Steps

1. **Generate JWT Secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **Create `.env` file in root:**
   ```env
   JWT_SECRET=your_generated_secret_here
   ```

3. **Update MongoDB credentials in `docker-compose.yml`:**
   - Change `MONGO_INITDB_ROOT_PASSWORD`
   - Update `MONGODB_URI` with same password

4. **Build and run:**
   ```bash
   docker-compose up -d --build
   ```

5. **Access application:**
   - Frontend: http://localhost
   - Backend: http://localhost:5000
   - MongoDB: localhost:27017

6. **View logs:**
   ```bash
   docker-compose logs -f
   ```

7. **Stop services:**
   ```bash
   docker-compose down
   ```

---

## Option 3: Traditional VPS/Cloud Server

### Prerequisites
- Ubuntu/Debian server
- Node.js 16+ installed
- MongoDB installed or MongoDB Atlas account
- Nginx installed
- Domain name (optional)

### Backend Setup

1. **Clone repository on server:**
   ```bash
   git clone <your-repo>
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm ci --only=production
   ```

3. **Create `.env` file:**
   ```bash
   nano .env
   ```
   Add:
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRE=7d
   ALLOWED_ORIGINS=https://yourdomain.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Install PM2 (Process Manager):**
   ```bash
   npm install -g pm2
   ```

5. **Start backend:**
   ```bash
   pm2 start server.js --name salary-backend
   pm2 save
   pm2 startup
   ```

### Frontend Setup

1. **Build frontend:**
   ```bash
   cd frontend
   npm ci
   npm run build
   ```

2. **Configure Nginx:**
   ```bash
   sudo nano /etc/nginx/sites-available/salary-app
   ```
   Add:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       root /path/to/frontend/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/salary-app /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **Setup SSL (Let's Encrypt):**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## MongoDB Atlas Setup (Recommended)

1. **Create account:** https://www.mongodb.com/cloud/atlas

2. **Create cluster:**
   - Choose free tier (M0)
   - Select region closest to your server

3. **Configure access:**
   - Database Access: Create user with read/write permissions
   - Network Access: Add IP (0.0.0.0/0 for any IP, or specific IPs)

4. **Get connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `salary-expense-manager`

---

## Security Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Generate strong JWT_SECRET (64+ characters)
- [ ] Use MongoDB Atlas or secure MongoDB installation
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS with specific origins
- [ ] Set NODE_ENV=production
- [ ] Review and restrict database access IPs
- [ ] Enable database backups
- [ ] Set up monitoring and logging
- [ ] Test all API endpoints
- [ ] Configure firewall rules

---

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_64_char_secret
JWT_EXPIRE=7d
ALLOWED_ORIGINS=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_APP_NAME=Salary Expense Manager
VITE_APP_VERSION=1.0.0
```

---

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables are set
- Check logs: `pm2 logs` or `docker-compose logs backend`

### Frontend can't connect to backend
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Ensure backend is running

### Database connection issues
- Verify MongoDB is running
- Check IP whitelist in MongoDB Atlas
- Verify credentials in connection string

---

## Monitoring

### PM2 Commands
```bash
pm2 status                 # Check status
pm2 logs salary-backend    # View logs
pm2 restart salary-backend # Restart
pm2 stop salary-backend    # Stop
pm2 delete salary-backend  # Remove
```

### Docker Commands
```bash
docker-compose ps          # Check status
docker-compose logs -f     # View logs
docker-compose restart     # Restart all
docker-compose down        # Stop all
```

---

## Backup Strategy

1. **Database Backups:**
   - MongoDB Atlas: Automatic backups enabled
   - Self-hosted: Use `mongodump` daily:
     ```bash
     mongodump --uri="your_connection_string" --out=/backup/$(date +%Y%m%d)
     ```

2. **Application Backups:**
   - Use Git for version control
   - Regular commits and pushes
   - Tag releases: `git tag v1.0.0`

---

## Updates and Maintenance

### Updating the Application

1. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

2. **Update dependencies:**
   ```bash
   npm ci --only=production
   ```

3. **Restart services:**
   ```bash
   pm2 restart salary-backend
   # or
   docker-compose up -d --build
   ```

---

## Support

For issues or questions:
- Check logs first
- Review environment variables
- Ensure all services are running
- Verify network connectivity

---

**Generated on:** December 28, 2025

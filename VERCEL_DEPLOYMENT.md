# 🚀 Vercel Deployment Guide

## Quick Deploy Checklist

✅ All security features implemented  
✅ Environment variables configured  
✅ Production build tested  
✅ Ready for Vercel deployment  

---

## Prerequisites

1. **MongoDB Atlas Account** (Required)
   - Sign up at: https://www.mongodb.com/cloud/atlas
   - Free tier (M0) is sufficient to start

2. **Vercel Account** (Required)
   - Sign up at: https://vercel.com
   - Connect your GitHub account (recommended) or use Vercel CLI

3. **Git Repository** (Recommended)
   - Push your code to GitHub, GitLab, or Bitbucket
   - OR use Vercel CLI for direct deployment

---

## Step 1: Set Up MongoDB Atlas

### 1.1 Create Database

1. Log in to MongoDB Atlas
2. Click **"Build a Database"** or **"Create"**
3. Choose **FREE** tier (M0 Sandbox)
4. Select region closest to you
5. Click **"Create Cluster"**

### 1.2 Configure Database Access

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Create user with username and password (save these!)
4. Set privileges to **"Read and write to any database"**

### 1.3 Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Confirm (this is safe for serverless deployments)

### 1.4 Get Connection String

1. Go to **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `salary-expense-manager`

Example:
```
mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/salary-expense-manager?retryWrites=true&w=majority
```

---

## Step 2: Generate JWT Secret

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output - you'll need it in the next step.

---

## Step 3: Deploy Backend to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository or use the CLI
4. Select the **`backend`** folder as root directory
5. Click **"Deploy"**

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to backend folder
cd "C:\Users\Admin\Documents\Suk Java\backend"

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - What's your project's name? salary-expense-backend (or your choice)
# - In which directory is your code? ./
# - Want to override settings? No
```

### 3.1 Configure Backend Environment Variables

After deployment, add environment variables in Vercel:

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `NODE_ENV` | `production` | Required |
| `MONGODB_URI` | Your MongoDB Atlas connection string | From Step 1.4 |
| `JWT_SECRET` | Your generated secret | From Step 2 |
| `JWT_EXPIRE` | `7d` | Token expiration |
| `ALLOWED_ORIGINS` | `https://your-frontend.vercel.app` | Add after frontend deploy |
| `RATE_LIMIT_WINDOW_MS` | `900000` | 15 minutes |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |

4. Click **"Save"**
5. Go to **Deployments** → Click the three dots on latest deployment → **"Redeploy"**

**Important**: After deploying frontend (Step 4), come back and update `ALLOWED_ORIGINS` with your frontend URL.

### 3.2 Note Your Backend URL

After deployment completes, Vercel will give you a URL like:
```
https://salary-expense-backend.vercel.app
```

**Save this URL** - you'll need it for the frontend!

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Update Frontend Environment Variables

Before deploying, update `frontend/.env`:

```env
VITE_API_URL=https://your-backend-url.vercel.app/api
VITE_APP_NAME=Salary Expense Manager
VITE_APP_VERSION=1.0.0
```

Replace `your-backend-url.vercel.app` with the URL from Step 3.2.

### 4.2 Deploy Frontend

#### Option A: Via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your repository
4. Select the **`frontend`** folder as root directory
5. Vercel auto-detects Vite - settings should be:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Add environment variables:
   - `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
7. Click **"Deploy"**

#### Option B: Via Vercel CLI

```bash
# Navigate to frontend folder
cd "C:\Users\Admin\Documents\Suk Java\frontend"

# Deploy
vercel

# Follow prompts similar to backend
```

### 4.3 Add Frontend Environment Variables in Vercel

1. Go to frontend project in Vercel Dashboard
2. **Settings** → **Environment Variables**
3. Add:
   - `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
   - `VITE_APP_NAME` = `Salary Expense Manager`
   - `VITE_APP_VERSION` = `1.0.0`
4. Save and redeploy

---

## Step 5: Update CORS Settings

Now that both are deployed:

1. Go to **backend** project in Vercel Dashboard
2. **Settings** → **Environment Variables**
3. Update `ALLOWED_ORIGINS` to your frontend URL:
   ```
   https://your-frontend.vercel.app
   ```
4. If you have a custom domain, add it:
   ```
   https://your-frontend.vercel.app,https://yourdomain.com
   ```
5. **Save** and **Redeploy** backend

---

## Step 6: Test Your Deployment

1. Visit your frontend URL: `https://your-frontend.vercel.app`
2. Test registration: Create a new account
3. Test login: Log in with credentials
4. Test expense tracking: Add expenses
5. Check AI insights are working
6. Test on mobile device

### If Something Doesn't Work:

**Check Backend Logs:**
```bash
vercel logs your-backend-url.vercel.app
```

**Common Issues:**

| Issue | Solution |
|-------|----------|
| Frontend can't connect to backend | Check `VITE_API_URL` matches backend URL |
| CORS error | Update `ALLOWED_ORIGINS` in backend |
| Database connection error | Verify MongoDB connection string and IP whitelist |
| Authentication fails | Check `JWT_SECRET` is set |
| 500 errors | Check backend logs in Vercel dashboard |

---

## Step 7: Custom Domain (Optional)

### Add Custom Domain to Frontend:

1. Go to frontend project in Vercel
2. **Settings** → **Domains**
3. Click **"Add"**
4. Enter your domain (e.g., `myapp.com`)
5. Follow DNS configuration instructions
6. Wait for SSL certificate (automatic)

### Add Custom Domain to Backend:

1. Go to backend project in Vercel
2. **Settings** → **Domains**
3. Add subdomain (e.g., `api.myapp.com`)
4. Update frontend `VITE_API_URL` to use custom domain
5. Update backend `ALLOWED_ORIGINS`

---

## Deployment Commands Reference

### Deploy to Production:
```bash
# Backend
cd backend
vercel --prod

# Frontend
cd frontend
vercel --prod
```

### View Logs:
```bash
vercel logs [your-url]
```

### List Deployments:
```bash
vercel list
```

### Remove Deployment:
```bash
vercel remove [deployment-url]
```

---

## Environment Variables Summary

### Backend (.env - DO NOT COMMIT)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/salary-expense-manager
JWT_SECRET=your_64_character_random_secret_here
JWT_EXPIRE=7d
ALLOWED_ORIGINS=https://your-frontend.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env - DO NOT COMMIT)
```env
VITE_API_URL=https://your-backend.vercel.app/api
VITE_APP_NAME=Salary Expense Manager
VITE_APP_VERSION=1.0.0
```

---

## Automatic Deployments

Once connected to Git:

- **Push to main branch** = Automatic production deployment
- **Push to other branches** = Automatic preview deployment
- Each pull request gets its own preview URL

---

## Monitoring & Maintenance

### View Analytics:
- Go to project in Vercel Dashboard
- Click **Analytics** to see:
  - Page views
  - Unique visitors
  - Top pages
  - Performance metrics

### View Logs:
- **Vercel Dashboard** → **Deployments** → Click deployment → **Logs**
- Or use CLI: `vercel logs`

### Update Dependencies:
```bash
# In your local project
npm update
git add .
git commit -m "Update dependencies"
git push

# Vercel will automatically redeploy
```

---

## Security Checklist for Production

- [x] JWT_SECRET is strong and unique
- [x] MongoDB Atlas with authentication enabled
- [x] HTTPS enabled (automatic on Vercel)
- [x] CORS restricted to your domain
- [x] Rate limiting enabled
- [x] Helmet.js for security headers
- [x] NoSQL injection protection
- [x] Environment variables not in git
- [x] MongoDB IP whitelist configured
- [ ] Set up monitoring/alerts (optional)
- [ ] Configure custom domain (optional)

---

## Cost Estimation

### Free Tier Limits (Vercel):
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ 100 serverless function executions/day
- ✅ Preview deployments

### Free Tier Limits (MongoDB Atlas):
- ✅ 512MB storage
- ✅ Shared RAM
- ✅ Good for ~10,000 users

**Both services are FREE for this application size!**

---

## Next Steps After Deployment

1. ✅ **Test thoroughly** on production
2. ✅ **Share the URL** with users
3. ⭐ **Set up monitoring** (Vercel Analytics)
4. 📱 **Test on mobile devices**
5. 🔔 **Set up alerts** for downtime
6. 📊 **Monitor usage** and scale if needed
7. 🔄 **Regular backups** (MongoDB Atlas handles this)
8. 🔐 **Review security** regularly

---

## Troubleshooting Guide

### "Cannot read properties of undefined"
- Check API URL in frontend .env
- Verify backend is deployed and running

### "CORS Error"
- Update `ALLOWED_ORIGINS` in backend
- Include both with and without trailing slash

### "MongoDB connection failed"
- Verify connection string in backend env vars
- Check MongoDB Atlas IP whitelist (use 0.0.0.0/0)
- Verify database user credentials

### "JWT Malformed"
- Ensure JWT_SECRET matches between deployments
- Check if JWT_SECRET is properly set in Vercel

### 502 Bad Gateway
- Check backend logs
- Verify MongoDB is accessible
- Check if all env vars are set

---

## Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Vercel Community**: https://github.com/vercel/vercel/discussions
- **Check Status**: https://vercel-status.com

---

**Your app is now production-ready! 🎉**

Last Updated: December 28, 2025

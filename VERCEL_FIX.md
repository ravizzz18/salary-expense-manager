# 🔧 Vercel 404 Error - Quick Fix Guide

## Problem: 404 NOT_FOUND after deployment

This happens because Vercel needs to know where your code is located.

---

## ✅ Solution: Deploy Backend and Frontend Separately

### Option 1: Delete and Redeploy (Recommended)

#### Step 1: Delete Current Deployments

1. Go to https://vercel.com/dashboard
2. Find your deployed projects
3. Click each project → **Settings** → **Advanced** → **Delete Project**
4. Confirm deletion

#### Step 2: Deploy Backend Correctly

```bash
# Navigate to backend folder
cd "C:\Users\Admin\Documents\Suk Java\backend"

# Deploy (Vercel will auto-detect it's a Node.js project)
vercel

# Answer the prompts:
# Set up and deploy? YES
# Which scope? [Select your account]
# Link to existing project? NO
# What's your project's name? salary-backend (or any name)
# In which directory is your code? ./ (just press Enter)
# Want to override settings? NO
```

**Important**: After deployment, add environment variables in Vercel Dashboard!

#### Step 3: Deploy Frontend Correctly

First, update frontend/.env with your backend URL:

```bash
# Edit this file
notepad "C:\Users\Admin\Documents\Suk Java\frontend\.env"

# Change VITE_API_URL to your backend URL:
VITE_API_URL=https://your-backend.vercel.app/api
```

Then deploy:

```bash
# Navigate to frontend folder
cd "C:\Users\Admin\Documents\Suk Java\frontend"

# Deploy
vercel

# Answer the prompts:
# Set up and deploy? YES
# Which scope? [Select your account]
# Link to existing project? NO
# What's your project's name? salary-frontend (or any name)
# In which directory is your code? ./ (just press Enter)
# Want to override settings? NO
```

Vercel will auto-detect Vite settings:
- Build Command: `vite build`
- Output Directory: `dist`
- Install Command: `npm install`

---

### Option 2: Fix Existing Deployment

If you want to keep the existing deployment:

#### For Backend Project:

1. Go to Vercel Dashboard → Your Backend Project
2. Click **Settings** → **General**
3. **Root Directory**: Set to `backend` (if you deployed from root)
4. **Framework Preset**: Other
5. **Build Command**: Leave empty
6. **Output Directory**: Leave empty
7. Click **Save**
8. Go to **Deployments** → Click ⋯ on latest → **Redeploy**

#### For Frontend Project:

1. Go to Vercel Dashboard → Your Frontend Project
2. Click **Settings** → **General**
3. **Root Directory**: Set to `frontend` (if you deployed from root)
4. **Framework Preset**: Vite
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. Click **Save**
8. Add Environment Variables:
   - Go to **Settings** → **Environment Variables**
   - Add: `VITE_API_URL` = `https://your-backend.vercel.app/api`
9. Go to **Deployments** → Click ⋯ on latest → **Redeploy**

---

## ⚡ Quick Deploy Commands (From Correct Folders)

### Backend:
```bash
cd "C:\Users\Admin\Documents\Suk Java\backend"
vercel --prod
```

### Frontend:
```bash
cd "C:\Users\Admin\Documents\Suk Java\frontend"
vercel --prod
```

---

## 🎯 Environment Variables Checklist

### Backend (Vercel Dashboard)
After deploying backend, add these in Settings → Environment Variables:

- `NODE_ENV` = `production`
- `MONGODB_URI` = `your_mongodb_atlas_connection_string`
- `JWT_SECRET` = Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- `JWT_EXPIRE` = `7d`
- `RATE_LIMIT_WINDOW_MS` = `900000`
- `RATE_LIMIT_MAX_REQUESTS` = `100`
- `ALLOWED_ORIGINS` = `https://your-frontend.vercel.app`

**After adding**: Redeploy the backend!

### Frontend (Vercel Dashboard)
In Settings → Environment Variables:

- `VITE_API_URL` = `https://your-backend.vercel.app/api`
- `VITE_APP_NAME` = `Salary Expense Manager`
- `VITE_APP_VERSION` = `1.0.0`

**After adding**: Redeploy the frontend!

---

## 🧪 Test After Deployment

1. Visit backend URL: `https://your-backend.vercel.app/api/health`
   - Should return JSON with status info
   
2. Visit frontend URL: `https://your-frontend.vercel.app`
   - Should load the login page

3. Test registration and login

---

## 🐛 Common Issues & Fixes

### Issue: Backend still shows 404
**Fix**: Check Vercel logs
```bash
vercel logs your-backend-url.vercel.app
```
- Make sure `server.js` exists in the deployed directory
- Verify `vercel.json` is in the backend folder

### Issue: Frontend shows blank page
**Fix**: 
- Check browser console (F12)
- Verify `VITE_API_URL` environment variable is set
- Make sure build completed successfully in Vercel logs

### Issue: CORS errors
**Fix**:
- Update `ALLOWED_ORIGINS` in backend environment variables
- Include your frontend URL
- Redeploy backend

### Issue: Can't find module errors
**Fix**:
- Make sure `node_modules` is in `.gitignore`
- Vercel will run `npm install` automatically
- Check `package.json` has all dependencies

---

## 📝 Deployment Checklist

Backend:
- [ ] Deployed from `backend/` folder
- [ ] Environment variables added
- [ ] `/api/health` endpoint works
- [ ] Logs show no errors

Frontend:
- [ ] Deployed from `frontend/` folder
- [ ] `VITE_API_URL` points to backend
- [ ] Build completed successfully
- [ ] Page loads in browser

Integration:
- [ ] CORS configured with frontend URL
- [ ] Can register new user
- [ ] Can login
- [ ] Can add expenses
- [ ] AI insights work

---

## 💡 Pro Tips

1. **Always deploy from the specific folder** (backend/ or frontend/), not from root
2. **Add environment variables BEFORE testing** - they're required!
3. **Check Vercel deployment logs** for any build errors
4. **Use Vercel CLI `--prod` flag** for production deployments
5. **Keep backend and frontend as separate projects** in Vercel

---

## 🆘 Still Having Issues?

Share this info:
1. Which folder you deployed from
2. Vercel deployment logs (in dashboard)
3. Browser console errors (F12)
4. The exact URL showing 404

---

**The configuration files are now fixed. Follow Option 1 above to deploy correctly!**

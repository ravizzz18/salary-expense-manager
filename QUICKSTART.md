# Quick Start Guide - AI Salary Expense Manager

## Prerequisites Check
✅ Node.js installed (v16+)
✅ MongoDB installed/running
✅ npm or yarn available

## Step-by-Step Setup

### 1️⃣ Install Backend Dependencies
```powershell
cd "C:\Users\Admin\Documents\Suk Java\backend"
npm install
```

### 2️⃣ Install Frontend Dependencies
```powershell
cd "C:\Users\Admin\Documents\Suk Java\frontend"
npm install
```

### 3️⃣ Start MongoDB
```powershell
# If MongoDB is a Windows service:
net start MongoDB

# OR if installed standalone:
# Navigate to MongoDB bin folder and run:
mongod
```

### 4️⃣ Start Backend (Terminal 1)
```powershell
cd "C:\Users\Admin\Documents\Suk Java\backend"
npm run dev
```
✅ Backend running on http://localhost:5000

### 5️⃣ Start Frontend (Terminal 2)
```powershell
cd "C:\Users\Admin\Documents\Suk Java\frontend"
npm run dev
```
✅ Frontend running on http://localhost:3000

## 🎉 Application is Ready!

1. Open browser: http://localhost:3000
2. Register a new account
3. Login with credentials
4. Add your first expense entry
5. Get AI-powered insights!

## Common Commands

### Backend
- `npm start` - Production mode
- `npm run dev` - Development mode (with nodemon)

### Frontend
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview production build

## Testing the Application

### Test User Registration
1. Go to http://localhost:3000/register
2. Fill in: Name, Email, Password
3. Click "Create Account"

### Test Expense Entry
1. Enter Salary: 50000
2. Fill expenses:
   - Rent: 20000
   - EMI: 5000
   - Groceries: 5000
   - Utilities: 2000
   - Transport: 3000
   - Entertainment: 2000
3. Toggle insurance if applicable
4. Click "Calculate & Save"
5. View AI insights and charts!

## Need Help?

- Backend logs: Check terminal running backend
- Frontend logs: Check browser console (F12)
- MongoDB: Ensure it's running on port 27017

## Environment Variables (.env)
Already configured in `backend/.env`:
- PORT=5000
- MONGODB_URI=mongodb://localhost:27017/salary-expense-manager
- JWT_SECRET=(change in production!)
- JWT_EXPIRE=7d

---

🚀 **You're all set! Happy expense tracking!**

# AI-Based Salary Expense Manager

A full-stack web application for managing salary and expenses with AI-powered financial insights.

## 🚀 Features

- **User Authentication**: Secure JWT-based registration and login
- **Expense Tracking**: Track salary and multiple expense categories
- **AI Financial Insights**: Rule-based AI provides personalized financial advice
- **Interactive Charts**: Visualize expenses with pie charts and bar graphs
- **Expense History**: View and manage all expense records
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Smooth Animations**: Built with Framer Motion for fluid UI transitions

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Recharts (data visualization)
- Lucide React (icons)
- Axios (API calls)
- React Router (navigation)

### Backend
- Node.js
- Express
- MongoDB (Mongoose ODM)
- JWT (authentication)
- bcryptjs (password hashing)

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (running locally or MongoDB Atlas connection string)
- **npm** or **yarn** package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
cd "C:\Users\Admin\Documents\Suk Java"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Configure environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/salary-expense-manager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d
NODE_ENV=development
```

**Important**: Change `JWT_SECRET` to a secure random string in production!

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## 🚀 Running the Application

### Start MongoDB

Make sure MongoDB is running. If using local MongoDB:

```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# Or if using MongoDB manually
mongod
```

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 📱 Usage

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in at `/login`
3. **Add Expense Entry**: 
   - Enter monthly salary
   - Fill in expense categories (rent, EMI, groceries, etc.)
   - Toggle insurance if applicable
   - Click "Calculate & Save"
4. **View Insights**: Get AI-powered financial recommendations
5. **Analyze Charts**: View expense distribution and breakdowns
6. **Track History**: See all previous expense entries
7. **Toggle Theme**: Switch between dark and light modes

## 🤖 AI Insights Rules

The AI system analyzes your finances based on these rules:

- **Rent Warning**: Alerts if rent exceeds 40% of salary
- **EMI Warning**: Warns if EMI is more than 30% of salary
- **Savings Alert**: Suggests improvements if savings are below 30%
- **Insurance Tip**: Recommends insurance if not covered
- **Category Optimization**: Provides tips for overspending in specific categories
- **Success Messages**: Celebrates good financial habits

## 📁 Project Structure

```
/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── aiInsights.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── StatCard.jsx
    │   │   ├── ExpenseForm.jsx
    │   │   ├── ExpenseCharts.jsx
    │   │   ├── AIInsights.jsx
    │   │   └── ExpenseHistory.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── hooks/
    │   │   └── useAuth.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- Input validation
- XSS protection
- CORS enabled

## 🎨 UI/UX Features

- Clean, modern interface
- Smooth page transitions
- Loading states
- Error handling
- Form validation
- Responsive grid layouts
- Hover effects
- Toast notifications

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Expenses
- `POST /api/expenses` - Create expense entry (protected)
- `GET /api/expenses` - Get all expenses (protected)
- `GET /api/expenses/:id` - Get single expense (protected)
- `DELETE /api/expenses/:id` - Delete expense (protected)
- `GET /api/expenses/stats` - Get expense statistics (protected)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network connectivity

### Port Already in Use
- Change `PORT` in backend `.env`
- Change `port` in frontend `vite.config.js`

### Dependencies Issues
- Delete `node_modules` folders
- Run `npm install` again

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Use MongoDB Atlas for database
4. Deploy to services like Heroku, Railway, or AWS

### Frontend
1. Run `npm run build`
2. Deploy `dist` folder to Vercel, Netlify, or similar
3. Update API URL to production backend

## 📝 License

MIT License - Feel free to use this project for learning and commercial purposes.

## 👨‍💻 Author

Built with ❤️ by Claude Sonnet 4.5

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

**Happy expense tracking! 💰📊**

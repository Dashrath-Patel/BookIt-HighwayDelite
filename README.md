# BookIt: Travel Experiences & Slots

A complete fullstack web application for booking travel experiences with real-time slot management.

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel/Netlify]
- **Backend**: [Deployed on Railway/Render]

## 📋 Features

- **Experience Browsing**: View and search travel experiences
- **Real-time Availability**: Check available dates and time slots
- **Booking System**: Complete booking flow with user details
- **Promo Codes**: Apply discount codes (SAVE10, FLAT100, WELCOME20)
- **Responsive Design**: Mobile-first design matching Figma specifications
- **Form Validation**: Client-side validation for user inputs
- **Loading States**: Proper loading and error handling

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **CORS** and **Helmet** for security
- **UUID** for booking ID generation

## 📁 Project Structure

```
bookit-experiences/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx
│   ├── public/
│   └── package.json
├── backend/                 # Express backend
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── seed.js         # Database seeding
│   │   └── server.js
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookit-experiences
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Backend (.env):
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI
   ```
   
   Frontend (.env):
   ```bash
   cd frontend
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Seed the database**
   ```bash
   cd backend
   npm run seed
   ```

6. **Start the development servers**
   ```bash
   # From root directory
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📱 Pages & Flow

1. **Home Page** (`/`)
   - Display all experiences in a grid
   - Search functionality
   - Responsive card layout

2. **Details Page** (`/experience/:id`)
   - Experience details and images
   - Date and time slot selection
   - Quantity selection and pricing
   - Real-time availability

3. **Checkout Page** (`/checkout`)
   - User information form
   - Promo code application
   - Booking summary
   - Form validation

4. **Result Page** (`/result`)
   - Booking confirmation/failure
   - Booking reference ID
   - Return to home option

## 🔧 API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences (with optional search)
- `GET /api/experiences/:id` - Get experience by ID

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:bookingId` - Get booking details

### Promo Codes
- `POST /api/promo/validate` - Validate promo code

### Available Promo Codes
- `SAVE10` - 10% discount
- `FLAT100` - ₹100 off
- `WELCOME20` - 20% off for new users

## 🎨 Design Implementation

The frontend exactly matches the provided Figma designs:
- **Typography**: Inter font family with proper weights
- **Colors**: Custom yellow primary color (#F5D547)
- **Spacing**: Consistent padding and margins
- **Components**: Pixel-perfect button styles and form elements
- **Responsive**: Mobile-first approach with proper breakpoints

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration
- **Input validation** on both client and server
- **MongoDB injection** prevention
- **Error handling** without exposing sensitive data

## 📊 Database Schema

### Experience Model
```javascript
{
  title: String,
  location: String,
  price: Number,
  image: String,
  description: String,
  duration: String,
  groupSize: String,
  includes: [String],
  availableDates: [String],
  timeSlots: [{
    time: String,
    available: Number,
    soldOut: Boolean
  }]
}
```

### Booking Model
```javascript
{
  bookingId: String,
  experienceId: ObjectId,
  experienceTitle: String,
  date: String,
  time: String,
  quantity: Number,
  fullName: String,
  email: String,
  promoCode: String,
  subtotal: Number,
  taxes: Number,
  discount: Number,
  total: Number,
  status: String
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `dist` folder
3. Set environment variables in deployment platform

### Backend (Railway/Render)
1. Connect your repository
2. Set environment variables:
   - `MONGODB_URI`
   - `PORT`
   - `NODE_ENV=production`
3. Deploy with start command: `npm start`

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Get connection string
3. Update `MONGODB_URI` in environment variables
4. Run seed script: `npm run seed`

## 🧪 Testing

### Manual Testing Checklist
- [ ] Home page loads with experiences
- [ ] Search functionality works
- [ ] Experience details page shows correct data
- [ ] Date and time selection works
- [ ] Quantity adjustment works
- [ ] Checkout form validation
- [ ] Promo code application
- [ ] Booking creation and confirmation
- [ ] Responsive design on mobile
- [ ] Error handling for network issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For any issues or questions, please create an issue in the repository.

---

**Built with ❤️ for the BookIt travel experiences platform**
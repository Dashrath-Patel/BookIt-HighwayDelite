# Deployment Guide

## Frontend Deployment (Vercel)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Your frontend will be available at `https://your-app.vercel.app`

## Backend Deployment (Railway)

1. **Connect Repository**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Configure Service**
   - Root Directory: `backend`
   - Start Command: `npm start`

3. **Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookit
   PORT=5000
   NODE_ENV=production
   ```

4. **Database Setup**
   - Create MongoDB Atlas cluster
   - Get connection string
   - Add to Railway environment variables
   - Run seed command: `npm run seed`

5. **Deploy**
   - Railway will automatically deploy
   - Your API will be available at `https://your-app.railway.app`

## Alternative: Render Deployment

### Backend on Render
1. Create new Web Service
2. Connect GitHub repository
3. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables
5. Deploy

### Frontend on Netlify
1. Connect GitHub repository
2. Configure:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
3. Add environment variables
4. Deploy

## Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Database connection works
- [ ] Search functionality works
- [ ] Booking flow completes
- [ ] Promo codes work
- [ ] Mobile responsiveness
- [ ] Error handling works

## Monitoring

- Check deployment logs for errors
- Test all user flows
- Monitor API response times
- Verify database operations
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import problemRoutes from './routes/problems.js';
import contestRoutes from './routes/contests.js';
import submissionRoutes from './routes/submissions.js';
import explainRoutes from './routes/explain.js';
import hintRoutes from './routes/hint.js';
import editorialRoutes from './routes/editorial.js';
import leaderboardRoutes from './routes/leaderboard.js';
import roadmapRoutes from './routes/roadmap.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// ─── Security Middleware ─────────────────────────────────────────
app.use(helmet());

// ─── Request Logging ─────────────────────────────────────────────
app.use(morgan('dev'));

// ─── CORS ────────────────────────────────────────────────────────
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://thecodearena.vercel.app',
        'https://thecodearena.co.in',
        'https://www.thecodearena.co.in',
    ],
    credentials: true,
}));

// ─── Body Parsing (10mb limit for webcam base64 payloads) ────────
app.use(express.json({ limit: '10mb' }));

// ─── Rate Limiting ───────────────────────────────────────────────
// Prevent OTP spam: max 5 OTP requests per IP per 15 minutes
const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: { message: 'Too many OTP requests. Please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Health check (wake-up ping)
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/auth/send-otp', otpLimiter); // Apply rate limit to OTP route
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/explain', explainRoutes);
app.use('/api/hint', hintRoutes);
app.use('/api/editorial', editorialRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/roadmap', roadmapRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


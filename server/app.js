const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const healthRoutes = require('./routes/health.routes');

const app = express();

// --- Security & core middleware ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// --- Routes ---
// Root
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Kuttanad Kerala Tourism & Booking Platform API',
    docs: '/api/health',
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/properties', require('./routes/property.routes'));
app.use('/api/rooms', require('./routes/room.routes'));
app.use('/api/destinations', require('./routes/destination.routes'));
app.use('/api/activities', require('./routes/activity.routes'));
app.use('/api/itineraries', require('./routes/itinerary.routes'));
app.use('/api/enquiries', require('./routes/enquiry.routes'));

// --- Error handling ---
app.use(notFound);
app.use(errorHandler);

module.exports = app;

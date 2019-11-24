const express = require('express');
const app = express();
const connectDB = require('./middleware/config/db');

// Connect database
connectDB();

//Init middleware
app.use(express.json({ extended: false }))

// Environnement
const PORT = process.env.PORT || 5000;

// Test route
app.get('/', (req, res) => res.send('API Running'));


// Router that dispatch requests to server
 app.use('/api/users', require('./routes/api/users'))
 app.use('/api/posts', require('./routes/api/posts'))
 app.use('/api/profile', require('./routes/api/profile'))
 app.use('/api/auth', require('./routes/api/auth'))

 
app.listen(PORT, () => {
  try {
    console.log(`Server started on localhost:${PORT}`)
  } catch(err) {
    console.log(err);
  }
});

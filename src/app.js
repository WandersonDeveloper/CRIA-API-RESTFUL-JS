const express = require('express');
const config = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
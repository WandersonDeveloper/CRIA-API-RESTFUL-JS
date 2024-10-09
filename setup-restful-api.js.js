// setup-restful-api.js
const fs = require('fs');
const path = require('path');

// Estrutura do projeto
const structure = [
  'src/controllers',
  'src/models',
  'src/middlewares',
  'src/routes',
  'src/services',
  'src/utils',
];

// Arquivos e seus conteúdos
const files = {
  'src/app.js': `
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
  console.log(\`Server running on port \${PORT}\`);
});
`,
  'src/config.js': `
require('dotenv').config();

module.exports = {
  dbURI: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000,
};
`,
  'src/controllers/userController.js': `
const getAllUsers = (req, res) => {
  res.json({ message: 'Lista de usuários' });
};

const createUser = (req, res) => {
  res.status(201).json({ message: 'Usuário criado com sucesso' });
};

const getUserById = (req, res) => {
  res.json({ message: \`Usuário com ID: \${req.params.id}\` });
};

const updateUser = (req, res) => {
  res.json({ message: \`Usuário com ID: \${req.params.id} atualizado\` });
};

const deleteUser = (req, res) => {
  res.status(204).end();
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
`,
  'src/routes/user.js': `
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
`,
  'src/middlewares/errorHandler.js': `
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado, tente novamente mais tarde' });
};
`,
  'src/models/User.js': `
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
`,
  '.env': `
DB_URI=your_database_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
`,
  'package.json': `
{
  "name": "restful-api",
  "version": "1.0.0",
  "description": "API RESTful padrão",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js"
  },
  "dependencies": {
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "mongoose": "^7.0.0"
  },
  "devDependencies": {},
  "author": "",
  "license": "ISC"
}
`,
};

// Função para criar a estrutura de diretórios e arquivos
const createStructure = () => {
  structure.forEach(dir => {
    fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
    console.log(`Created directory: ${dir}`);
  });

  Object.entries(files).forEach(([filePath, content]) => {
    fs.writeFileSync(path.join(__dirname, filePath), content.trim());
    console.log(`Created file: ${filePath}`);
  });

  console.log('Estrutura do projeto RESTful criada com sucesso!');
};

// Executa a criação da estrutura
createStructure();

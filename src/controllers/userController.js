const getAllUsers = (req, res) => {
  res.json({ message: 'Lista de usuários' });
};

const createUser = (req, res) => {
  res.status(201).json({ message: 'Usuário criado com sucesso' });
};

const getUserById = (req, res) => {
  res.json({ message: `Usuário com ID: ${req.params.id}` });
};

const updateUser = (req, res) => {
  res.json({ message: `Usuário com ID: ${req.params.id} atualizado` });
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
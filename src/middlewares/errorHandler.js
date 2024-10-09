module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado, tente novamente mais tarde' });
};
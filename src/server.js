require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar:', err));

// Modelo da fruta (estrutura do documento no banco)
const frutaSchema = new mongoose.Schema({
  nome: String,
  codigo: Number
});
const Fruta = mongoose.model('Fruta', frutaSchema);

// Rota GET - listar frutas
app.get('/frutas', async (req, res) => {
  const frutas = await Fruta.find();
  res.json(frutas);
});

// Rota POST - adicionar fruta
app.post('/frutas', async (req, res) => {
  const novaFruta = new Fruta(req.body);
  await novaFruta.save();
  res.status(201).json(novaFruta);
});

// Rota DELETE - remover fruta
app.delete('/frutas/:id', async (req, res) => {
  await Fruta.findByIdAndDelete(req.params.id);
  res.json({ mensagem: 'Fruta removida com sucesso' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

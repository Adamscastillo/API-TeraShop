const mongoose = require('mongoose'); //chamando o mongoose
const bcrypt = require('bcrypt');


//colecao que irar ser guardada dentro do banco de dados com as inforaçoes que irao ser necessárias no front-end
const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  sobre: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  cep: {
    type: Number,
    require: true
  },
  cidade: {
    type: String,
    require: true
  },
  estado: {
    type: String,
    require: true
  },
  UF: {
    type: String,
    require: true
  },
  createrdAt: {
    type: Date,
    default: Date.now,
  },


});

// hash de passwaord
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
})

const User = mongoose.model('User', UserSchema) //schema de usuario

module.exports = User;

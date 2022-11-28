const mongoose = require("mongoose"); //chamando o mongoose
const bcrypt = require("bcrypt");

//colecao que irar ser guardada dentro do banco de dados com as inforaçoes que irao ser necessárias no front-end
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  lastame: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  cep: {
    type: Number,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  UF: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  createrdAt: {
    type: Date,
    default: Date.now,
  },
});

// hash de passwaord
UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model("User", UserSchema); //schema de usuario

module.exports = User;

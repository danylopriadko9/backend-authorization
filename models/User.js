// тут мы создадим сущность пользователя
const { Schema, model } = require('mongoose');
const Role = require('./Role');

const User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // ref: 'Role' - означает то - что каждая роль будет ссылаться на другую сущность (./Role.js)
  roles: [{ type: String, ref: 'Role' }],
});

// создаем модель юзера, где первый парамметр - название , а второй - схера
module.exports = model('User', User);

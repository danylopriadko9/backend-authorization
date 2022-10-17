// тут мы создадим сущность роли
const { Schema, model } = require('mongoose');

const Role = new Schema({
  value: {
    type: String,
    unique: true,
    default: 'USER',
  },
});

// создаем модель юзера, где первый парамметр - название , а второй - схера
module.exports = model('Role', Role);

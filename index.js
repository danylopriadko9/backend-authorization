const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const authRouter = require('./authRouter');

// обьевление приложения
const app = express();
app.use(express.json());

// подключение authRouter по базовому URL /auth
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://admin:admin@cluster0.ffcgpxg.mongodb.net/authorization?retryWrites=true&w=majority`
      )
      .then(() => console.log('mongoDB is starting'));
    app.listen(PORT, () => console.log(`Server is working on ${PORT} port!`));
  } catch (error) {
    console.log(error);
  }
};

start();

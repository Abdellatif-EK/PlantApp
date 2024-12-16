const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
const ip = require('ip');
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });
const mongoURL =
  'mongodb+srv://elkerbaniabdo:admin@cluster0.zbbwp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const JWT_SECRET =
  '96727152f374579890ba6bc6d5ae5093f24437aba2d08478a7327fc3e96c0197';

mongoose
  .connect(mongoURL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.listen(5001, () => {
  console.log('nodejs server started');
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./UserDetails');

const User = mongoose.model('UserInfo');

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.send({ status: 'error', data: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      name: name,
      email,
      password: hashedPassword,
    });
    res.send({ status: 'ok', data: 'User created' });
  } catch (error) {
    res.send({ status: 'error', data: error });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const oldUser = await User.findOne({ email: email });

  if (!oldUser) {
    return res.send({ status: 'error', data: 'Email does not exist' });
  }

  //console.log('password in request : ', password);
  // Check if the provided password matches the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, oldUser.password);

  if (!isPasswordValid) {
    return res.send({ status: 'error', data: 'Invalid password' });
  }
  const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
  // If the password is valid, proceed with login
  res.send({ status: 'ok', data: token });
});

app.listen(port, () => {
  console.log(`Server is running at http://${ip.address()}:${port}`);
});
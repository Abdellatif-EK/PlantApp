const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: 'UserInfo',
  }
);

mongoose.model('UserInfo', UserDetailSchema);

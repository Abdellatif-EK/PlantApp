const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }],
    address: { type: String },
    telephone: { type: String },
    dateOfBirth: { type: Date },
    firstName: { type: String },
    lastName: { type: String },
    sex: { type: String, enum: ['Male', 'Female'] },
  },
  {
    collection: 'UserInfo',
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;

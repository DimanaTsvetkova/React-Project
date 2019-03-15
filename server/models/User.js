const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true
  },
  hashedPassword: {
    type: Schema.Types.String,
    required: true
  },
  fullName: {
    type: Schema.Types.String,
    required: true
  },
  imageUrl:{
    type:Schema.Types.String,
    required:true,
    default:'../pics/alt-user.jpg' 
  },
  products:[{
    type: Schema.Types.ObjectId,
     ref:'Product'
  }],
  orders:[{
    type: Schema.Types.ObjectId, 
    ref:'Order'
  }],
  salt: {
    type: Schema.Types.String,
    required: true
  },
  roles: [{type: Schema.Types.String, required: true, default:'User'}],

});

userSchema.method({
  authenticate: function (password) {
    const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

    return currentHashedPass === this.hashedPassword;
  }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
  try {
    let users = await User.find();
    if (users.length > 0) return;
    const salt = encryption.generateSalt();
    const hashedPassword = encryption.generateHashedPassword(salt, 'Admin');
    return User.create({
      username: 'Admin',
      fullName:'Admin',
      salt,
      hashedPassword,
      roles: ['Admin']
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = User;
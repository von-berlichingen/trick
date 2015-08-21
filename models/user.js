'use strict';

// user.js
// Financial Advisor (referenced as User) model logic

var neoprene = require('neoprene');
var config = require('../config');
var Schema = neoprene.Schema;
var userService = require('../services/user-service');
neoprene.connect(config.neo4jUri);

// Setup the constants and create the schema

var UserSchema = new Schema({
  firstName:{
    type: String,
    required: 'Please enter your first name'
  },
  lastName:{
    type: String,
    required: 'Please enter your last name'
  },
  email:{
    type: String,
    required: 'Please enter your email',
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/]
  },
  password:{
    type: String,
    required: 'Please enter your password'
  },
  roomNumber:{
    type: Number,
    required: 'Please enter your room number',
    min:[100, 'Not a valid room number']
  },
  created: {
    type: Date,
    default: Date.now
  }
});
// create a convenience function for the name
UserSchema
    .virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.middleName + ' ' + this.lastName;
    });
UserSchema
    .virtual('userName')
    .get(function () {
        return this.firstName + '.' + this.middleName + '.' + this.lastName +'.'+this._id;
    });

// this returns the name variable when the object is sent to the front end
UserSchema.set('toJSON', { virtuals: true });

UserSchema.path('email').validate(function(value, next) {
  userService.findUser(value, function(err, user) {
    if (err) {
      console.log(err);
      return next(false);
    }
    next(!user);
  });
}, 'That email is already in use!');


module.exports = neoprene.model('User', UserSchema);

'use strict';

/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true
    },
    password: {
      type: 'string'
    },
    username: {
      type: 'string',
      required: true
    }
  },
  customToJSON: function () {
    const obj = {
      ...this
    };
    delete obj.password;
    return obj;
  },
  beforeCreate: async (values, next) => {
    try {
      values = await CipherService.hashPassword(values);
    }
    catch (err) {
      return next(err);
    }
    return next();
  },
  beforeUpdate: async (values, next) => {
    try {
      values = await CipherService.hashPassword(values);
    }
    catch (err) {
      return next(err);
    }
    return next();
  }

};

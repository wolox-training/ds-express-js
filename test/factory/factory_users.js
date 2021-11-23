const { factory } = require('factory-girl');
const { hash } = require('../../app/helpers/authentication');
const { factoryAllModels } = require('./factory_by_models');

factoryAllModels();

exports.credentials = {
  email: 'david@wolox.com.co',
  password: 'ABC12345678'
};

exports.user = {
  name: 'David',
  last_name: 'Sandoval',
  ...this.credentials
};

exports.generateUsers = async number => {
  const { email } = this.credentials;
  const password = await hash(this.credentials.password);
  factory.createMany('users', number, {
    ...this.user,
    lastName: this.user.last_name,
    email: factory.seq('User.email', pos => (pos === 1 ? email : pos + email)),
    password
  });
};

exports.generateUser = async () => {
  await this.generateUsers(1);
};

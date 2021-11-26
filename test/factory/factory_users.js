const { factory } = require('factory-girl');
const { ADMIN, REGULAR } = require('../../app/constants/roles');
const { hash } = require('../../app/helpers/authentication');
const { factoryAllModels } = require('./factory_by_models');

factoryAllModels();

const PASSWORD = 'ABC12345678';
const ADMIN_USER = { email: 'david@wolox.com.co', password: PASSWORD };
const REGULAR_USER = { email: '3david@wolox.com.co', password: PASSWORD };

exports.CREDENTIALS = { ADMIN_USER, REGULAR_USER };
exports.USER = { ...ADMIN_USER, name: 'David', last_name: 'Sandoval' };

exports.generateUsers = async number => {
  factory.resetSeq();
  const { email } = this.USER;
  const password = await hash(PASSWORD);
  factory.createMany('User', number, {
    ...this.USER,
    lastName: this.USER.last_name,
    email: factory.seq('User.email', pos => (pos === 1 ? email : pos + email)),
    role: factory.seq('User.role', pos => (pos === 1 ? ADMIN : REGULAR)),
    password
  });
};

exports.generateUser = async () => {
  await this.generateUsers(1);
};

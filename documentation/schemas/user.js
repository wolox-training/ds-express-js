module.exports = {
  email: {
    type: 'string',
    example: 'david.sandoval@wolox.co'
  },
  password: {
    type: 'string',
    example: '1234ABCD'
  },
  User: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'David'
      },
      last_name: {
        type: 'string',
        example: 'Sandoval'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};

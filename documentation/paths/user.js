module.exports = {
  '/users': {
    post: {
      tags: ['CRUD operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'New user was created',
          content: {
            'application/json': {
              example: {
                name: 'David',
                last_name: 'Sandoval',
                email: 'david@wolox.co',
                updatedAt: '2021-11-17T12:00:00.000Z',
                createdAt: '2021-11-17T12:00:00.000Z'
              }
            }
          }
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Email already exists.',
                internal_code: 'request_error'
              }
            }
          }
        }
      }
    }
  }
};

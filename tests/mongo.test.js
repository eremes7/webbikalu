const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app);

describe('Login API', () => {
  beforeEach(async () => {


    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('salasana', 10);
    const user = new User({ username: 'testikäyttäjä', passwordHash });

    await user.save();
  });

  test('login succeeds with correct credentials', async () => {
    const loginDetails = {
      username: 'testikäyttäjä',
      password: 'salasana'
    };

    await api
      .post('/api/login')
      .send(loginDetails)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('login fails with wrong credentials', async () => {
    const loginDetails = {
      username: 'testikäyttäjä',
      password: 'vääräsalasana'
    };

    await api
      .post('/api/login')
      .send(loginDetails)
      .expect(401);
  });

});

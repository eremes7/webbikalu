const supertest = require('supertest')
const app = require('../app')
const Kappale = require('../models/kappale')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const api = supertest(app)


//testaa, että tietokanta on kappaleista tyhjä
//testaa, että kappaleen lisäys onnistuu
//testaa, että kappaleen hakeminen onnistuu
//testaa, että kappaleissa on vaadittavat muuttujat lisättäessä
//testaa, että samaa id, nimea jne. ei voi lisätä tietokantaan,
//testaa, että kategoriaa lisättäessä isot alkukirjaimet menee oikein ja välilyönnillä ei ole väliä
//testaa, että kappale voidaan poistaa
//testaa, että kappaleesta voidaan vaihtaa jokin osa oikein
//testaa, että tyhjää kappaletta ei voida lisätä
//testaa, että kategorian sisällä id:t menee kronologisesti
//
//testaa, että useamman kappaleen lisääminen onnistuu nopeasti peräkkäin
//

beforeAll(async () => {
  await User.deleteMany({});
  await Kappale.deleteMany({});

  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('salasana', 10);
  const user = new User({ username: 'testikäyttäjä', passwordHash });

  await user.save()
});

describe('Kappaleiden lisääminen', () => {
  let token;

  // Kirjaudu sisään ennen jokaista testiä
  beforeEach(async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: 'testikäyttäjä',
        password: 'salasana'
      });

    token = response.body.token;
  });

  test('Kappaleen lisääminen onnistuu kirjautuneena käyttäjänä', async () => {
    const newKappale = {
      nimi: "Ässät korkealla",
      alkuperäinen: "Aces High",
      kategoria: "Hassut laulut",
      kappaleId: 123,
      sanat: "Elää lentääkseen, lentää elääkseen... Ässät korkealla"
    }

    await api
      .post('/api/kappaleet')
      .set('Authorization', `Bearer ${token}`)
      .send(newKappale, token)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  });

  // Lisää muita testejä tarvittaessa
});


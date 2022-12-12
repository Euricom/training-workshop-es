# TypeScript Exercise

Add types to the following functions

REMARK: there are bug in the code, please fix them!

```js
import axios from 'axios';

function expire(timeout) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout Error'));
    }, timeout);
  });
}

async function getPersonById(peopleId) {
  const res = await axios.get(`https://swapi.dev/api/people/${peopleId}`);
  return res.data;
}

function logPerson(person) {
  console.log(person.name);
}

(async function() {
  const person = await getPersonById(1);
  logPerson(person)
}();

```

```ts
import axios from 'axios';

async function getContactById(peopleId) {
  try {
    const resPerson = await axios.get(`https://swapi.dev/api/people/${peopleId}`);
    const resPlanet = await axios.get(resPerson.data.homeworld);
    return {
      person: {
        name: resPerson.data.name,
      }
      planet: {
        name: planet.name,
        population: planet.population,
      },
    };
  }
  catch(err) {
    if (err.status === 404) {
      return null;
    }
    throw err;
  }
}

(async function() {
  const person = await getContactByIdd(1);
  console.log(person.name);
  console.log(person.planet.name);
})();
```

```ts
import axios from 'axios';

async function getPersons(timeout, ...ids)> {
  const peoplePromises = ids.map(async id => {
    return axios.get(`https://swapi.dev/api/people/${id}`).then(res => res.data)
  });
  const results = await Promise.race([expire(timeout), Promise.all(peoplePromises)]);
  if (results.length === 1) {
    return results[0];
  }
  return results;
}

function logPerson(person) {
  console.log(person.name);
}

(async function() {
  const timeout = 500;
  const persons = await getPersons(timeout, 1, 2, 3);
  for (let person of persons) {
    logPerson(person)
  }
})()

(async function() {
  const person = await getPersons(500, 1);
  logPerson(person)
})()
```

# TypeScript Exercise - Solution

Add types to the following functions

```js
/* eslint-disable no-console */
import axios from 'axios';

function expire(timeout: number): Promise<void> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout Error'));
    }, timeout);
  });
}

type Person = {
  name: string;
};

type PeopleDTO = {
  name: string;
  homeworld: string;
};

async function getPersonById(peopleId: number): Promise<Person> {
  const res = await axios.get<PeopleDTO>(`https://swapi.dev/api/people/${peopleId}`);
  return res.data;
}

function logPerson(person: Person) {
  console.log(person.name);
}

// eslint-disable-next-line func-names
(async function () {
  const person = await getPersonById(1);
  logPerson(person);
})();
```

```ts
/* eslint-disable func-names */
/* eslint-disable no-console */
import axios, { AxiosError } from 'axios';

type Contact = {
  person: {
    name: string;
  };
  planet: {
    name: string;
    population: string;
  };
};

type PeopleDTO = {
  name: string;
  homeworld: string;
};

type PlanetDTO = {
  name: string;
  population: string;
};

async function getContact(peopleId: number): Promise<Contact | null> {
  try {
    const resPerson = await axios.get<PeopleDTO>(`https://swapi.dev/api/people/${peopleId}`);
    const resPlanet = await axios.get<PlanetDTO>(resPerson.data.homeworld);
    return {
      person: {
        name: resPerson.data.name,
      },
      planet: {
        name: resPlanet.data.name,
        population: resPlanet.data.population,
      },
    };
  } catch (err) {
    if (err instanceOf AxiosError) {
      if (err.response?.status === 404) {
        return null;
      }
    }
    // not an AxiosError, rethrow
    throw err;
  }
}

(async function () {
  const contact = await getContact(1);
  if (contact) {
    console.log(contact.person.name);
    console.log(contact.planet.name);
  }
})();
```

```ts
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import axios from 'axios';
import invariant from 'tiny-invariant';

function expire(timeout: number): Promise<void> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout Error'));
    }, timeout);
  });
}

type Person = {
  name: string;
};

type PeopleDTO = {
  name: string;
  homeworld: string;
};

function getPersons(timeout: number, id: number): Promise<Person | null>;
function getPersons(timeout: number, ...ids: number[]): Promise<Person[]>;
async function getPersons(timeout: number, ...ids: number[]): Promise<Person[] | Person | null> {
  // eslint-disable-next-line arrow-body-style
  const peoplePromises = ids.map(async (id) => {
    return axios.get<PeopleDTO>(`https://swapi.dev/api/people/${id}`).then((res) => res.data);
  });
  const results = await Promise.race([expire(timeout), Promise.all(peoplePromises)]);
  invariant(Array.isArray(results), 'not an array');
  if (results.length === 1) {
    return results[0];
  }
  return results;
}

function logPerson(person: Person) {
  console.log(person.name);
}

(async function () {
  const timeout = 500;
  const persons = await getPersons(timeout, 1, 2, 3);
  for (const person of persons) {
    logPerson(person);
  }
})();

(async function () {
  const person = await getPersons(500, 1);
  if (person) {
    logPerson(person);
  }
})();
```

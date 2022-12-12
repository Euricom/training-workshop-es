# Exercise Javascript - Async - Solutions

## Callbacks

### log 'done' after 1 sec

```js
// log 'done' after 1 sec
console.log('start');
waitASecond('peter', (arg) => {
  console.log('done', arg);
})

function waitASecond(arg, cb) {
  setTimeout(() => {
    cb(arg);
  }, 1000);
}

// Typescript

function waitASecondTS(arg: string, cb: (arg: string) => void) {
  setTimeout(() => {
    cb(arg);
  }, 1000);
}
```

### Write a countdown function

```js
console.log('start');
countDown('ready', 5, (arg, cnt, end) => {
  console.log(`call ${cnt}: `, arg);
  if (end) {
    console.log(`done`);
  }
});

function countDown(arg, count, cb) {
  if (count > -1) {
    setTimeout(() => {
      cb(arg, count, count === 0);
      countDown(arg, --count, cb);
    }, 1000);
  }
}

// Typescript

type countDownCb = (arg: string, cnt: number, done: boolean) => void;
function countDownTS(arg: string, count: number, cb: countDownCb) {
  if (count > -1) {
    setTimeout(() => {
      cb(arg, count, count === 0);
      countDown(arg, --count, cb);
    }, 1000);
  }
}
```

## Call SWAPI api get person name with id 1

```js
import request from 'request';

request.get('https://swapi.dev/api/people/1', (error, res) => {
  console.log(JSON.parse(res.body).name);
});

OUTPUT: Luke Skywalker
```

## Make an async function that returns the name of home planet (through SWAPI)based on the personId. Handle the error when an error occurs.

```js
import request from 'request';

function getHomePlanetById(peopleId, callback) {
  request.get(`https://swapi.dev/api/people/${peopleId}`, (error, res) => {
    if (error) {
      callback(error);
      return;
    }
    if (res.statusCode !== 200) {
      callback(new Error(`Http Error: [${res.statusCode}]`));
      return;
    }
    const person = JSON.parse(res.body);
    request.get(person.homeworld, (error, res) => {
      if (error) {
        callback(error);
        return;
      }
      if (res.statusCode !== 200) {
        callback(new Error(`Http Error: [${res.statusCode}]`));
      }
      const planet = JSON.parse(res.body);
      callback(null, planet.name);
    });
  });
}

// Typescript

interface Person {
  name: string;
  homeworld: string;
  height: string;
  // more available
}

interface Planet {
  name: string;
  rotation_period: string;
  // more available
}

type GetHomePlanetByIdCb = (err: Error | null, planetName?: string) => void;
function getHomePlanetByIdTS(peopleId: number, callback: GetHomePlanetByIdCb) {
  request.get(`https://swapi.dev/api/people/${peopleId}`, (error: any, res: Response) => {
    if (error) {
      callback(error);
      return;
    }
    if (res.statusCode !== 200) {
      callback(new Error(`Http Error: [${res.statusCode}]`));
      return;
    }
    const person = JSON.parse(res.body) as Person;
    request.get(person.homeworld, (error: any, res: Response) => {
      if (error) {
        callback(error);
        return;
      }
      if (res.statusCode !== 200) {
        callback(new Error(`Http Error: [${res.statusCode}]`));
      }
      const planet = JSON.parse(res.body) as Planet;
      callback(null, planet.name);
    });
  });
}
```

## Make an async function that returns the name of the person (SWAPI - people) based on the id, but return an error when the call take to long.

```js
import request from 'request';

function getNameById(peopleId, timeout, callback) {
  let timerExpired = false;
  const timerId = setTimeout(() => {
    callback(new Error('timeout'));
    timerExpired = true;
  }, timeout);

  request.get(`https://swapi.dev/api/people/${peopleId}`, (err, res) => {
    clearTimeout(timerId);
    if (timerExpired) {
      return;
    }
    if (err) {
      callback(err);
      return;
    }
    if (res.statusCode !== 200) {
      callback(new Error(`Http Error: [${res.statusCode}]`));
    }
    const person = JSON.parse(res.body);
    callback(null, person.name);
  });
}

// ** TypeScript **/

interface Person {
  name: string;
  homeworld: string;
  height: string;
  // more available
}

type getNameByIdCb = (err: Error | null, name?: string) => void
function getNameByIdTS(peopleId: number, timeout: number, callback: getNameByIdCb) {
  let timerExpired = false;
  const timerId = setTimeout(() => {
    callback(new Error('timeout'));
    timerExpired = true;
  }, timeout);

  request.get(`https://swapi.dev/api/people/${peopleId}`, (error: any, res: Response) => {
    clearTimeout(timerId);
    if (timerExpired) {
      return;
    }
    if (err) {
      callback(err);
      return;
    }
    if (res.statusCode !== 200) {
      callback(new Error(`Http Error: [${res.statusCode}]`));
    }
    const person = JSON.parse(res.body) as Person;
    callback(null, person.name);
  });
}
```

---

## Promises

## Create a promised based expire function & test it

The timer should throw (or return) an Timeout error

```js
function expire(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeout);
  });
}

// TypeScript
function expireTS(time: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeout);
  });
}

// test your implementation
expire().catch(err => console.log(err.message));  // OUTPUT: Timeout
```

## Make an promised based function that returns the person with home planet (SWAPI) based on the personId

<!-- prettier-ignore -->
```js
import axios from 'axios';

type PersonWithHomeworld = Person & { planet: Planet };

function getPersonAndHomeWorldById(peopleId: number): Promise<PersonWithHomeworld> {
  return axios.get<Person>(`https://swapi.dev/api/people/${peopleId}`)
    .then(res => {
      const person = res.data;
      return Promise.all([person, axios.get<Planet>(person.homeworld)]);
    })
    .then(result => {
      const [person, res] = result;
      return {
        ...person,
        planet: res.data,
      };
    });
}

getPersonAndHomeWorldById(1)
  .then(person => {
    console.log(person.name);
    console.log(person.planet.name);
  });
```

## Make an promised based function that returns the name of the person (SWAPI - people) based on the id, but throws an error when the call take to long.

```js
import axios from 'axios';

function expire(timeout: number) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout Error'));
    }, timeout);
  });
}

// prettier-ignore
function getNameByIdP(timeout: number, peopleId: number): Promise<string> {
  return Promise.race([
    expire(timeout), 
    axios.get<any>(`https://swapi.dev/api/people/${peopleId}`)
  ]).then((result: any) => {
    const res: MyResponse<Person> = result;
    return res.data.name;
  });
}

getNameByIdP(2000, 1)
  .then(name => {
    console.log(name);
  })
  .catch(err => {
    console.log('ERROR', err.message);
  });
```

## Await

### Log 'done' after 1 second and 'finished' a second after that.

```js
console.log('> start');
async function action() {
  await timeout(1000);
  console.log('> done');

  await timeout(1000);
  console.log('> finished');
}

action().then(() => {
  console.log('--------');
});
```

## Make an async (async/await) function that returns the name of home planet (through SWAPI)based on the personId. Handle the error when an error occurs.

<!-- prettier-ignore -->
```js
import axios from 'axios';

type PersonAndPlanet = {
  person: Person;
  planet: Planet;
};

async function getPersonAndHomeWorldById_async(peopleId: number): Promise<PersonAndPlanet> {
  const personRes = await axios.get<Person>('https://swapi.dev/api/people/1');
  const person = personRes.data;
  const planetRes = await axios.get<Planet>(person.homeworld);
  const planet = planetRes.data;
  return {
    person,
    planet,
  };
}
```

## Get multiple persons (through SWAPI) by personId.

- Make the number of id's variable
- Provide a timeout
- Return an array of persons
- Except when one person is provided

Use axios as http library.
Reuse the promised based timer function

```js
import axios from 'axios';

async function getPersons(timeout, ...ids)> {
  const promises = ids.map(async id => {
    return axios.get(`https://swapi.dev/api/people/${id}`).then(res => res.data)
  });
  const results: any = await Promise.race([expire(timeout), Promise.all(promises)]);
  if (results.length === 1) {
    return results[0];
  }
  return results;
}

// typescript
function getPersons(timeout: number, id: number): Promise<Person>;
function getPersons(timeout: number, ...ids: number[]): Promise<Person[]>;
async function getPersons(timeout: number, ...ids: number[]): Promise<Person | Person[]> {
  const promises = ids.map(async id => {
    return axios.get<Person>(`https://swapi.dev/api/people/${id}`).then(res => res.data)
  });
  const results: any = await Promise.race([expire(timeout), Promise.all(promises)]);
  if (results.length === 1) {
    return results[0];
  }
  return results;
}

getPersons(1000, 1).then(person => {
  console.log(person.name);
});

getPersons(5000, 2, 3).then(persons => {
  persons.forEach(person => {
    console.log(person.name);
  });
});
```

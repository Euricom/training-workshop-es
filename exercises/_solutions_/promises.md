# Exercise Javascript - Promises/Callbacks

## Callbacks

### log 'done' after 1 sec

```js
// log 'done' after 1 sec
console.log('start');
function waitASecond('peter', (arg) => {
  console.log('done', arg);
})

function waitASecond(arg: string, cb: (arg: string) => void) {
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

function countDown(arg: string, count: number, cb: (arg: string, cnt: number, done: boolean) => void) {
  if (count > -1) {
    setTimeout(() => {
      cb(arg, count, count === 0);
      countDown(arg, --count, cb);
    }, 1000);
  }
}
```

## call SWAPI api get person name with id 1

```js
import request from 'request';

request.get('https://swapi.co/api/people/1', (error, res) => {
  console.log(JSON.parse(res.body).name);
});

OUTPUT: Luke Skywalker
```

## make an async function that returns the name of home planet (through SWAPI)based on the personId. Handle the error when an error occurs.

```js
import request from 'request';

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

function getHomePlanetById(peopleId: number, callback: (err: Error, planetName?: string) => void) {
  request.get(`https://swapi.co/api/people/${peopleId}`, (error: any, res: Response) => {
    if (error) {
      callback(error);
      return;
    }
    if (res.statusCode !== 200) {
      callback(new Error('Not Found'));
      return;
    }
    const person = JSON.parse(res.body) as Person;
    request.get(person.homeworld, (error: any, res: Response) => {
      if (error) {
        callback(error);
        return;
      }
      if (res.statusCode !== 200) {
        callback(new Error('Not Found'));
      }
      const planet = JSON.parse(res.body) as Planet;
      callback(null, planet.name);
    });
  });
}
```

## make an async function that returns the name of the person (SWAPI - people) based on the id, but return an error when the call take to long.

```js
import request from 'request';

interface Person {
  name: string;
  homeworld: string;
  height: string;
  // more available
}

function getNameById(peopleId: number, timeout: number, callback: (err: Error, name?: string) => void) {
  const timerId = setTimeout(() => {
    callback(new Error('timeout'));
  }, timeout);

  request.get(`https://swapi.co/api/people/${peopleId}`, (err, res) => {
    clearTimeout(timerId);
    if (err) {
      callback(err);
      return;
    }
    if (res.statusCode !== 200) {
      callback(new Error('notfound'));
    }
    const person = JSON.parse(res.body) as Person;
    callback(null, person.name);
  });
}
```

---

## Promises

### log 'done' after 1 second and start new timer for another second, but now promised based.

First: Build promised based timer

```js
function setTimeoutP(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
```

Second: OUTPUT:

```js
setTimeoutP(1000)
  .then(() => {
    console.log('done');
    return setTimeoutP(1000);
  })
  .then(() => {
    console.log('finished');
  });
```

## create a promised based wrapper around request and use it

```js
function httpGet(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      res.data = JSON.parse(res.body);
      resolve(res);
    });
  });
}

// use
httpGet('https://swapi.co/api/people/1').then(res => console.log(res.body.name));
```

## make an promised based function that returns the person with home planet (SWAPI) based on the personId

```js
function getPersonAndHomeWorldById(peopleId) {
  let person;
  return httpGet(`https://swapi.co/api/people/${peopleId}`)
    .then(res => {
      person = res.data;
      return httpGet(person.homeworld);
    })
    .then(res => {
      person.homeworld = res.data;
      return person;
    });
}

getPersonAndHomeWorldById(1).then(person => {
  console.log(person.name);
  console.log(person.homeworld.name);
});
```

## make an promised based function that returns the name of the person (SWAPI - people) based on the id, but throws an error when the call take to long.

```js
function expire(timeout) {
  return new Promise(resolve, reject) {
    setTimeout(() => {
      reject(new Error('timeout');)
    }, timeout)
  }
}

function getNameByIdP(timeout, peopleId) {
  return Promise.race([
    expire(timeout),
    httpGet(`https://swapi.co/api/people/${peopleId}`)
  ]).then(res => {
    return res.data.name;
  });
}

// use
getNameByIdP(1, 500)
  .then(person => {
    console.log('person:', person.name);
  })
  .catch(err => {
    console.error('ERROR', err.message);
  });
```

## Await

### log 'done' after 1 second and 'finished' a second after that.

```js
console.log('start');

await setTimeoutP(1000);
console.log('done');

await setTimeoutP(1000);
console.log('finished');
```

## make an async (async/await) function that returns the name of home planet (through SWAPI)based on the personId. Handle the error when an error occurs.

```js
async function getPersonAndHomeWorldById(peopleId) {
  const person = await httpGet('https://swapi.co/api/people/1');
  const planet = await httpGet(person.homeworld);
  return {
    ...person,
    homeworld: planet
  };
}
```

## get multiple persons (through SWAPI) by personId.

```js
function getPersons(timeout, ...ids) {
  const promises = ids.map(async id => {
    const res = httpGet(`https://swapi.co/api/people/${id}`);
    return res.body;
  });
  const results = Promise.race([expire(timeout), Promise.all(promises)]);
  if (results.length === 1) {
    return results[0];
  }
  return results;
}
```

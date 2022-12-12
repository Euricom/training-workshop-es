# Exercise Javascript - Async

## Callbacks

### Write a function that return an argument after 1 second.

```js
console.log('start');
waitASecond('peter', (arg) => {
  console.log('done', arg);
})

function waitASecond(arg, cb) {
  // implement me
}
```

### Write a countdown function

Count down the seconds

```js
console.log('start');
countDown('peter', 5, (arg, cnt, end) => {
  console.log(`ready ${arg}: `, cnt);
  if (end) {
    console.log(`done`);
  }
});

function countDown(arg, cnt, cb) {
  // implement me
}
```

Output:

```

start
ready peter: 5
ready peter: 4
ready peter: 3
ready peter: 2
ready peter: 1
done
```

## Call SWAPI api get person name with id 1

https://swapi.dev/api/people/{peopleId}

Use [request](https://github.com/request/request) module.

```js
// from SWAPI api get person with id 1
import request from 'request';

function getPersonName(peopleId, callback) {
  //
  // implement me
  //
}

getPersonName(1, (name) => {
  console.log('name', name);
});
```

## Make an async function that returns the name of home planet (through SWAPI) based on the personId. Handle the error when an issue (http errors & network down) occurred. 

```js
function getHomePlanetById(peopleId, callback) {
  //
  // implement me
  //
}

getHomePlanetById(1, (err, planet) => {
  if (err) {
    return console.log(err);
  }
  console.log(planet);
});
```

You need to make two api calls

    https://swapi.dev/api/people/{peopleId}
    https://swapi.dev/api/planets/{homeWorldId}

## Make an async function that returns the name of the person (SWAPI - people) based on the id, but return an error when the call take to long.

```js
function getNameById(peopleId, timeout, callback) {
  //
  // implement me.
  //
}

// use the function
getNameById(1, 1000, (err, name) => {
  if (err) {
    return console.log(err);
  }
  console.log(name);
});
```

---

## Promises

## Create a promised based expire function & test it

The timer should reject with an timeout error

```js
function expire(time) {
  //
  // implement me
  // return a Promise!
  //
}

// test your implementation
```

## Make an promised based function that returns the person with the home planet ([SWAPI API](https://swapi.dev/)). Also handles the http and request errors. Use 'axios' of 'fetch'.

```js
function getPersonWithHomeWorldById(peopleId) {
  //
  // implement me
  //
}

getPersonWithHomeWorldById(1)
  .then((person) => {
    console.log(person.name);
    console.log(person.planet.name);
  })
  .catch(err => {
    console.log(err)
  })
```

## Make an promised based function that returns the name of the person (SWAPI - people) based on the id, but throws an error when the call take to long. Re-use the Expire function

Use the HttpGet function from the previous exercise.
Re-use the promise based timer function.

```js
function getNameByIdP(timeout, peopleId) {
  //
  // implement me
  //
}
```

## Async/Await

## Make an async (async/await) function that returns the name of home planet (through SWAPI) based on the personId. Handle the error when an error occurs.

Use axios as http library.
Re-use the Expire function

```js
async function getPersonWithHomeWorldById(personId) {
  // implement me
}

(async function() {
  const person = await getPersonWithHomeWorldById(1);
  console.log(person.name);
  console.log(person.planet.name);
})()

```

## Get multiple persons (through SWAPI) by its id

- Make the number of id's variable
- Provide a timeout
- Return an array of persons
- Except when one person is provided

Use axios as http library.
Reuse the promised based timer function

```js
async function getPersons(/* add here your arguments */) {
  // implement me
}
```

```js
(async function() {
  const timeout = 500;
  const persons = await getPersons(timeout, 1, 2, 3);
  for (let person of persons) {
    console.log(person.name);
  }
})()
```

```js
(async function() {
  const person = await getPersons(500, 1);
  console.log(person.name);
})()
```

---
title: Euricom - Unit Testing
theme: euricom
lineNumbers: true 
---

# JavaScript Unit Testing
## with Jest & vitest

<img src="/lack-of-testing.jpeg" class="h-70 rounded-3xl" /><br/>

<small>
Copyright (©️) 2019-2021 Euricom
</small>

---

## Testing Levels

<img src="/test-patterns.png"  class="h-100">

Write tests. Not too many. Mostly integration

---

## Framework for Testing 2022

<img src="/testing-ranking.png" >

---
layout: section
---

# Getting started

Easy startup with Jest and vitest

---

# jest

```bash
# install jest
$ yarn add jest --dev
```

```js
// calc.js (commonjs)
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

```js
// calc.spec.js
const sum = require('./calc');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

> There is no native ESM or TypeScript support, you need to add additional config.

See 'starter/ts-node' for full TypeScript & ESM support.

---

# vitest

```bash
# install vitest
$ yarn add vitest --dev
```

```js
// calc.js (esm)
export function sum(a, b) {
  return a + b;
}

```

```js
// calc.spec.js
import { sum } from "./sum";
import { test, expect } from "vitest";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

Vitest has out of the box support for ESM & TypeScript. 

---
layout: section
---

# Matchers

Validate your test

---

# Using Matchers

toBe (===)

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

toEqual (checks every property)

```js
test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
```

---

# Using Matchers

Truthiness

```js
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 1;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).toBeTruthy();
  expect(z).not.toBeFalsy();
});
```

===

# Using Matchers

Numbers

```js
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  expect(value).not.toBe(0.3); // It isn't! Because rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```

---

# Using Matchers

Strings & Arrays

```js
test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

Arrays

```js
const shoppingList = ['kleenex', 'trash bags', 'beer'];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
});
```

---

# throw error Matchers

```js
const testMe = (a,b,c) => throw new ConfigError('bad config');

test('compiling android goes as expected', () => {
  const action = () => testMe(1, 2, 3);
  expect(action).toThrow();
  expect(action).toThrow(ConfigError);

  // You can also use the exact error message or a regexp
  expect(action).toThrow('bad config');
  expect(action).toThrow(/bad/);

  // shorthand: warp a arrow function with arguments
  expect(() => testMe(1, 2, 3)).toThrow();
});
```

And More

- [Jest expect api](https://facebook.github.io/jest/docs/expect.html)
- [vitest expect api](https://vitest.dev/api/#expect)

---
layout: section
---

# Organize

---

# Group you tests

```js
describe('myCalculator', () => {
    test('add ...', () => {
        ...
    })
    test('substract ...', () => {
        ...
    })
})
```

---

# Setup and teardown

```js
beforeAll(() => {
  // setup at beginning of file
});

beforeEach(() => {
  // setup before each test
});

afterEach(() => {
  // cleanup after each
});

afterAll(() => {
  // file cleanup
});
```

---

# Setup and teardown

Scoped setup/teardown

```js
describe('Calculator', () => {
  beforeEach(() => {});

  describe('Sum', () => {
    beforeEach(() => {});

    test('2 number', () => {});
    test('number + string', () => {});
  });

  describe('Substract', () => {
    test('2 numbers', () => {});
  });
});
```

---

# Unit Test Template (AAA)

```js
describe('MyService', () => {
  test('action with user', () => {
    // Arrange
    const user = {
      name: 'ikke',
    };
    const service = new MyService({ mode: 'fast' });

    // Act
    const result = service.action(user);

    // Assert
    expect(result).toBe('end deal');
  });
});
```

---

## Filtering

```js
describe.only('myCalculator', () => {
    test.skip('add ...', () => {
        ...
    })
    test('substract ...', () => {
        ...
    })
})
```

| Filter        | Desc                      |
| ------------- | ------------------------- |
| describe.only | only this block           |
| describe.skip | exclude/ignore this block |
| test.only     | only run this test        |
| test.skip     | exclude/ignore this test  |

---
layout: section
---

# Async Testing

Most of your Javascript is asynchronous

---

### Use async/await

```js
export function setTimerP(timeout, arg) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(arg);
    }, timeout);
  });
}
```

Unit Test

```js
import { find } from './myService';

describe('setTimerP', () => {
  test('return arg', async () => {
    const data = await setTimerP(100, 'hello');
    expect(data).toBe('hello');
  });
});
```

---

### Use async/await - verify error

```js
export function setTimerP(timeout, arg) {
  // throw error when timeout is negative
  if (timeout < 0) return Promise.reject(new Error('timeout must be > 0'));
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(arg);
    }, timeout);
  });
}
```

Unit Test

```js
describe('setTimerP', () => {
  test('return arg', async () => {
    expect.assertions(1);
    try {
      await setTimerP(0, 'hello');
    }
    catch(err) {
      expect(err.message).toBe('timeout must be > 0');
    }
  });
});
```

---
layout: section
---

# Mocking

During unit tests, don't use real external dependencies (api, DB, ...)

---

# Mocking 

A use case

```js
// service.ts
import axios from 'axios';

export async function getPersonById(peopleId) {
  try {
    const res = await axios.get(`https://swapi.dev/api/people/${peopleId}`);
    return res.data;
  }
  catch(err) {
    if (err.status === 404) return null;
    throw new Error('Error while fetching person');
  }
}
```

---

# Mocking - Test resolve

```ts
import axios from 'axios';
import { getPersonById } './service';

test('getPersonById success', async () => {
  // arrange: mock the get function and return a promise that resolves to the person
  const getMock = jest.spyOn(axios, 'get').mockResolvedValue({
    data: {
      name: 'peter'
    },
  });

  // act
  const person = await getPersonById(5);

  // assert
  expect(person).not.toBeNull();
  expect(getMock).toHaveBeenCalledWith('https://swapi.dev/api/people/5')
})
```

---

# Mocking - Test reject

```ts
import axios from 'axios';
import { getPersonById } './service';

test('getPersonById 404 failure', async () => {
  // arrange: mock rejected value (error)
  const error = new Error('Not Found');
  error.status = 404;
  const getMock = jest.spyOn(axios, 'get').mockRejectedValue(error);

  // act
  const person = await getPersonById(99999);

  // assert
  expect(person).toBeNull();
})
```

---

# Spy vs Mock

- A Spy can monitor behavior but **also calls** the original function

```js
// create a spy
const spy = jest.spyOn(service, 'myAction');
```

- A Mock can monitor behavior and return a specific value

```js
// create a (jest) mock
const mock = jest.spyOn(service, 'myAction')
                 .mockResolvedValue(1234);
```

- A Mock can monitor behavior and **replaces** the original function

```js
// create a (vitest) mock with custom implementation
const mock = vi.spyOn(service, 'myAction')
                 .mockImplementation(() => 1234);
```

---

# Mock Functions

Create a standalone mock function

```js
// create the mock
const myMock = jest.fn();  // by Jest
const myMock = vi.fn();    // by vitest

// you can call the function
// it doesn't do anything & doesn't return anything
myMock('1');

// but we can interrogate what is happened on it
expect(myMock).toBeCalled();
expect(myMock).toBeCalledWith('1');
expect(myMock.mock.calls.length).toBeGreaterThan(0);
expect(myMock.mock.calls[0][0]).toBe('1'); // first call, first argument
```

---

# Mock functions 

With custom implementation

```js
// throw an error
jest.fn().mockImplementation(() => { throw new Error('bad') })
jest.fn(() => { throw new Error('bad') })

// return a resolved promise
jest.fn().mockImplementation(() => Promise.resolve(100)))
jest.fn(() => Promise.resolve(100)))
jest.fn().mockReturnValue(Promise.resolve(100));
jest.fn().mockResolvedValue(100);

// return a rejected promise
jest.fn().mockRejectedValue(new Error('bad bad'));
jest.fn(() => Promise.reject(new Error('bad bad'))))

// call a callback
jest.fn(cb => cb(null, true));
```

---

# Verify mock expectations

```js
const myMock = jest.fn();
```

```js
// any
myMock('1');
expect(myMock).toHaveBeenCalled();
expect(myMock).toHaveBeenCalledWith('1');
expect(myMock).toHaveBeenCalledWith(expect.anything());
expect(myMock).toHaveBeenCalledWith(expect.any(String));
```

<!-- prettier-ignore -->
```js
// string matching
const str = 'The quick brown fox...';
myMock(str);
expect(myMock).toHaveBeenCalledWith(
  expect.stringContaining('brown')
);
expect(myMock).toHaveBeenCalledWith(
  expect.stringMatching(/^The quick/)
);
```

---

# Verify mock expectations

<!-- prettier-ignore -->
```js
// array containing
const a = [1, 2, 3];
myMock(a);
expect(myMock).toHaveBeenCalledWith(
  expect.arrayContaining([1, 2])
);
```

<!-- prettier-ignore -->
```js
// object containing
const obj = { name: 'john', id: 123 };
myMock(obj);
expect(myMock).toHaveBeenCalledWith(
  expect.objectContaining({
    name: 'john',
    id: expect.any(Number)
  })
);
expect(obj).toEqual(
  expect.objectContaining({ name: 'john' })
);
```

---
layout: image-right
image: yoga1.jpg
---

# Exercise - mocking

Test the email system

```js
const mailSystem = {
  sendWelcomeMail(to, subject, model) {
    const body = 
      `Hello ${model.name}, with this mail I...`;
    const mail = {
      toAddress: to,
      fromAddress: this.fromAddress,
      subject,
      body,
    };
    smtpTransport.send(mail);
  },
};
```

See exercise [MailSystem](https://github.com/Euricom/training-bootcamp-2022/blob/main/topics/javascript/exercises/unit-testing.md)

---
layout: image-left
image: https://www.mensjournal.com/wp-content/uploads/mf/sprinting_running_cardio_main.jpg?w=1000&h=563&crop=1&quality=78&strip=all
---

# Exercise - async

Test the expire function

```ts
function expire(timeout) {
  // ...
}
```

Test the getContactById function

```ts
function getContactById(peopleId) {
  // ...
}
```

See exercise [Async Testing](https://github.com/Euricom/training-bootcamp-2022/blob/main/topics/javascript/exercises/unit-testing.md)








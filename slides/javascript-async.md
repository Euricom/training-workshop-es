---
theme: euricom
lineNumbers: true 
---

# Javascript Async

<!-- <img src="async.png" class="h-40 rounded-3xl" /><br> -->

<div class="absolute bottom-10">
  <small>
  Copyright (c) 2017-2022 Euricom nv.
  </small>
</div>

---
layout: iframe-right
url: https://www.youtube.com/embed/8aGhZQkoFbQ
---

# The event loop

<img src="/eventloop2.png" class="h-80">

[What the heck is the event loop anyway](https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=975s)

---
layout: section-dark
background: /calm5.jpeg
---

# Callbacks

## Call me when it's ready

---

## Callbacks

#### setTimeout

```js
setTimeout(() => {
  console.log('I waited for 5 sec');
}, 5000);
```

#### event handler

```js
const button = document.querySelector('#pushy');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
```

#### read file in nodeJS

```js
var fs = require('fs');
fs.readFile('DATA', 'utf8', (err, contents) => {
  if (err) {
    console.log('failed to read file');
    return;
  }
  console.log(contents);
});
```

---

# Callback - Pyramid of Doom

```js
loadScript('1.js', function (error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function (error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function (error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...continue after all scripts are loaded (\*)
          }
        });
      }
    });
  }
});
```

---
layout: section-dark
background: /calm2.jpeg
---

# Promises

## Call me when it's ready

---

# Promise 

```js
// call a promise based api
import axios from 'axios';
const promise = axios.get('/user?ID=12345');
```

```js
// use the promise
promise
  .then((result) => {
    console.log(result); // output: 'Success!'
  })
  .catch((error) => {
    /* error == 'Failure!' */
  });
```

The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

---
layout: big-points
---

# State of a promise

A Promise is in one of these states:

- **Pending**: initial state, neither fulfilled nor rejected.
- **Fulfilled**: the action in the promise succeeded
- **Rejected**: the action in the promise failed

---

## Create & resolve

```js
const promise = new Promise((resolve, reject) => {
  // the function is executed automatically when the promise
  // is constructed

  // after 1 second signal that the job is done with
  // the result "done"
  setTimeout(() => resolve('done'), 1000);
});
```

<img src="/promise-resolve.png">

---

## Create & reject

```js
const promise = new Promise(function (resolve, reject) {
  // after 1 second signal that the job is finished
  // with an error
  setTimeout(() => reject(new Error('Whoops!')), 1000);
});
```

<img src="/promise-reject.png">

---
class: code-small
---

# Consumers: then, catch, finally

A Promise object serves as a link between the executor and the consuming functions, which will receive the result or error. Consuming functions can be registered (subscribed) using methods .then, .catch and .finally.

```js
const promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve('done!'), 1000);
});
promise.then((result) => {
  // runs when the promise is resolved
  console.log(result); // output: 'done!'
});
promise.catch((error) => {
  // runs when the promise is rejected
});
promise.finally(() => {
  // runs when the promise is settled,
  // doesn't matter successfully or not
});
```

---

# Consumers chaining

By default, the promise handler will return the current promise, <br/> so you can chain the handlers

```js
const promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve('done!'), 1000);
});

promise
  .then((result) => {
    // runs when the promise is resolved
    console.log(result); // output: 'done!'
  })
  .catch((error) => {
    // runs when the promise is rejected
  })
  .finally(() => {
    // runs when the promise is settled,
    // doesn't matter successfully or not
  });
```

---
layout: image-right
image: 'https://cdn.materialdistrict.com/wp-content/uploads/2018/06/sustainable-yoga-mats-for-international-day-of-yoga-05.jpg'
cols: 1-1
---

# Exercise - Create a promise based timer

```js
setTimeoutP(1000).then(() => {
  console.log('it is done');
});

function setTimeoutP(ms) {
  // TODO: implement me
}
```

---

# Chaining promises

You can return a value or new promise inside the handler

```js
setTimeoutP(1000)
  .then(() => {
    console.log('first');
    return setTimeoutP(2000);
  })
  .then(() => {
    console.log('second');
    // by returning a value
    // its wrapped in a new promise
    return 'happy';
  })
  .then((result) => {
    console.log(result); // output: happy
  });
```

---

# Chaining promises

Promises can be passed over functions

```js
function action(timeout) {
  // return the promise for continues handling
  return setTimeoutP(timeout)
    .then(() => {
      console.log('first');
      return setTimeoutP(timeout * 2);
    })
    .then(() => {
      console.log('second');
      return 'happy';
    });
}

action(1000).then((result) => console.log(result)); // output: happy
```

---

## Chaining promises - Sample

```js
// GOOD
loadCustomerByName('toronto')
  .then((customer) => {
    return loadOrderById(customer.id);
  })
  .then((order) => {
    console.log('tot-price', order.total);
  });

// BAD (to avoid)
loadCustomerByName('toronto').then((customer) => {
  loadOrderById(customer.id).then((order) => {
    console.log('tot-price', order.total);
  });
});
```

---

## Direct resolved/rejected

```js
// resolved promise
const promise = Promise.resolve('hello');

// rejected promise
const promise = Promise.reject(new Error('bad bad'));
```

```js
function asyncAction(arg) {
  if (!arg) {
    return Promise.reject('bad bad');
  }
  return getCustomer(arg); // get customer returns an promise
}
```

---
slideTitle: Throw or reject
titleRow: true
cols: 1-1
---

```js
// reject an promise
const p = new Promise((resolve, reject) => {
  reject(new Error('bad bad!'));
});
```

::right::

```js
// throw the error inside a promise 
// handler
promise.then((result) => {
  if (result.notOK) {
    throw new Error('bad bad!');
  }
});

// is identical to
promise.then((result) => {
  if (result.notOK) {
    return Promise.reject(
      new Error('bad bad!')
    );
  }
});
```

---

# Combine promises - Promise.all

Wait for all promises to complete

```js
Promise.all([promise1, promise2])
  .then((results) => {
    // Both promises resolved
    // Promise.all waits until both are finished
    const resultPromise1 = results[0];
    const resultPromise2 = results[0];
  })
  .catch((error) => {
    // One of the promises was rejected
  });
```

using array destructering

```js
Promise.all([promise1, promise2]).then((results) => {
  // Both promises resolved
  const [resultPromise1, resultPromise2] = results;
});
```

---

# Combine promises - Promise.race

Resolves when the first promise resolves

```js
Promise.race([promise1, promise2])
  .then((resultFirstPromise) => {
    // Called when the first promise resolves,
    // the result of the second promise is lost
  })
  .catch((error) => {
    // One of the promises was rejected
  });
```

---
layout: image-left
image: 'https://47h07141n4wr3s4gyj49ii1d-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/Beautiful-Reverse-Warrior-ot-Sunset-on-Rock-over-Ocean-copy-1-e1517104262553.jpeg'
cols: 1-1
---

## Exercise - Promises

1. Create a promised based expire function & test it
2. Make an promised based function that returns the person with the home planet (SWAPI)
3. Make an promised based function that returns the name of the person (SWAPI - people) based on the id, but throws an error when the call take to long.

More details see: 

- [Async Exercises](https://github.com/Euricom/training-bootcamp-2022/blob/master/topics/javascript/exercises/async.md) 
 (promises)

---
layout: section-dark
background: /calm1.jpeg
---

## Async/await

> Async but in a sync way

---
slideTitle: from Promise to Async/await
titleRow: true
cols: 1-2
---

```js
function getCustomers() {
  return axios
    .get('/api/customers')
    .then((res) => {
      customers = res.data;
      return customers;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}
```

::right::

```js
async function getCustomers() {
  try {
    const res = await axios.get('/api/customers');
    return res.data;
  } catch (error) {
    console.log(err);
    return [];
  }
}
```

---

# Combining async calls

Chaining multiple calls

```js
async function getCustomerFromOrder(orderId) {
  const resOrder = await axios.get(`/api/orders/${orderId}`);
  const resCustomer = await axios.get(`/api/customer/${resOrder.data.customerId}`);
  return resCustomer.data;
}
```

Wait for multiple

```js
async function getCustomerById(cust1, cust2, cust3) {
  const result = await Promise.all(
    axios.get(`/api/customer/${cust1}`),
    axios.get(`/api/customer/${cust2}`),
    axios.get(`/api/customer/${cust3}`),
  );
  return result.map((res) => res.data);
}
```

---
layout: image-right
image: 'https://cdn.materialdistrict.com/wp-content/uploads/2018/06/sustainable-yoga-mats-for-international-day-of-yoga-05.jpg'
cols: 1-1
---

## Exercise - Async/Await

1. Make an async (async/await) function that returns the name of home planet (through SWAPI) based on the personId. Handle the error when an error occurs.
2. Get multiple persons (through SWAPI) by its id
  
More details see:

- [Async Exercises](https://github.com/Euricom/training-bootcamp-2022/blob/master/topics/javascript/exercises/async.md) (async/await)

---

## Resources

- [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ&list=RDCMUCzoVCacndDCfGDf41P-z0iA&index=4)
- [Further Adventures of the Event Loop](https://www.youtube.com/watch?v=u1kqx6AenYw)
- [Jake Archibald: In The Loop](https://www.youtube.com/watch?v=cCOL7MC4Pl0&t=0s)
- [Asynchrony: Under the Hood](https://www.youtube.com/watch?v=SrNQS8J67zc)


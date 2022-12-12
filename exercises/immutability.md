## Immutability

Mutate the following object

```js
import deepfreeze from 'deep-freeze';

let obj = { name: 'peter', age: 25 };
deepfreeze(obj);

// Set the age to 52
```

Add an element to the array

```js
const ar = [12, 33, 999];
deepfreeze(ar);

// Add the number 1000 to the array
```

Remove an element from the array

```js
let ar = [{ name: 'jane' }, { name: 'john' }, { name: 'ike' }];
deepfreeze(ar);

// Remove john from the array
```

Update an element in the array

```js
let ar = [
  { name: 'jane', age: 12 },
  { name: 'john', age: 22 },
  { name: 'ike', age: 1 },
];
deepfreeze(ar);

// Set the age of ike to 20
```

Sort the following array

```js
const ar = ['jane', 'ann', 'ike'];
deepfreeze(ar);

// Sort the list of names
```

Write a function to change the zip code (to 2000) of the iPhone order

```js
const customer = {
  name: 'google',
  order: {
    date: '12/01/2000',
    items: [
      {
        id: 1,
        name: 'iPhone',
        price: 738,
        address: {
          city: 'antwerp',
          zip: '1000',
        },
      },
      {
        id: 2,
        name: 'MacBook Pro',
        price: 2345,
        address: {
          city: 'antwerp',
          zip: '2000',
        },
      },
    ],
  },
};
```

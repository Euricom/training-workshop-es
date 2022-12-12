## Immutability

Mutate an object

```js
let obj = { name: 'peter', age: 25 };
deepfreeze(obj);

// set the age to 52

// ES6
obj = Object.assign({}, obj, {
  age: 52,
});

// ES8
obj = {
  ...obj,
  age: 52,
};
```

Add an element to the array

```js
let ar = [12, 33, 999];
deepfreeze(ar);

// Add the number 1000 to the array
ar = [...ar, 1000];
```

Remove an element from the array

```js
let ar = [{ name: 'jane' }, { name: 'john' }, { name: 'ike' }];
deepfreeze(ar);

// remove john from the array
ar = ar.filter((item) => item.name !== 'john');
```

Update an element in the array

```js
let ar = [
  { name: 'jane', age: 12 },
  { name: 'john', age: 22 },
  { name: 'ike', age: 1 },
];
deepfreeze(ar); // only freeze the array, not the objects in the array

// set the age of ike to 20
ar = ar.map((item) => (item.name == 'ike' ? { ...item, age: 20 } : item));
```

Sort the following array

```js
const ar = ['jane', 'ann', 'ike'];
deepfreeze(ar);

// Sort the list of names
const sortedArray = [...ar].sort();
```

Write a function to change the zip code (to 2000) of the iPhone order

```js
import deepfreeze from 'deep-freeze';

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
deepfreeze(customer);

function fixZipCode(source, itemName) {
  return {
    ...source,
    order: {
      ...source.order,
      items: source.order.items.map((item) => {
        if (item.name === itemName) {
          return {
            ...item,
            address: {
              ...item.address,
              zip: '2000',
            },
          };
        }
        return item;
      }),
    },
  };
}

const updatedCustomer = fixZipCode(customer, 'iPhone');
```

---
title: Euricom - Modern JavaScript
theme: euricom
lineNumbers: true
---

# Modern Javascript 

<img src="/modern_javascript.png" class="h-80 rounded-3xl" /><br/>

<div class="absolute bottom-10">
  <small>
  Copyright (c) 2017-2022 Euricom nv.
  </small>
</div>

---
layout: section-dark
background: /calm1.jpeg
---

# Modern Language Features

## what you should know

---

# Default Arguments


```js
const myFunction = function (a, b, c) {
  a = a || 10;
  b = b || 5;
  c = c || 8;
  return a * b * c;
};
```

```js
const myFunction = function (a = 10, b = 5, c = 8) {
  return a * b * c;
};
```

```js
const INITIAL_STATE = { ... }
const myFunction = function(state = INITIAL_STATE, action){
    ...
};
```


---

# Rest operator

```js
// ES5: take all arguments
function join() {
  const arg = Array.prototype.slice.call(arguments);
  const separator = arg[0];
  arg.shift();
  return arg.join(separator);
}
console.log(join('//', 'one', 'two', 'three'));
```

```js
// ES6+: easy
function join(separator, ...values) {
  return values.join(separator);
}
```

---

# Spread operator

```js
let array = [0, 1, 2];
const myArray = [`🤪`, `🐻`, `🎌`];
const yourArray = [`🙂`, `🤗`, `🤩`];
const number = 12;
```

```js
// old way
const copyOfArray = array.splice(0);
const extendedArray = myArray.concat(yourArray);

// es6 way
const copyOfArray = [...array];
const extendedArray = [...array, number];
const concatenatedArray = [...myArray, ...yourArray];
const fn = (arg1, arg2, arg3) => {
  console.log(arg1, arg2, arg3);
};
fn(...array); // 0  1  2
```

---

# Object spread operator

<!-- prettier-ignore -->
```js
const myObject = { id: 12345, name: 'abc' };

const newObject = {
  ...myObject,     // copy all properties
  id: 99999,       // replace property
  city: 'antwerp', // add property
};
```

---

# Object Destructuring

```js
const config = {
  url: 'www.google.com/api',
  data: 'some value',
  methodType: 'POST',
};
```

```js
// destructor object to variables
const { url, data } = config;

// or
function action({ methodType }) {
  console.log(methodType);
}
action(config);
```

---

# Array Destructuring

Array destructuring: uses an iterator to get to the elements of a source

```js
const thing = ['Table', 'Chair', 'Fan'];
const [a, b, c] = thing;
// a = 'Table', b = 'Chair', c = 'Fan'

// with spread operator
const [x, ...y] = 'abc';
// x = 'a',  y = ['b', 'c']

// with default values
const [a = 40, b = 4, c = 9] = [1, 23];
// a = 1, b = 23, c = 9

// ignore some
const [a, , b] = ['Lordy', 'Crown', 'Roses'];
// a = 'Lordy', b = 'Roses'
```

---

# Optional Chaining (?.)

#### Given

```js
const please = {
  make: {
    it: {
      stop: false,
    },
  },
}
```

#### Logical AND operator

```js
if (please && please.make && please.make.it && please.make.it.stop) {
  // ...
}
```

#### Use Optional Chaining

```js
if (please?.make?.it?.stop) {
  // ...
}
```

---

## Nullish Coalescing (??)

#### Using a Logical OR

```js
const input = { duration: 1 };
const duration = input.duration || 500;

// what when duration is '0' (zero)
```

#### Improved with Nullish Coalescing

```js
// only overrides undefined or null
const duration = input.duration ?? 500;
```

---

## Dynamic import

Static import

```js
import enLocale from './l10n/en.json';
import frLocale from './l10n/fr.json';
import nlLocale from './l10n/nl.json';

if (language == 'fr') {
  app.l10n.use(frLocale);
}
```

Dynamic import

```js
import(`./l10n/${language}.json`)
  .then((locale) => app.l10n.use(locale))
  .catch((err) => app.reportError(err));
```

A dynamic import returns a promise.

---

# Decorators

```js
@DisplayName('Auto')
class MyClass {
  // ...
}

function Annotation(target) {
  target.annotated = true;
}

function DisplayName(name) {
  return function (target) {
    target.displayName = name;
  };
}

console.log(MyClass.displayName); // 'Auto'
```

Decorators can be placed on classes, methods, properties, parameters values.

> Decorators are not 'yet' a part of ECMAScript (but it's available in TypeScript)

---
layout: section-dark
background: /calm2.jpeg
---

# Awkward Language feature

---

## null, undefined, undeclared

null & undefined

```js
let val; // undefined: declared but not value
let val = undefined; // undefined
let val = null; // null value
```

undeclared

```
console.log(unknown)
```

ReferenceError: unknown is not defined (!= undefined)

---

## Comparison Operators

```js
console.log(3 == "3");          // true
console.log(1 == true);         // true
console.log('' == false);       // true
console.log('23' == true);      // true
console.log('true' == true);    // true
console.log('false' == false);  // false

console.log(3 === "3");         // false
```

See [http://dorey.github.io/JavaScript-Equality-Table/](http://dorey.github.io/JavaScript-Equality-Table/)

> Always use '===' unless you have a good reason to use '=='

---
slideTitle: Truthy & Falsy
---

# Truthy & Falsy

```js
// what about following conditions check
if (value) {
    ...
}
```
<p></p>

<div class="grid grid-cols-[1fr,1fr] gap-x-3" >

<div>

### Truthy

```js
true
{}
[]
"some string"
3.14
new Date()
```

</div>

<div>

### Falsy

```js
false
0  // (zero)
"" // (empty string)
null
undefined
NaN 
```

</div>

</div>

---
slideTitle: Typeof
titleRow: true
cols: 1-2
---

Returns type as string

```js
typeof 89; // 'number'
typeof true; // 'boolean'
typeof 'some text'; // 'string'
typeof { name: '123' }; // 'object'
typeof function () {}; // 'function'

let val;
typeof val; // 'undefined'
```

::right::

Be aware of

```js
typeof null; // 'object'
typeof []; // 'object'
```

Check if we have an object

<div class="code-small">

```js
typeof variableName === 'object' && variableName !== null
```

</div>

Check if we have an array

```js
Array.isArray(variableName)
```

---

# Floating point

Be aware that

```js
console.log(0.1 + 0.2 == 0.3); // false!
console.log(Math.pow(0.7, 2)); // 0.48999999999999994
```

Better to use

```js
// convert to integer
console.log(0.1 * 100 + 0.2 * 100 == 0.3 * 100); // true!
console.log(Math.pow(0.7 * 10, 2) / 100) // 0.49
```

Or use the following

* [decimal.js](https://www.npmjs.com/package/decimal.js)
* [big.js](https://www.npmjs.com/package/big.js)

---

## NaN

the value 'NaN' is returned on an invalid calc or conversion

```js
// if a calculation or conversion is not a number
Number('oops'); // NaN
0 / 0; // NaN
```

be aware that

```js
typeof NaN === 'number'; // true
NaN === NaN; // false
NaN !== NaN; // true
```

better to use

```js
const a = 0 / 0;
isNaN(a); // true
Object.is(a, NaN); // true
```

---
layout: section-dark
background: /calm3.jpeg
---

# Immutability in JavaScript

---

## Concept of Immutability

Don’t change, create a new one

```js
const obj = { name: 'john' };

// BAD (mostly)
function updatedName(obj, newName) {
  obj.name = newName;
  return obj;
}

// GOOD
function updatedName(obj, name) {
  // a pure function never change the input arguments
  return {
    ...obj, // spread operator is your friend
    name,
  };
}

const updatedObj = updatedName(obj, 'rob');
```

---

# Pure Function

A 'Pure' Function is a function (a block of code) that always returns the same result if the same arguments are passed. It does not depend on any state or data change during a program’s execution. Rather, it only depends on its input arguments.

```js
function calculateGST( productPrice ) {
    return productPrice * 0.05;
}
```

<div v-click>

Is this function pure?

```js
const tax = 20;
function calculateGST( productPrice ) {
    return productPrice * (tax / 100) + productPrice;
}
```

</div>

<div v-click>

If you guessed that it is isn’t, you are right! 

</div>


---

# Immutable changes

```js
// object
const obj = { name: 'Bob' };
const newObj = { ...obj, name: 'John' };
const otherObj = Object.assign(obj, { name: 'John' });

// array push
const array = [1, 2, 3];
const newArray = [...array, 12]; // [1, 2, 3, 4]

// array remove by id
const array = [
  { id: 1, name: 'Bob' },
  { id: 2, name: 'John' },
];
const newArray = array.filter((item) => item.id != 1);
```

---

# Immutable changes - Array

```js
const array = [
  { id: 1, name: 'Bob' },
  { id: 2, name: 'John' },
];

// change entry by id
const newArray = array.map((item) => {
  if (item.id === 2) {
    return { ...item, name: 'Frea' };
  }
  return item;
});
```

---
layout: image-left
image: yoga1.jpg
class: code-small
---

## Exercise - Immutability

```js
import deepfreeze from 'deep-freeze';

const ar = [12, 33, 999];
deepfreeze(ar);
// TODO: Add the number 1000 to the array

let ar = [{ name: 'jane' }, { name: 'john' }, { name: 'ike' }];
deepfreeze(ar);
// TODO: Remove john from the array

let ar = [
  { name: 'jane', age: 12 },
  { name: 'john', age: 22 },
  { name: 'ike', age: 1 },
];
deepfreeze(ar);
// TODO: Set the age of ike to 20
```

See [Immutability](https://github.com/Euricom/training-bootcamp-2022/blob/master/topics/javascript/exercises/immutability.md)

---
layout: section-dark
background: /calm4.jpeg
---

# Objects, Strings and Arrays

---

## Object functions

Common used object functions

```js
const a = { name: 'peter' };
const b = Object.assign({}, a, { age: 12 });
// { name: 'peter', age: 12 }

const b = { ...a, age: 99 };
// { name: 'peter', age: 99 }

Object.keys({ name: 'peter', age: 12 });
// [ 'name', 'age' ]

Object.entries({ name: 'peter', age: 12 });
// [ ['name', 'peter'], ['age', 12] ]
```

---

## Object functions

Common used object functions

```js
NaN == NaN; // false
isNan(NaN); // true
Object.is(number, NaN); // true

// array.at - new in ES2022
const arr = [10,20,30,40];
arr.at(1);   // 20 = arr[1]
arr.at(-1);  // 40
```

---

## String functions

```js
'abc '.trim(); // 'abr'
'hello world'.includes('world'); // true
'hello world'.startWith('hello'); // true
'hello world'.indexOf('world'); // 6 - old style (ES5)

'aabbcc'.replace('b', '.');
// 'aa.bcc'

'aabbcc'.replaceAll('b', '.'); // new in ES2021
// 'aa..cc'
```

---

## Array functions

```js
const companies = [
  { id: 1, name: 'Acme', category: 'finance' },
  { id: 4, name: 'Globe', category: 'tech' },
  { id: 2, name: 'Soylent', category: 'food' },
];
```

#### forEach

```js
companies.forEach((item) => {
  console.log(item);
});
```

#### map

```js
// Don't do this
const companyNames = [];
for (let i = 0; i < companies.length; i++) {
  names.push(companies[i].name);
}

// map is better
const companyNames = companies.map((item) => item.name);
```

---

## Array functions

Calculation (sum, group, ...)

```js
const companies = [
  { id: 1, name: 'Acme', employees: 5 },
  { id: 4, name: 'Globe', employees: 1010 },
  { id: 2, name: 'Soylent', employees: 120 },
];
```

```js
// Don't do this
const totEmployees = 0;
for (let i = 0; i < companies.length; i++) {
  totEmployees += companies.employees;
}

// reduce is better
const totEmployees = companies.reduce((acc, item) => {
  return acc + item.employees;
}, 0);
```

---

## Array functions

Filter, Find and Sort

```js
const companies = [
  { id: 1, name: 'Acme', employees: 5 },
  { id: 4, name: 'Globe', employees: 1010 },
  { id: 2, name: 'Soylent', employees: 120 },
];
```

<!-- prettier-ignore -->
```js
// filter
const bigCompanies = companies.filter((item) => {
  return item.employees > 1000;
});

// filter: short version
const bigCompanies = companies.filter((item) => item.employees > 1000);

// find
const acme = companies.find((item) => item.name === 'Acme');

// sort (this is immutable!)
const sortedCompanies = companies.sort((a, b) => a.name > b.name);
```

---
layout: image-left
image: https://www.mensjournal.com/wp-content/uploads/mf/sprinting_running_cardio_main.jpg?w=1000&h=563&crop=1&quality=78&strip=all
class: code-small
---


# Exercise - Arrays

```js
const items = [
  { time: '5:17', name: 'Flexbox Video' },
  { time: '8:22', name: 'Redux Video' },
  { time: '3:34', name: 'Flexbox Video' },
  { time: '5:23', name: 'Flexbox Video' },
  // ...
];

// TODO: Get the total number of seconds 
// for all video's starting with 'Flexbox'
// use multiple array methods for 
// mapping, filtering, calculation
```

See 

- [Filter and map](https://github.com/Euricom/training-bootcamp-2022/blob/master/topics/javascript/exercises/filter-and-map.js)

---

# Resources

- [What's New In ES2020](https://www.freecodecamp.org/news/javascript-new-features-es2020/)
- [ES2021 New Features](https://backbencher.dev/articles/javascript-es2021-new-features)
- [Everything new coming in ES2022](https://inspiredwebdev.com/everything-new-in-es2022/)

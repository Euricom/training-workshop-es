---
title: Euricom - JavaScript Fundamentals
theme: euricom
lineNumbers: true
class: 'dark'
---

# Javascript Fundamentals

<img src="/js-big.png" class="h-80 rounded-3xl" /><br/>

<div class="absolute bottom-10">
  <small>
  Copyright (c) 2017-2022 Euricom nv.
  </small>
</div>

---
layout: section-dark
background: /javascript.jpeg
---

# Intro

## Lets talk JavaScript

---

# Why is JavaScript so important?

<img src="/most-popular-language.png" class="h-110" />

---

# JavaScript the language

<v-clicks>

- of the now powerful frontend
  - React
  - Angular
  - VueJS
  - Svelte, NextJS, NuxtJS, Remix, Astro, Fresh, ...
- of … many, many things
  - Server (express, nestjs, ...)
  - Mobile (react-native, ionic, ...)
  - IoT
  - Cloud 
  - Database (mongodb, edgeDB, ...)
  - Scripting / Tools (npm, ...)
  - ...

</v-clicks>

---

# A bit of history

- 1990 - First World Wide Web prototype

<v-clicks>

- 1995 - Brendan Eich create JavaScript
- 1996 - Work on ECMAScript spec begins
- 1997 - ECMAScript 1.0 released
- 1999 - ECMAScript 3.0
- 2000 - Work begin on ES4 
- ... disagreement 💥
- 2009 - ECMAScript 5.0 released (renaming of 3.1)
- 2015 - ECMAScript 6.0 (ES6) released (renamed to ES2015)
- 2016 - ES2016
- ... yearly release
- 2022 - ES2022

</v-clicks>

---
layout: big-points
---

# Learn Javascript

<img src="/js-books.jpg" /><br>

https://github.com/getify/You-Dont-Know-JS

---
layout: big-points
---

# Learn Javascript

- [The MDN JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [DevDocs](http://devdocs.io/javascript)
- [JavaScript Weekly](http://javascriptweekly.com/) (newsletter)
- [syntax.fm](https://syntax.fm/) (podcast)
- [devtools](https://devtools.fm/) (podcast)
- [LevelUpTuts](https://www.youtube.com/c/LevelUpTuts/videos) (youtube)
- ...
- What is your favorite JavaScript learning platform?
  
---
layout: big-points
---

# JavaScript 


- **ECMAScript**: A language standardized by ECMA International.

<v-clicks>

- **JavaScript**: The commonly used name for implementations of the ECMAScript standard
- **ES5** (ES5): The 5th edition of ECMAScript, standardized in 2009
- **ES6** (ES6/ES2015): The 6th edition of ECMAScript, standardized in 2015.
- **ES2016**: The 7th edition of ECMAScript
- **ES2021**: The edition of ECMAScript release in 2021

</v-clicks>

---
layout: big-points
---

# TC39 

The Ecma TC39 committee is responsible for evolving the ECMAScript programming language and authoring the specification. The committee operates by consensus and has discretion to alter the specification as it sees fit.

> Why TC39: Technical Committee number 39
---
layout: big-points
---

# The TC39 Process

- Stage 0: Initial input - Strawman
- Stage 1: Proposal (spec, polyfill, demo)
- Stage 2: Draft (ready for testing)
- Stage 3: Candidate (almost there, last bits)
- Stage 4: Finished (ready)

[TC39 Github Proposals](https://github.com/tc39/proposals)

---

# ECMAScript Today

<img src="/compatibility-table.png" class="w-140" />

Which browser support which ECMAScript version?

[https://kangax.github.io/compat-table/es2016plus/](https://kangax.github.io/compat-table/es2016plus/)

---

# Can I use

Is 'this' feature available on my browser?

<img src="/can-i-use.png" class="w-100" />

[https://caniuse.com/](https://caniuse.com/?search=array%3A%20findLast)

---
layout: section-dark
background: /calm5.jpeg
---

# JavaScript Scope

### Where to look for things.

---
slideTitle: JavaScript Scope
titleRow: true
cols: 1-1 
---

Using let/const

```js
let foo = 2;
if (true) {
  const bar = 1;
}
for (let i = 0; i < 10; i++) {
  // ...
}
console.log(foo + bar); // ?
console.log(i); // ?

```

<v-clicks>

<br/><br/><br/>

### No block scoping with `var`

</v-clicks>

::right::

Using var

```js
var foo = 'bar';
function bar() {
  var foo = 'baz';

  function baz(foo) {
    foo = 'bam';
    bam = 'yay';
  }
  baz();
}

bar();
console.log('foo:', foo); // ?
console.log('bam:', bam); // ?
baz(); // ?
```

---

# Function Scoping

Lexical Scope: Function baz has access to variable bar in higher scope.

```js
function foo() {
  const bar = 'bar';
  function baz() {
    console.log(bar);
  }
  baz();
}
foo();
```


---
slideTitle: Function Hoisting
titleRow: true
cols: 1-1 
---

<div>

```js
// can I call foo before it's declared?
foo(); // ?

// Function Declaration
function foo(){
  console.log('foo')
}

// can I call bar before it's declared?
bar(): // ?

// Function Expression
const bar = function() {
  console.log('bar')
};

// Arrow function expression
const zoo = () => {
  // ...
};
```
</div>

::right::

<div v-click>

This happens in the background?

```js
const bar = undefined:  // compiler hoised these
function foo(){
   // ...
}

foo();
bar();

// function name hoisted, but variable
// assignment doesn't happen until the
// code gets here
bar = function(){
    // ...
};
```

</div>

---

# Duplicated function name

What will happen?

```js
foo();

function foo() {
  console.log('foo');
}

function foo() {
  console.log('Bar dummy');
}

const foo = 2;    // ???
```

<v-click>

### The last wins!

> Whats happens when we define 'var foo = 2'

</v-click>

---
slideTitle: Module isolation
titleRow: true
cols: 1-1 
---

```js
// foo.js
function myFunction() {
  console.log('foo');
}

function foo() {
  myFunction();
}
```

```js
// bar.js
function myFunction() {
  console.log('bar');
}

function bar() {
  myFunction();
}
```

::right::

```html
<head>
  <script src="foo.js" defer></script>
  <script src="bar.js" defer></script>
  <script src="main.js" defer></script>
</head>
```

```js
// main.js
foo();  // output ??
```

<v-clicks>

<br/><br/><br/><br/>

### There is no isolation with script tags!

</v-clicks>



---

# How to isolate from global scope

### Using IIFE (Immediately Invoked Function Expression)

<br/>

```js
var foo = (function () {
  function myFunction() {
    console.log("foo");
  }

  function foo() {
    myFunction();
  }

  return foo;
})();
```

---

# How to isolate from global scope

### Using ESM (ECMAScript Module)

```js
function myFunction() {
  console.log('foo');
}

export function foo() {
  myFunction();
}
```

```js
import { foo } from "./foo.js";

foo();
```

```html
<head>
  <script src="foo.js" type="module" defer></script>
  <script src="bar.js" type="module" defer></script>
  <script src="main.js" type="module" defer></script>
</head>
```

<br/>

#### ESM modules gives isolation by default!

---
layout: section-dark
background: /calm6.jpeg
---

# Javascript Closure

### Remember the past


---
cols: 1-1 
---

## Lexical scope

Function variables are removed when function stops

```js
function foo(baz) {
  const bar = 'bar';
  return 10 + baz;
}

var result = foo(10);
console.log(result);
console.log(bar); // <-- error
```

::right::

## Nested scope

#### Scopes can be nested

```js
function foo(baz) {
  const bar = 'bar';
  function inner() {
    console.log(bar, baz);
  }
  inner();
}
foo(12);
```

#### Returning functions

```js
function foo() {
  const bar = 'abc';
  return function inner() {
    console.log(bar);
  };
}

const fn = foo();
fn(); // OUTPUT: 'bar'
```

---
layout: big-points
class: 'text-center'
---

# A Closure

## A Closure is when a function "remember" its lexical scope even when the function is executed outside that lexical scope.

---
slideTitle: Closure - Examples
titleRow: true
cols: 1-1 
---

```js
// sample with arrow function
function foo(argX) {
  const bar = 'Hello';
  const inner = (argY) => {
    console.log(bar, argX, argY);
  };
  return inner;
}

// get handler 
const fn = foo('euri');
fn('com');
```

::right::

```js
// jquery sample
function foo() {
  const bar = 'bar';
  $('#btn').click(function (evt) {
    console.log(bar);
  });
}

// register the event handler
foo();
```

---
slideTitle: Closure - More Examples
titleRow: true
cols: 1-2 
---

```js
// Do you catch the closure?
function foo(timeout, foo) {
  setTimeout(() => {
    console.log('hello', foo);
  }, timeout);
}
```

```js
// Is this a closure?
function foo(timeout) {
  setTimeout(() => {
    console.log('hello');
  }, timeout);
}
```

::right::


```js
// Where is the closure?
function registerClick(message) {
  function handleClick() {
    document.getElementById('demo')
            .innerHTML = message;
  }

  document.addEventListener('click', handleClick);

  return () => 
    document.removeEventListener('click', handleClick);
}
const unsubscribe = registerClick('Hello World');
// ...
unsubscribe();
```

---
layout: big-points
class: 'text-center'
---

# A Closure

## A Closure is when a function "remember" its lexical scope even when the function is executed outside that lexical scope.

---
layout: image-right
image: 'https://cdn.materialdistrict.com/wp-content/uploads/2018/06/sustainable-yoga-mats-for-international-day-of-yoga-05.jpg'
cols: 1-1
---

# Exercise - Closures

Write a function that takes an argument and return a function that returns that argument;

```js
const idf = identityf(3);
const result = idf();  // 3
```

<style>
  code {
    font-weight: bold;
    font-size: 1.6em;
    line-height: 1.5em;
  }
</style>

And More [https://github.com/Euricom](https://github.com/Euricom/training-bootcamp-2022/blob/main/topics/javascript/exercises/closures.md)


---
layout: section-dark
background: /calm6.jpeg
---

# this

### One of the most powerful JavaScript keywords is this. Unfortunately it is hard to use if you don't exactly know how it works.

---

# 'this' is NOT your usable 'this' (C#, java)

Every function has a reference to its current executing context.

```javascript
function doThis() {
  console.log(this.name); // output?
}

doThis();
```

`this` is defined by 5 rules (in reverse order):

- default binding
- implicit
- explicit binding
- hard binding
- arrow function
- new keyword

---

## Global context & This

In web browsers, the window object is a global object and 'this' refers to this window object.

```js
a = 37;
console.log(window.a); // 37
console.log(globalThis.a); // 37
console.log(window === this); // true
```

<br/>

<div class="grid grid-cols-[1fr,1fr] gap-x-3" >

<div>

#### node (type="commonjs")

```js
a = 37;
console.log(global.a); // 37
console.log(globalThis.a); // 37
console.log(this === global); // false

// 'this' refers to `module.exports` 
// and not the global
this.a = 37
console.log(this.a); // false
console.log(modules.exports.a); // 37
console.log(this === modules.exports); 
```

</div>

<div>

#### node (type="module")

```js
a = 37; // ERROR

global.a = 37; // ok
console.log(global.a); // 37
console.log(globalThis.a); // 37

// 'this' is undefined
console.log(this); // undefined
console.log(this === undefined); // true
```
</div>

</div>


---

# This - Default binding in function

In web browsers, 'this' points to the global objectct

```js
function foo() {
  this.name = 'peter';
}

console.log(globalThis.name); // 'peter'
```

<div class="grid grid-cols-[1fr,2fr] gap-x-3" >

<div>

node (type="commonjs")

```js
function foo() {
  // this point to the global object
  this.name = "peter";
}

foo();
console.log(globalThis.name); // 'peter'
```

</div>

<div>

node (type="module")

```js
function foo() {
  this.name = "peter";  // ERROR
}

foo();
```
</div>

</div>


---

# This - Implicit binding

```javascript
const bar = 'bar1';
function foo() {
  console.log(this.bar);
}

const o2 = { bar: 'bar2', foo: foo };
const o3 = { bar: 'bar3', foo: foo };

foo(); // ???
o2.foo(); // ???
o3.foo(); // ???
```

<div v-click>

Answers:

```js
foo(); // 'bar1' default binding 
o2.foo(); // 'bar2' implicit binding
o3.foo(); // 'bar3' implicit binding
```

</div>

<div v-click>

The 'this' points to the object where it is called from (its context).

</div>


---

# This - Default and implicit binding - More

```javascript
const o1 = {
  bar: 'bar1',
  foo: function () {
    console.log(this.bar);
  },
};

const o2 = { bar: 'bar2', foo: o1.foo };
const bar = 'bar3';
const foo = o1.foo;

o1.foo(); // ???
o2.foo(); // ???
foo(); // ???
```

<div v-click>

Answers:

```js
o1.foo(); // 'bar1'
o2.foo(); // 'bar2'
foo(); // 'bar3' (default)
```

</div>

---

# This - Explicit binding (call & apply)

```js
function foo(arg1, arg2) {
  console.log(this.bar, arg1, arg2);
}

const bar = 'bar1';
const obj = { bar: 'bar2' };

foo(1, 2); // 'bar1', 1, 2

// Call the function and explicit pass the this
foo.call(obj, 1, 2); // 'bar2', 1, 2

// Call the function, pass the this & arguments as array
const a = [5, 6, 7];
foo.apply(obj, a); // 'bar2', 5, 6
```

'`call`' or '`apply`' changes the reference of the 'this' in the calling function.

---

# Hard binding (bind)

```js
function foo(ba, lam) {
  console.log(this.bam + ' ' + ba + ' ' + lam);
}

const obj = { bam: 'bam' };
const foo2 = foo.bind(obj, 'ba');

foo2('lam'); // 'bam ba lam'
```

Bind the reference of the 'this' to another value independently how you call the function.

---
slideTitle: This - Hard binding samples
titleRow: true
cols: 1-1 
---

```javascript
// object sample
const car = {
  name: 'Bmw',
  start() {
    setTimeout(
      function () {
        console.log(
          this.name + ' started');
      }.bind(this),
      1000,
    );
  },
};

car.start(); // output: Bmw started
```

::right::


```js
// jquery example
$('#btn').click(function (evt) {
  // this point to the button element
  console.log(this.name);
});
```

---

# This - 'new' keyword

```js
// constructor function (mark the pascal casing)
function User(name) {
  this.name = name;
}
const user = new User('peter');
user.name; // 'peter'
```

## `new` creation flow

- A new object is created
- (The `__proto__` property is set to the function prototype)
- The `this` point to the newly created object
- The constructor function is executed
- The newly created object is returned (except when the constructor returns none null)

---

# This - Arrow function

<style>
  code {
    font-size: 1.2em;
    line-height: 1.5em;
  }
</style>

### Hard binding to the outer scope

```js
const car = {
  name: 'Bmw'
  start() {
    setTimeout(() => {    
        console.log(this.name + ' started')
    }, 1000)
  }
}

car.start(); // output: Bmw started
```

---
slideTitle: This - Don't use an arrow function for
titleRow: true
cols: 1-2 
class: code-small
---


```js
// Event Handlers
const button = document.querySelector('#pushy');
button.addEventListener('click', () => {
  this.classList.toggle('on'); // => ERROR: TypeError
});
```

```js
// Object Methods
const person = {
  points: 23,
  score: () => {
    this.points++;
  },
};
person.score();
console.log(person.points); // ??
```

::right::


```js
// prototype
function Car(make) {
  this.make = make;
}

Car.prototype.summarize = () => {
  return `This car is a ${this.make}`;
};
```

---

# This - Summary

5 rules to get the value of`this`:

1. Was the function called with `new`?
2. Was the function an arrow function?
3. Was the function created with `bind`
4. Was the function called with `call` or `apply` specifying an explicit `this`?
5. Was the function called via a containing/owing object (context)?
6. Was the function called on the global scope?

---
layout: image-right
image: https://47h07141n4wr3s4gyj49ii1d-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/Beautiful-Reverse-Warrior-ot-Sunset-on-Rock-over-Ocean-copy-1-e1517104262553.jpeg
---

# Exercise - this

```js
globalThis.fullname = 'John Doe';

const obj = {
  fullname: 'Colin Ihrig',
  prop: {
    fullname: 'Aurelio De Rosa',
    getFullname: function () {
      return this.fullname;
    },
  },
};

const test = obj.prop.getFullname;
console.log(test());
```

Make the console.log() prints <br>'Aurelio De Rosa'.<br>
Don't change the obj!

---
layout: section-dark
background: /calm7.jpeg
---

# Prototypes

### Prototype is a fundamental concept that every JavaScript developer must understand

---

## A whole new object

To create the simplest new object in JavaScript, you can use Object.create:

```javascript
// this creates an empty objects
var person = Object.create(null);
```

In JavaScript, objects are pairs of keys and values

```javascript
person['name'] = 'john';
person['age'] = 12;
```

You can also use the dot format (typically used)

```javascript
person.name = 'john';
person.age = 12;
```

---
cols: 1-1
---

# Prototypes & Object linking

In fact, JavaScript objects also have one additional attribute: a pointer to another object. We call this pointer the object's prototype.

```javascript
const dev = Object.create(null);
dev.role = 'dev';
dev.code = function () {
  console.log('writing code');
};

const peter = Object.create(dev);
console.log(peter.role); // 'dev'
peter.code(); // 'writing code'

// returns the dev object
console.log(Object.getPrototypeOf(peter));
```

::right::

<img src="/object-linking.png" class="h-100 mt-20">


---
cols: 1-1
---

## Object Literals

JavaScript provides a literal syntax for creating an object and assigning properties to it.

```javascript
const person = {
  firstName: 'Paul',
  lastName: 'Irish',
};
```

It's equivalent to

```js
const person = new Object();
person.firstName = 'Paul';
person.lastName = 'Irish';
```

But it's actual

```javascript
const person = Object.create(Object.prototype);
person.firstName = 'Paul';
person.lastName = 'Irish';
```

::right::

<img src="/object-literal.png" class="h-100 mt-25">


---
cols: 1-1
---

## Prototype of a function

Every **function** is born with prototype object

<br/>

```js
function Person() {
  // ...
}

console.log(Person.prototype);
```

The prototype is initial an empty object, but you can add member to it.

::right::

<img src="/function-prototype.png" class="h-100 mt-10" >


---

## Remember the 'new' keyword

- A new object is created
- The '\_\_proto\_\_' property is set to the function prototype
- The 'this' point to the newly created object
- The constructor function is executed
- The newly created object is returned

```javascript
function Person(name) {
  this.name = name;
}
const person = new Person('Paul');
```

---
cols: 1-2
---

## Constructor functions & new

```javascript
function Person(name) {
  this.name = name;
  this.shoutYourName = function () {
    return 'Shouting ' + this.name;
  };
}
Person.prototype.identity = function () {
  return 'I am ' + this.name;
};

const jane = new Person('Jane');
const john = new Person('John');
```

Function.prototype is the object where \_\_proto\_\_ points to when you create an object with new


::right::

<img src="/function-new.png" class="h-100 mt-10" >

---
cols: 1-1
---

## Remember this

Create an object

```javascript
const person = {
  firstName: 'Paul',
  lastName: 'Irish',
};
```

It's actual 

```js
const person = new Object();
person.firstName = 'Paul';
person.lastName = 'Irish';
```

::right::

<img src="/object-new.png" class="h-100 mt-10" >

---

## The Full Prototype Chain

<img src="/prototype-chain.png" class="h-100" />

> [and there is even more](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/fig4.png)
 (You-Dont-Know-JS)

---
slideTitle: ES6 Classes vs prototype
titleRow: true
cols: 1-1
---

```ts
class Person {
  name: string;
  constructor(name) {
    this.name = name;
  }

  identity() {
    return 'I am' + this.name;
  }

  static create(name) {
    return new Person(name);
  }
}
```

JavaScript Class

::right::

```js
const Person = (function () {
  function Person(name) {
    this.name = name;
  }
  Person.prototype.identity = function () {
    return 'I am' + this.name;
  };
  Person.create = function (name) {
    return new Person(name);
  };
  return Person;
})();


```

JavaScript prototype

---
layout: image-left
image: >-
  https://www.mensjournal.com/wp-content/uploads/mf/sprinting_running_cardio_main.jpg?w=1000&h=563&crop=1&quality=78&strip=all
class: code-small
---

## Exercise - Prototype 

Implement the `myForEach` function

```js
// Step 1
function myForEach(arr, callback) {
  // implement me
}

const arr = ['a', 'b', 'c'];
myForEach(arr, function (value, index) {
  /* should always be true */
  const isValid = this[index] === value;
  console.log(value, isValid);
});

// output: 
// 'a' true
// 'b' true
// 'c' true

// Step 2 - Make this work
arr.myForEach((value) => {
  console.log(value);
});
```


---

# Resources

- [You-Dont-Know-JS Book series](https://github.com/getify/You-Dont-Know-JS)
- [Frontendmasters - Advanced JavaScript - Kyle Simpson](https://frontendmasters.com/courses/advanced-javascript/)
- [JavaScript Weekly](http://javascriptweekly.com/)
- [45 Useful JavaScript Tips, Tricks and Best Practices](https://modernweb.com/45-useful-javascript-tips-tricks-and-best-practices/)

---
layout: quote
background: '/yoda-force.jpeg'
---

# May the JavaScript force be with you

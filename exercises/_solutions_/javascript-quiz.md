# Javascript Quiz

<img src="./images/quiz_time.png" width="600px" /><br>
<small>
Copyright (c) 2017-2021 Euricom nv.
</small>

---

# Fundamentals - Scope

===

### `var` declares a block-scoped variable

<!-- .slide: class="list-large" -->

1. TRUE

2. FALSE

<div class=" response fragment">

Answer: FALSE

</div>

===

### `const` declares a block-scoped variable

<!-- .slide: class="list-large" -->

1. TRUE

2. FALSE

<div class=" response fragment">

Answer: TRUE

</div>

===

### `let` declares a block-scoped variable

<!-- .slide: class="list-large" -->

1. TRUE

2. FALSE

<div class=" response fragment">

Answer: TRUE

</div>

===

### What's the output?

<!-- .slide: class="code-large" -->

```js
var KEY = 'white_rabbit';
if (true) {
  var KEY = 'ginger_rabbit';
}
console.log(KEY);
```

<div class=" response fragment">

Answer: ginger_rabbit

</div>

===

### What's the output?

<!-- .slide: class="code-large" -->

```js
const KEY = 'white_rabbit';
if (true) {
  const KEY = 'ginger_rabbit';
}
console.log(KEY);
```

<div class=" response fragment">

Answer: white_rabbit

</div>

===

### What's the output?

<!-- .slide: class="code-large" -->

```js
const KEY = 'white_rabbit';
if (true) {
  KEY = 'ginger_rabbit';
}
console.log(KEY);
```

<div class=" response fragment">

Answer: ERROR: Assignment to constant variable

</div>

===

### What is the final value of 'obj'?

<!-- .slide: class="code-large" -->

```js
const obj = { foo: 1 };
obj.bar = 2;
```

```js
// 1:  { foo: 1 }
// 2:  N/A, throws and error
// 3:  { foo: 1, bar: 2 }
// 4:  { foo: 1, 2: bar }
```

<div class=" response fragment">

Answer: { foo: 1, bar: 2 }

</div>

===

<!-- .slide: class="code-large" -->

### What is the value of x?

```js
function fn(x) {
  x = x + 1;
}
var x = 2;
fn(x);
```

```js
// 1: 3
// 2: 2
// 3: undefined
```

<div class="response fragment">

Answer: 2

</div>

===

<!-- .slide: class="code-large" -->

### What is the value of 'obj.x'?

```js
function fn(obj) {
  obj.x = obj.x + 1;
}
var obj = { x: 1 };
fn(obj);
```

```js
// 1: 2
// 2: 1
// 3: undefined
```

<div class="response fragment">

Answer: 11

</div>

===

<!-- .slide: class="code-large" -->

### What is the value of 'members'?

```js
let person = { name: 'Lydia' };
const members = [person];
person = null;

console.log(members);
```

```js
// 1: null
// 2: [null]
// 3: [{}]
// 4: [{ name: 'Lydia' }]
```

<div class="response fragment">

Answer: { name: 'Lydia' }

</div>

===

<!-- .slide: class="code-large" -->

### What is the log output

```js
console.log('baz');
setTimeout(() => {
  console.log('foo');
}, 0);
console.log('bar');
```

```js
// 1: baz, foo, bar
// 2: baz, bar, foo
// 3: baz, bar
```

<div class="response fragment">

Answer: baz, bar, foo

</div>

===

### Legal or not?

<!-- .slide: class="code-xlarge" -->

```js
function doIt(x, y, z) {
  // Do stuff..
}
doIt(12, '34', 4555555555, true);
```

<div class=" response fragment">

Answer: Yes

</div>

===

### What is the output?

<!-- .slide: class="code-xlarge" -->

```js
(function (x, f = () => x) {
  var x;
  var y = x;
  x = 2;
  return [x, y, f()];
})(1);
```

```js
// 1: [2, 1, 1];
// 2: [2, undefined, 1];
// 3: [2, 1, 2];
// 4: [2, undefined, 2];
```

<div class=" response fragment">

Answer: [2, 1, 1]

</div>

===

### What is the output?

<!-- .slide: class="code-large" -->

```js
function fn(x) {
  return (y) => x + y;
}
fn(10)(12);
```

```js
// 1: 10
// 2: 12
// 3: 22
// 4: 0
```

<div class=" response fragment">

Answer: 22

</div>

===

### What is the output?

<!-- .slide: class="code-large" -->

```js
function func(o) {
  o = null;
}

var x = [];
func(x);
console.log(x);
```

```js
// 1: null
// 2: []
// 3: undefined
// 4: throw
```

<div class=" response fragment">

Answer: []

</div>

===

### What is the output?

<!-- .slide: class="code-large" -->

<!-- prettier-ignore -->
```js
function swap(a, b) {
  var temp = a;
  a = b;
  b = temp;
}

var x = 1, y = 2;
swap(x, y);
console.log(x);
```

```js
// 1: 1
// 2: 2
// 3: undefined
// 4: throw
```

<div class=" response fragment">

Answer: 1

</div>

---

# Fundamentals - 'this'

===

### What is the output?

```js
const obj = {
  baz: 54,
  foo() {
    return this.baz;
  },
};

obj.foo();
```

```js
// 1: 54
// 2: undefined
// 3: null
// 3: error
```

<div class="response fragment">

Answer: 54

</div>

===

### What is the output?

```js
const obj = {
  baz: 54,
  foo: () => {
    return this.baz;
  },
};

const fn = obj.foo.bind(obj);
fn();
```

```js
// 1: 54
// 2: undefined
// 3: null
// 3: error
```

<div class="response fragment">

Answer: undefined or Error (when in strict)

</div>

===

### What is the output?

```js
const name = 'xyz';
function foo() {
  return {
    name: 'abc',
    getName: () => {
      return this.name;
    },
  };
}

console.log(foo().getName());
```

```js
// 1: abc
// 2: undefined
// 3: throw error
// 4: xyz
```

<div class=" response fragment">

Answer: xyz

</div>

===

### What is the output?

```js
const name = 'xyz';
function Foo() {
  this.name = 'abc';
  this.getName = () => {
    return this.name;
  };
}

const foo = new Foo();
console.log(foo.getName());
```

```js
// 1: abc
// 2: undefined
// 3: throw error
// 4: xyz
```

<div class=" response fragment">

Answer: abc

</div>

===

### What is the output?

```js
const name = 'xyz';
function foo() {
  const name = 'abc';
  return () => {
    return name;
  };
}

const baz = foo();
console.log(baz());
```

```js
// 1: abc
// 2: undefined
// 3: throw error
// 4: xyz
```

<div class=" response fragment">

Answer: abc (closure)

</div>

===

### What is the output?

```js
const person = { name: 'Lydia' };
function sayHi(age) {
  return `${this.name} is ${age}`;
}

console.log(sayHi.call(person, 21));
console.log(sayHi.bind(person, 21));
```

```js
// 1: undefined is 21 & Lydia is 21
// 2: function & function
// 3: Lydia is 21 & Lydia is 21
// 4: Lydia is 21 & function
```

<div class=" response fragment">

Answer: Lydia is 21 & function

</div>

---

# ES6 and beyond

===

### What is the value of 'person'?

```js
const person = { name: 'Lydia', age: 21 };
const changeAge = (x = { ...person }) => (x.age += 1);
const changeAgeAndName = (x = { ...person }) => {
  x.age += 1;
  x.name = 'Sarah';
};

changeAge(person);
changeAgeAndName();
```

```js
// 1: { name: "Sarah", age: 22 }
// 2: { name: "Lydia", age: 22 }
// 3: { name: "Sarah", age: 23 }
// 4: { name: "Lydia", age: 23 }
```

<div class="response fragment">

Answer: { name: "Lydia", age: 22 }

</div>

===

### What is the final value of array below?

<!-- .slide: class="code-large" -->

```js
const array = [1, 2, 3];
const extension = [4, 5, 6];

array = [...extension, ...array];
```

```js
// 1: [1, 2, 3];
// 2: [1, 2, 3, 4, 5, 6];
// 3: [4, 5, 6, 1, 2, 3];
```

<div class=" response fragment">

Answer: [1, 2, 3]

</div>

===

### What is the value of 'myObj'

<!-- .slide: class="code-large" -->

```js
class MyClass {
  constructor(options) {
    const defaults = { color: 'blue' };
    Object.assign(this, defaults, options);
  }
}
const myObj = new MyClass({ size: 'xl' });
```

```js
// 1: MyClass { color: 'blue' };
// 2: MyClass { color: 'green', size: 'xl' };
// 3: MyClass {};
// 4: {}
```

<div class=" response fragment">

Answer: MyClass { color: 'green', size: 'xl' }

</div>

===

### Legal or not?

<!-- .slide: class="code-xlarge" -->

```js
var score = [12, 7, 14];
Math.max(...score);
```

<div class=" response fragment">

Answer: Yes

</div>

===

### Legal or not?

<!-- .slide: class="code-xlarge" -->

```js
function stuff(x, ...y) {
  // Do stuff..
}
```

<div class=" response fragment">

Answer: Yes

</div>

===

### Legal or not?

<!-- .slide: class="code-xlarge" -->

```js
function stuff(x, y = x / 3) {
  // Do stuff..
}
stuff(6);
```

<div class=" response fragment">

Answer: Yes

</div>

===

### Legal or not?

<!-- .slide: class="code-xlarge" -->

```js
var { foo, bar } = {
  foo: 'FOO',
  bar: 'BAR',
};
```

<div class=" response fragment">

Answer: Yes

</div>

===

### Legal or not?

<!-- .slide: class="code-xlarge" -->

```js
var [first, , last] = [1, 2, 3];
```

<div class=" response fragment">

Answer: Yes

</div>

===

### Legal or not?

<!-- .slide: class="code-xlarge" -->

```js
function stuff(a, x=12, y=42) {
  // Do stuff..
}
stuff(1, ,2);
```

<div class=" response fragment">

Answer: Nope.

</div>

===

### Legal or not?

<!-- .slide: class="code-xlarge" -->

```js
const { x } = { x };
```

<div class=" response fragment">

Answer: Yes

</div>

===

### What is the value of counter

<!-- .slide: class="code-xlarge" -->

```js
const x = 0;
const counter = x || 12;
```

<div class=" response fragment">

Answer: 12

</div>

===

### What is the value of counter

<!-- .slide: class="code-xlarge" -->

```js
const x = 0;
const counter = x ?? 12;
```

<div class=" response fragment">

Answer: 0

</div>

===

### What is the output?

<!-- .slide: class="code-xlarge" -->

```js
function mys(...params) {
  return params;
}
mys(1, 23, 4);
```

```js
// 1: undefined;
// 2: [1, 23, 4];
// 3: "1 23 4";
// 4: 1;
```

<div class=" response fragment">

Answer: [1, 23, 4]

</div>

===

### What is the output?

<!-- .slide: class="code-xlarge" -->

```js
((...x) => x)(1, 2, 3);
```

```js
// 1: 1;
// 2: 3;
// 3: [1, 2, 3];
// 4: Error;
```

<div class=" response fragment">

Answer: [1, 2, 3]

</div>

===

### What is the output?

<!-- .slide: class="code-xlarge" -->

```js
const obj = { x: 1 };
const fn = (y) => ({
  name: 'abc',
  x: 23,
  ...y,
});
fn(obj);
```

```js
// 1: { x: 1 }
// 2: { x: 1, name: 'abc' }
// 3: { x: 23, name: 'abc' }
// 4: { name: 'abc', x: 1 }
```

<div class=" response fragment">

Answer: { name: 'abc', x: 1 }

</div>

===

### What is the output?

<!-- .slide: class="code-large" -->

```js
var obj = { color: 'green', size: 'xl', border: 'round' };
function fn({ color, ...obj }) {
  return obj;
}
fn(obj);
```

```js
// 1: { color: 'green', size: 'xl', border: 'round' }
// 2: { size: 'xl', border: 'round' }
// 3: {}
// 4: null
```

<div class=" response fragment">

Answer: { size: 'xl', border: 'round' }

</div>

===

### What is the output?

<!-- .slide: class="code-large" -->

<!-- prettier-ignore -->
```js
var x = `foo ${y}`,
    y = `bar ${x}`;
console.log(y);
```

```js
// 1: 'foo bar foo'
// 2: 'foo'
// 3: 'foo bar undefined'
// 4: 'foo bar'
```

<div class=" response fragment">

Answer: 'foo bar undefined'

</div>

===

### What is the output?

<!-- .slide: class="code-large" -->

<!-- prettier-ignore -->
```js
var x = new Set([
  'peter',
  'john',
  'kris',
  'peter',
])
console.log(x.size);
```

```js
// 1: 4
// 2: 3
// 3: undefined
```

<div class=" response fragment">

Answer: 3

</div>

---

## Resources

- https://maxwellito.github.io/es6-quiz-slides

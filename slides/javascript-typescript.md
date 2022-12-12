---
title: Euricom - Typescript
theme: euricom
lineNumbers: true 
---

# Typescript 
## JavaScript with added types.

<img src="/typescript.svg" class="h-70 rounded-3xl" /><br/>

<small>
Copyright (©️) 2019-2022 Euricom
</small>

---
layout: section-dark
background: /calm3.jpeg
---

# Fundamentals

---

# Types

```ts {monaco} {height:'420px'}
//
// auto inferred types
//
const digit = 1;
const customer = 'euricom';
const array = [];
const fn = () => Math.floor(Math.random() * 10);
const obj = { name: 'peter' }

//
// annotation type
//
const isReady: boolean = false;  
const typedArray: Array<string> = []; // using generic
const promise = new Promise<number>((resolve) => {
  setTimeout(() => resolve(1), 1000);
});
```

---

# Basic types

```ts {monaco} {height:'420px'}
// boolean
const isReady: boolean = false;

// number
const digit: number = 1;

// string
const message: string = 'Message from the dark side, you have';

// array
const numbers: number[] = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];

// tuple
const point: [number, number] = [100, 200];
const custom: [number, string] = [100, 'apple'];
```

---

# Function arguments

```ts {monaco} {height:'420px'}
// arguments types
function add(a: number, b: number) {
  return a + b; // auto inferred return type
}

// annotated return type
function padLeft(padding: number | string, input: string): string {
  throw new Error("Not implemented yet!");
}

// with generic
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
```


---

# Specific types

#### `any`

```ts {monaco} 
// it could be anything
let apiResult: any;

// it allows without any check to call even deep properties
const c = apiResult.a.b.c;
```

<div v-click>

#### `unknown`

```ts {monaco}
// you don't know the type 
let maybeString: unknown = "abc";
maybeString.toUpperCase(); // ERROR

// only accessible after check, cast (narrowing)
if (typeof maybeString === 'string') {
  console.log('first character', maybeString.toUpperCase());
}
```

</div>

<div v-click>

</div>

---

# Union Type

```ts {monaco} {height:'420px'}
// Union type
let stringOrNumber: string | number;
stringOrNumber = 'Yoda';
stringOrNumber = 41;

// Type alias
type OptionalString = string | undefined;
type ID = string | number;
let id: ID;

// Literal Types
type Role = 'admin' | 'power-user' | 'user';
const role: Role = 'admin';

type Falsy = false | 0 | '' | null | undefined;
const falsy: Falsy = null;
```

---

# Type Casting

```ts{monaco}
// sometime the type is only partial inferred
const input = document.querySelector('input[type="text"]') as HTMLInputElement;

// we need to cast our union types before use
function fn(arr: string): number | string {
  if (arr.length > 0) {
    return 'abc';
  }
  return '12';
}

const myVar = fn('test');
console.log(myVar.toUpperCase());

// not the best way but it works for now 😄
console.log((myVar as string).toUpperCase());
```

---

# Non-Null Assertion Operator 

```ts{monaco}
//  Non-Null Assertion Operator 

const app = document.getElementById('app');
// ⚠️ Object is possibly 'null'.(2531)
app.innerHTML = '<span>Helllo<span>'; 

// 1. use an if condition
if (app) {
  app.innerHTML = '<span>Helllo<span>';
}

// 2. or if you sure it's not null
// use Non-Null Assertion Operator
app!.innerHTML = '<span>Helllo<span>'
```

--- 
cols: 2-1
---

# Object Types

```ts {monaco} {height:'420px'}
// Interface 
interface Person {
  firstName: string;
  lastName: string;
  middleName?: string; // optional property
}

function getFullName(person: Person): string {
  const { firstName, middleName, lastName } = person;
  return [firstName, middleName, lastName].join(' ');
}

getFullName({ firstName: 'John', lastName: 'Doe' });

// Alternative
type Person2 = {
  firstName: string;
  lastName: string;
  middleName?: string;
};
```

---
slideTitle: Extends interface / type
titleRow: true
cols: 1-1
---

You can extend an `interface`

```ts
interface Item {
  id: number;
  sku: string;
}

interface Artist extends Item {
  name: string;
}
```

You can implement an `interface` 

```ts
class Artist implements Item {
  id: number;
  sku: string;
}
```

::right::

A `type` can be based on another type 

```ts
type Item = {
  id: string;
  sku: string;
};

type Artist = {
  name: string;
} & Item;
```

---

# Function type signatures

```ts
function divide(x: number, y: number): number {
  return x / y;
}

function calculate(x: number, y: number, operation: any): number {
  return operation(x, y);
}

calculate(1, 2, divide)
```

🤔 How can we type the `operation` parameter?

<div v-click>

```ts
type OperationFn = (x: number, y: number) => number;

function calculate(x: number, y: number, operation: OperationFn): number {
  return operation(x, y);
}
```

</div>

---

# Function overloads

🤔 How can we improve the following

```ts {monaco}
function add(x: any, y: any): any {
  return x + y;
}
const x = add(1, 2)
const y = add('1', '2')
```

<div v-click>

Add function overloads

```ts  {monaco}
// add most specific at the top
function add(x: string, y: string): string;
function add(x: number, y: number): number;
function add(x: any, y: any): any {
  return x + y;
}

const x = add(1, 2)
const y = add('1', '2')
```

</div>

---

# typeof

```ts
// Basic types
const greeting = 'Hello world';

type Greeting = typeof greeting; // Literal: 'Hello world'

// Objects
const person = {
  name: 'Tom Marien',
  age: 43,
};

type Person = typeof person; // type Person = { name: string; age: number }

// Functions
const greet = (name: string) => {
  return `Hello ${name}`;
};

type Greeter = typeof greet; // type Greeter = (name: string) => string
```

💡 `typeof` can extract a type from any JavaScript!

---

# keyof

```ts{monaco}

interface Point {
  x: number;
  y: number;
}

function getAxis(point: Point, property: keyof Point) {
  return point[property];
}

console.log(getAxis({ x: 10, y: 20 }, 'x')); // 10
```


---
layout: section-dark
background: /calm1.jpeg
---

# Declaration Files

---
class: code-xsmall
---

# Declaration Files

```ts{monaco}
// Declarations

const k = Math.max(5, 6);
const j = Math.mix(7, 8);  // Property 'mix' does not exist on type 'Math'.

// How did TypeScript know that max was present but not mix, 
// even though Math’s implementation wasn’t part of your code?

const p = new Promise();
// The error message displays the Type Declaration file.
```

<div v-click>

The standard library (global type declaration) files are imported implicitly 
by the TypeScript compiler by looking at the [lib compiler-option](https://www.typescriptlang.org/tsconfig#lib)

```json
{
  "compilerOptions": {
    "lib": [ "es2020", "dom"]
  }
}
```

</div>

---

# 3th party Declaration Files

```ts
// ⚠️ Cannot find module 'lodash' or its corresponding type declarations.ts(2307)
import { keyBy } from 'lodash';
const items = [
  { id: 1, name: 'First' },
  { id: 2, name: 'Second' },
];

const itemsById = keyBy(items, 'id');
```

<div v-click>

Install types 

```bash
# install types (declaration files)
yarn add @types/lodash --dev
# or `npm install @types/lodash --save-dev`
```

💡 Many modules have a corresponding `@types` module. 

</div>


---
slideTitle: Declaration file for custom types
titleRow: true
cols: 1-1
---

#### For the browser

```js
// src/global.d.ts
declare global {
  interface Window {
    myProperty: any;
  }
}
export {};
```

```ts
// src/index.ts
window.myProperty = 'test';
```

::right::

#### For node

```js
// src/global.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number | string;
    }
  }
}
export {};
```

```ts
// src/index.ts
const port = process.env.PORT;
```

---
layout: section-dark
background: /calm2.jpeg
---

# Narrowing

---

## The Union type problem

```ts {monaco}
function fn(arr: string): string | undefined {
  if (arr.length > 0) {
    return 'abc'
  }
  return undefined
}

const result = fn('');
result.toUpperCase();  // ERROR: how to fix?

// cast?
(result as string).toUpperCase();  // 😱  - DON'T USE

// Non-Null Assertion Operator?
result!.toUpperCase(); // 😱 - AVOID
```

---

## Type narrowing with 'typeof'

```ts {monaco}
// typeof: string, number, boolean, symbol, ...
function padLeft(padding: number | string, input: string) {
  // typeof act as a type guard
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }

  // padding is a string now (not a number)
  return padding + input;
}
```

---

## Type narrowing with 'instance of'

```ts{monaco}
// instanceof: Date, Error, Array, Map, Set, ... (class types)
function logValue(value: Date | string) {
  if (value instanceof Date) {
    console.log(value.toUTCString());
  } else console.log(value);
}

logValue('now is');
logValue(new Date());
```

---

# Type narrowing with 'in operator'

```ts{monaco}
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}
```

---

## Type Guard 

```ts {monaco}
type Fish = { swim: () => void };
type Bird = { fly: () => void };

// Bird type guard
function isBird(obj: unknown): obj is Bird {
  return typeof obj === 'object' && obj !== null && 'fly' in obj;
}

function fly(obj: unknown): void {
  if (isBird(obj)) {
    obj.fly();
    return
  } 
  throw new Error('Cannot fly');
}

const tuna = { swim() { console.log('swim') } };
fly(tuna)
```

---

## Type Guard - Assertion  

```ts{monaco}
interface Bird {
  fly(): void;
}

// Bird type assertion
function assertIsBird(obj: unknown): asserts obj is Bird {
  if (!(typeof obj === 'object' && obj !== null && 'fly' in obj))
    throw new Error('Not a bird');
}

function fly(obj: unknown): void {
  assertIsBird(obj);

  obj.fly();
}
```

See also [tiny-invariant](https://github.com/alexreardon/tiny-invariant);

---

# Resources

* [Typescript Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
* [Learn TypeScript](https://www.tutorialsteacher.com/typescript)
* [TypeScript errors and how to fix them](https://typescript.tv/errors/#TS2391)


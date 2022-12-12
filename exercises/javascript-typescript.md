# Javascript - TypeScript

## Part I

### Exercise 1 [⚙️](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgArQM4HsTIN4C+AUEQjhmMgA6bkBcatIA2gLrIC8yzRy+vfZDGBQKIOAFsIDAEQBBADbAEwODIA0AvgrhjJ05DIDSEAJ4YNW5HADmBkAFcFCzXwKv+goSL1TZAFSwJSy8dXwMZAFk4KGAIEBDBWwMAFgAmD3cBPCthUTBxP0MAGQcAawhE7V0C-VkAZTLTAHc4BQqoRKzWAG4SGAcQBDBgHGQbKAgIMHRRHAAKGjmQBlnsEABKT2QFaeomNuAALwgAEwBxSenQG05kAAMACQhnLHVkABI8JfWAOjzwgRPt8mL8wrUpAR7n0BMAYMhFqDksgAIRcRzODZWH44Q4nC5XEYgW5cHHiJT4y5TIm3ADUD3UXzJv2SQNMEBiGGQWAUp2hJD4ZBA2F2YKwNkRyzxZyp12JGz6xCIZIwvwkcCo8wm1LWOAVRCAA)

Define the interface Person!

```ts
interface Person {}

const persons: Person[] = [
  {
    firstname: 'Alicia',
    lastname: 'Keys',
    age: null,
  },
  {
    firstname: 'Tom',
    lastname: 'Marien',
    age: 42,
  },
  {
    firstname: 'Luke',
    lastname: 'Skywalker',
  },
];

function greetPerson(person: Person) {
  let personalizedGreeting = `Hello, ${person.firstname} ${person.lastname}`;

  if (person.age != null)
    personalizedGreeting = personalizedGreeting + `,${person.age} years old`;

  console.log(personalizedGreeting);
}

persons.map(greetPerson);
```

===

### Exercise 2 [⚙️](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgKoGdrIN4ChnIhwC2EAXMumFKAOYDcuAvrrqJLIigIIAmxoZBAAekEL3RpMUHPmRQA9gBtyyAEToArgAdoa5AB91IBVGJwlaxi1xgAnruQAFaOgUhkAXmSaQAaxMAdxBGXAR3KmRdKDcQdAoXGPcAbQBdL2RkuTwCAiJSCjUXDjUAGjkmcoIc3PzVNQApBQALEDK5AkUVQq1o9oJK3FTGIA)

Define the type Person!

```ts
interface User {
  name: string;
}

interface Admin extends User {
  role: 'super' | 'normal';
}

type Person = unknown;

const persons: Person[] = [
  {
    name: 'Peter',
  },
  {
    name: 'John',
    role: 'super',
  },
];
```

===

### Exercise 3 [⚙️](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAZwO4EMAOAKAHgLkXTAE8AaREw4kgSkIG1wBrMOVMCltjgXUQDeAKESIATgFMoIMUgblEuXkIC+QoRATIoiADZwA5gDkQAWwBGEsYgC8ibADd0ukBMJgzlsbVsA+QYiaYMhwuhIAdPoGjs6uPioA3BpaOlEAylBiMGAGtvZOLm4omdkGPjb+AoFaoRFRMYXxSUIA9C2IaRiYmKWIUKhwiB4WVsjJwToMyBJBACYUwDBi2vx2aFjYAIwUAEy0SVEmI2LY03P76m0dXT05fQPFWTljQdqIUzMIsxlPBgtL2h+pVWKC62AA5ItllBwRRwWcvuCLukSjlTp8wN9UWVmlcALIwXClcZvBgICQUfpwEHrHDg8mwxB7A6GI5ebDk5GGIFoqn7IA)

Type the `swap` function!

```ts
function swap(x: any, y: any): [unknown, unknown] {
  return [y, x];
}

const logNumber = (value: number) => {
  console.log(value);
};
const logString = (value: string) => {
  console.log(value);
};

// Swapping two numbers
const [second, first] = swap(1, 2);
logNumber(second);

// Swapping two strings
const [secondString, firstString] = swap('first', 'second');
logString(secondString);

// Mixing
const [one, two] = swap('one', 2);
logNumber(one);
logString(two);
```

## Part II

### Exercise 4 [⚙️](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAZwO4EMAOAKAHgLkXAGsw5UwAaRAT0JLIoEpCBtB8qosUzgXUQBvAFCJEAJwCmUEOKSsa1XHwDcwgL7DhAem2IAsjFwwwAc2EQEyKIlYJJ1KKjgCAvCgw4ARPa-UATExqlmDIcAA2kgB04XCm2IKI9o7OiOpMWrqIAIIAJgBu6JCSuQZGJuYh1rZQABZSDojAcLJuHlgJiGDoALaShF4AUnC1SAAicJJeadSsAIwBfEEWVhHRsfGJdQ3UzbJpGUA)

Make a generic swap function

```ts
function swap(x: unknown, y: unknown): [unknown, unknown] {
  return [y, x];
}

// Mixing
const [one, two] = swap('one', 2);
console.log({ one, two });

// Advanced Mixing
const [three, four] = swap({ name: 'John Doe' }, [1, 2]);
console.log({ three, four });
```

### Exercise 5 [⚙️](https://www.typescriptlang.org/play?#code/C4TwDgpgBASg9gG2gXigIgIYBMC2BLAOzSgB90w4B3CAJygFcBnW4stJlgbgChRIoAYhgSMQUVADNhzUlAAMstKygF6CBLPoEsECYQhYevcNAAKahAB4AKiYA0UAKIAPAMYJ6OrAD5xUDAQgRnzQAMrANHAEAObwSIx+5uqWcRAO7Mw0aN6cUAD0eVAA5Nj4BEWyRRTUdBw0Rcb8QiIoUElWzaIOWjp6BAayquo5+YVSLbIKbGjcQA)

Create the `Pull<Type,Excluded>` type

```ts
type Role = 'admin' | 'power user' | 'user';
type Falsy = false | 0 | '' | null | undefined;

type Pull<Type, Excluded> = any;

type StrongRoles = Pull<Role, 'user'>; // 'admin' | 'power user'
type False = Pull<Falsy, undefined | null>; // false | 0 | ""
```

### Exercise 6 [⚙️](https://www.typescriptlang.org/play?#code/C4TwDgpgBAggJnAKgezsqBeKBvAUFKUSALigCIYARSgfUQHlL6yBufKMAQxABtlO4pPAQIBLQVAB2AVwC2AIwgAnNiKmdZEUgGdgS0ZIDmqqAF8253LiLQAwsllgeEYBBRpMOdjdJlb9AFkABQAZAFFEMLpGZhMuXn4JYRFxUhkFZRNLS2twaBgAY2BRZEltT3gkVHQAHyh7R2dXd2Q2XAB6dqh6ADkQgE16gAkYHoBxMKgAITCQ+gB1KCGwgCUw3MhYIpLJRDzyrE5JEBYoTsI8iupopig6-2DwyJv6XCA)

How can we type ActionTypes, without repeating ourselves?

```ts
type AddTodo = {
  type: 'ADD_TODO';
  payload: {
    id: number;
    name: string;
  };
};

type CompleteTodo = {
  type: 'COMPLETE_TODO';
  payload: {
    id: number;
  };
};

type Actions = AddTodo | CompleteTodo;

// ONLY CHANGE BELOW HERE
type ActionTypes = any; // type = ADD_TODO | COMPLETE_TODO
```

### Exercise 7 [⚙️](https://www.typescriptlang.org/play?#code/MYewdgzgLgBATiANgUwjAvDA3gKBjAQQBEBZASQDkAuGAIgEMATAWwEsxaAaPGABQHkA6gFEASgH0AqgGUxNWgAcQAd2RxxAVwhquPGXLpad3AL4x6aUJCgBuHDivQYCtWwgRW4NJlz4AwqLCBAAqwlKyovLAcMj0UMia2nC6+AS8vKL8AGph+pF09AoKCABuCUbJ3PgAQgAy-H4A0uEGtABGiCDAANaJxjhmFjCOtvYA9GMw-BS1AJowfgASBBQA4sIw1cL1gjCLYsKcMET8MBT8wTCBvEGXs-ySorK1AGI4UACeLldIyBjmYA+NhgEwKLHYtBgAB86EpVOoKpCYbREe8vn9eK5WO5PGB-vRAcDQbRorF4n1ktCCkVSuUkki6B0ur1UQ4vLAXHA3B4vC8QHBRL8aASPv9fCDJoBeDcAxTsLEDMBSIejsND0NogDSwbnsADmdDytB4TDYYBoAG0AHRW-htABWyGAUAtJXoiA0qAAFJztV4AJQAXSqzhUagp5pJMTidOM1OKIDKFK4hjAyAAHtioLrxN7sTyOIGJTAZTANCn09AszmceAYNiYMoEGAdTxS2mM7rzQXQcXpAALDWIRgwMAgWDKfndAZ2IA)

Type `permissionsForRole`

```ts
const roles = {
  ADMIN: 'admin',
  POWER_USER: 'power_user',
  USER: 'user',
} as const;

const permissions = {
  CREATE_USER: 'create_user',
  APPROVE_USER: 'approve_user',
  BLOCK_USER: 'block_user',
} as const;

// ONLY CHANGE BELOW HERE, DO NOT REPEAT YOURSELF
type Role = any; // "admin" | "power_user" | "user"
type Permission = any; // "create_user" | "approve_user" | "block_user"

const permissionsForRole: any = {
  // 💣 Complains about missing "USER"
  admin: [...Object.values(permissions)],
  power_user: ['create_user', 'approve_user', 'unexisting_permission'], // 💣 unexisting_permission is wrong
  unexisting: [], // 💣 Should not work
};
```

### Exercise 8 [⚙️](https://www.typescriptlang.org/play?#code/C4TwDgpgBAwgrgZ2AewLYQE5QLxQN4BQUUAlgCYBcUAdnKgEaYDcRNAhulUhidQOYtiAYwwQ2wCGQCCwKgBFxEQVDhgyi6bKgKJLAL4sCQ5NSRQIcHsdRV4SNJhz5W5KgEYANK2ocIVAOQAopYk1v5ewqIaMlTUEADu2ooAFABMAAwZHlBu6dlunlBZUACsbgCUESpq0VpxiToQaZl5Oa0F2cVllQQGBAQA9AM5AHRQABLIiUJs1FDx0CJiElDAABbQwGwA1pvgEASgkFAAKjsQADwn+9kAktRCADZwZJIAfE6zIIZH0FIvJAkZCcZ12FzsKHQGGy-iWtX8UAAPlB-Kp1ECZP43oZjKZgFBjBhREJgI8QP8yIDJFQKVTgbhCJFlpIYjQEkkJM1irl8oVUhUqmjarF2Y0ue12nyBb1DEMimMTmsSAgoAg1sg4I9gQAzNgkR5QNgquDUbbUKZzZU0ZD4thQMAYZCQDCgKDIbWwRCQzCHfZQADK6s1ZAAcjaAOrIDDbEHncFehzQlEms0WrFMIA)

Type `Take<Type, Include>`

```ts
type Customer = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

const euricom: Customer = {
  id: 1,
  name: 'Euricom',
  createdAt: new Date(2020, 10, 11, 20, 51),
  updatedAt: new Date(2020, 10, 11, 20, 51),
};

// 1. How can we create the take type
type Take<Type, Included> = any;

type Audited = Take<Customer, 'createdAt' | 'updatedAt'>;

const correctlyAudited: Audited = {
  createdAt: new Date(2020, 10, 11, 21),
  updatedAt: new Date(2020, 10, 11, 21),
};

// 2. This should fail as unknown is not a property of Customer
type ShouldNotWork = Take<Customer, 'unknown'>;
```

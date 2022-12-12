# Exercise Unit tests

## MailSystem

```js
// smtpTransport.js
export default {
  send(mail) {
    console.log('>>>>>> Send mail to SMTP server', mail);
  },
};
```

```js
// repository.js
export default {
  getMails() {
    console.log('>>>>>> Access database to get mails');
    return [
      { id: 123, to: 'peter.cosemans@gmail.com', body: 'aaaa...' },
      { id: 123, to: 'wim.vanhoye@euri.com', body: 'bbb...' },
    ];
  },
};

```

```js
// mailSystem.js
import smtpTransport from './smtpTransport.js';
import repository from './repository.js';

const DEFAULT_FROM_ADDRESS = 'noreply@euri.com';

const mailSystem = {
  init(fromAddress = DEFAULT_FROM_ADDRESS) {
    this.fromAddress = fromAddress;
  },

  sendWelcomeMail(to, subject, model) {
    const body = `Hello ${model.name}, with this mail I...`;
    const mail = {
      toAddress: to,
      fromAddress: this.fromAddress,
      subject,
      body,
    };
    smtpTransport.send(mail);
  },

  transferMails(backend) {
    // get mail from db
    const mails = repository.getMails();

    // get filtered mails
    const filteredMails = mails.filter(mail => mail.to.includes('euri.com'));

    // transfer to backend
    backend.transfer(filteredMails);
  },
};

export default mailSystem;
```

```js
// mailSystem.spec.js
import { test } from 'vitest';
import mailSystem from './mailSystem.js';

test('should handle...', () => {
  // arrange
  const to = '...';
  const subject = '...';
  const model = '...';

  // act
  mailSystem.sendWelcomeMail(to, subject, model);

  // assert
});
```

## Async testing

Test Following async function

```js
function expire(timeout) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout Error'));
    }, timeout);
  });
}
```

Test Following API client function

```js
import axios from 'axios';

async function getContactById(peopleId) {
  try {
    const resPerson = await axios.get(`https://swapi.dev/api/people/${peopleId}`);
    const resPlanet = await axios.get(resPerson.data.homeworld);
    return {
      person: {
        name: resPerson.data.name,
      }
      planet: {
        name: planet.name,
        population: planet.population,
      },
    };
  }
  catch(err) {
    if (err.status === 404) {
      return null;
    }
    throw err;
  }
}
```

## Async

```ts
export function expire(timeout: number): Promise<void> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout Error'));
    }, timeout);
  });
}
```

```ts
export async function getContactById(peopleId: number): Promise<any | null> {
  try {
    const resPerson = await axios.get(`https://swapi.dev/api/people/${peopleId}`);
    const resPlanet = await axios.get(resPerson.data.homeworld);
    return {
      person: {
        name: resPerson.data.name,
      },
      planet: {
        name: resPlanet.data.name,
        population: resPlanet.data.population,
      },
    };
  } catch (err) {
    if ((err as any).status === 404) {
      return null;
    }
    throw err;
  }
}
```


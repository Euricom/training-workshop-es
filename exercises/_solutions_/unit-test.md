# Exercise Unit Testing

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
import { describe, test, expect, vi } from 'vitest';
import mailSystem from './mailSystem';
import smtpTransport from './smtpTransport';
import repository from './repository';

describe('mainSystem', () => {
  describe('sendWelcomeMail', () => {
    let to;
    let subject;
    let model;
    let mockTransport;
    let mockRepo;
    beforeEach(() => {
      to = 'jane.zoe@euri.com';
      subject = 'Welcome';
      model = {
        name: 'peter',
      };
      mockTransportSend = vi.spyOn(smtpTransport, 'send');
      mockRepogetMails = vi.spyOn(repository, 'getMails');
    });

    test('have default from address', () => {
      // arrange

      // act
      mailSystem.init();

      // arrange
      expect(mailSystem.fromAddress).toEqual('noreply@euri.com');
    });

    test('set from address', () => {
      // arrange
      const fromAddress = 'john.bar@euri.com';

      // act
      mailSystem.init(fromAddress);

      // arrange
      expect(mailSystem.fromAddress).toEqual(fromAddress);
    });

    test('send correct mail', () => {
      // arrange
      const fromAddress = 'john.bar@euri.com';

      // act
      mailSystem.init(fromAddress);
      mailSystem.sendWelcomeMail(to, subject, model);

      // assert
      expect(mockTransportSend).toHaveBeenCalled();
      const mail = mockTransportSend.mock.calls[0][0];

      // expect(mail).toMatchSnapshot();
      expect(mail.fromAddress).toEqual(fromAddress);
      expect(mail.subject).toEqual(subject);
      expect(mail.toAddress).toEqual(to);
      expect(mail.body).toMatch('Hello peter');
    });

    test('use default from address when not provided', () => {
      // arrange

      // act
      mailSystem.init();
      mailSystem.sendWelcomeMail(to, subject, model);

      // assert
      expect(mockTransportSend.mock.calls[0][0].fromAddress).toBe(
        'noreply@euri.com',
      );
    });
  });

  describe('transferMails', () => {
    it('should transfer filtered mails to backend', () => {
      // arrange
      const backend = {
        transfer: vi.fn(),
      };
      const mails = [
        { id: 123, to: 'peter.cosemans@gmail.com', body: 'aaaa...' },
        { id: 456, to: 'wim.vanhoye@euri.com', body: 'bbb...' },
      ];
      vi.spyOn(repository, 'getMails').mockReturnValue(mails);

      // act
      mailSystem.transferMails(backend);

      // assert
      const filteredMails = backend.transfer.mock.calls[0][0];

      expect(repository.getMails).toHaveBeenCalled();
      expect(backend.transfer).toHaveBeenCalled();
      expect(filteredMails).toBeArrayOfSize(1);
      expect(filteredMails[0].id).toEqual(456);
    });
  });
});
```

## Async

```js
import { describe, test, vi, expect } from 'vitest';
import invariant from 'tiny-invariant';
import axios, { AxiosError } from 'axios';
import { expire, getContactById } from './async';

describe('expire', async () => {
  test('error', async () => {
    expect.assertions(1);
    try {
      await expire(100);
    } catch (err) {
      invariant(err instanceof Error, 'error is instance of Error');
      expect(err.message).toBe('Timeout Error');
    }
  });
});

describe('getContactById', async () => {
  test('success', async () => {
    // arrange
    const getMock = vi
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({
        data: {
          name: 'Luke Skywalker',
          homeworld: 'https://swapi.dev/api/planets/1',
        },
      })
      .mockResolvedValueOnce({
        data: {
          name: 'Tatooine',
        },
      });

    // act
    const contact = await getContactById(1);

    // assert
    expect(contact).toBeDefined();
    expect(contact.person.name).toBe('Luke Skywalker');
    expect(getMock).toBeCalledTimes(2);
    expect(getMock).toBeCalledWith('https://swapi.dev/api/people/1');
    expect(getMock).toBeCalledWith('https://swapi.dev/api/planets/1');
  });

  test('not found', async () => {
    const error = new AxiosError('not found', '', {}, null, { status: 404 } as any);
    const getMock = vi
      .spyOn(axios, 'get')
      .mockRejectedValue(error)
      .mockResolvedValueOnce({
        data: {
          name: 'Tatooine',
        },
      });

    // act
    const contact = await getContactById(1);
  });

  test('other error', async () => {
    const error = new Error('bad bad');
    const getMock = vi.spyOn(axios, 'get').mockRejectedValue(error);

    // act
    expect.assertions(1);
    try {
      const contact = await getContactById(1);
    } catch (err) {
      // assert
      expect(err).toBe(error);
    }
  });
});
```



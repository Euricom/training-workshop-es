---
title: Euricom - JavaScript Module Systems
theme: euricom
lineNumbers: true
---

# Javascript Modules Systems

<img src="/js-modules.jpg" class="h-70 rounded-3xl"  />

<div class="absolute bottom-10">
  <small>
  Copyright (c) 2017-2022 Euricom nv.
  </small>
</div>

---
layout: big-points
---

# Javascript modules systems

- IIFE (Revealing Module Pattern)
- CommonJS (Node module pattern)
- AMD (Asynchronous Module Definition)
- UMD (Combination of IIFE, CommonJS, AMD)
- ES Modules (ECMAScript Modules)

---

# IIFE - Revealing module pattern

```js
var myModule = (function () {
    var privateVar = "Ben Cherry",

    function privateFunction() {
        console.log( "Name:" + privateVar );
    }

    function publicSetName( strName ) {
        privateVar = strName;
    }

    return {
        setName: publicSetName,
        greeting: publicVar,
    };
})();

myModule.setName('Paul Kinlan');
```

See also [JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)

---

# CommonJS - The nodeJS module pattern

```js
// myLib.js
module.exports = {
  setName: function () {},
};

// main.js
const myLib = require('./mylib.js');
myLib.setName();
```

> Used by nodeJS (webpack.config.js, .eslintrc.js, ...)

<div class="mt-10 grid grid-cols-[1fr,2fr] gap-x-3" >
<div class="code-small">
eslintrc.js example 

```js
module.exports = {
    extends: "eslint:recommended",
    rules: {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
```
</div>

<div class="code-small">
babel.config.js example 

```js
module.exports = {
    presets: [
        [
          '@babel/preset-env', 
          { modules: isTest ? 'commonjs' : false }
        ],
        '@babel/preset-react',
    ]
}
```
</div>
</div>

---
layout: image-left
image: https://www.mensjournal.com/wp-content/uploads/mf/sprinting_running_cardio_main.jpg?w=1000&h=563&crop=1&quality=78&strip=all
class: code-small
---

# Exercise - CJS

Create the calculator for nodeJS (main.js & calc.js)

- Provider add & mul
- Use commonJS for the calc module
- call add method from main.js

```bash
# run the calculator
node main.js
```

Optional

- Allow 'add' & 'mul' methods to be called from the command line
- User 'process.argv' to get arguments

```bash
# run the calculator
node main.js add 1 2  # output 1 + 2 = 3
node main.js mul 2 2  # output 2 x 2 = 4
```

---

## AMD

Powered by [RequireJS](https://requirejs.org/)

```js
// foo.js
define(['jquery'], function ($) {
  // methods
  function myFunc() {}

  // exposed public methods
  return {
    doSomething: myFunc,
  };
});
```

```js
// main.js
require(['foo'], function (foo) {
  // rest of your code here
  foo.doSomething();
});
```

---

# Universal Module Definition (UMD)

> Combination of IIFE, CommonJS, AMD (example: [big.js](https://github.com/MikeMcl/big.js/))

```js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));
```

---

# ECMAScript Module Pattern (ESM)

> ESM is the present and the future

<div class="mt-10 grid grid-cols-[1fr,2fr] gap-x-3" >
<div>

myService.js

```js
// named export
export const MAX_LENGTH = 1000;
export class Car() {
    ...
}

// default (unnamed) export
const config = {
    ...
}
export default config;
```

</div>

<div>

main.js

```js
// default import
import config from './service';

// named imports
import { MAX_LENGTH, Car } from './service';

// with alias
import { Car as MyCar } from './service';

// import all
import * as lib from './service';
```

</div>
</div>

ES Modules are supported by all modern browsers, <br>WebPack, Vite, Snowpack, Babel, NodeJS 14+

--- 
slideTitle: Using ESM 
titleRow: true
cols: 1-1 
---

ESM in nodeJS

```json
// Specify 'module' type in package.json
{
  "name": "myApp",
  "version": "0.2.0",
  "type": "module",
  "dependencies": {
    ...
  }
}
```

```js
// need to specify file extension 
import { add } from './calc.js';
```

::right::

ESM in browser


```html
<body>
  <!-- Specify 'module' type in script -->
  <script type="module" 
          src="./calc.js">
  </script>
</body>
```

> Modern build tools like `vite` are using this to speed up the build process

---

# Special Cases

```js
// import the contents of the entire module
import * as lib from './service';

// re-export all from the module
export * from './service';

// export default export from MyComponent as named export MyComponent
export { default as MyComponent } from './MyComponent';

// dynamic import 
const { sayHi } = await import('./service.js');

// import from URL (browser & deno)
import React from "https://esm.sh/react"
```


---
layout: image-right
image: https://47h07141n4wr3s4gyj49ii1d-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/Beautiful-Reverse-Warrior-ot-Sunset-on-Rock-over-Ocean-copy-1-e1517104262553.jpeg
class: code-small
---

## Exercise - ESM

- Create a calculator with ES Modules (calc.esm.js) and

  - Use it natively in nodejs
  - Use it natively in browser
  
- (optional) Create a calculator with UMD format (calc.umd.js) so you can use it in nodeJS and in browser

See also [What is AMD, CommonJS, and UMD?](http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/)


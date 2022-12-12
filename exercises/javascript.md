# Exercise Javascript

# This

```js
globalThis.fullname = 'John Doe'; = 'John Doe';
const obj = {
  fullname: 'Colin Ihrig',
  prop: {
    fullname: 'Aurelio De Rosa',
    getFullname: function() {
      return this.fullname;
    }
  }
};
const test = obj.prop.getFullname;
console.log(test());
```

Make the console.log() prints 'Aurelio De Rosa'.<br>
Don't change the obj!

---

## Module Systems

> Build a calculator module and use it the browser

- Use index.html, main.js & calc.js
- Isolate the calculator with an iffe
- HTML Tips

```html
<input type="text" id="val1" />
<input type="text" id="val2" />
<button id="myBtn">Add</button>
```

```
    // response to button click
    document.getElementById("myBtn").addEventListener("click", function() {
        const val1 = document.getElementById('val1').value;
        const val2 = document.getElementById('val2').value;
        const result = calc.sum(val1, val2);
        console.log(result);
    })
});
```

> Refactor the calculator and use it in nodeJS

- Use commonJS for the calculator module
- Access the calculator via command line

> Use 3th party library for parsing the command line arguments

- Add 'Yargs' module as command line argument parser

> Refactor calculator in UMD module format and use calc in browser and nodeJS


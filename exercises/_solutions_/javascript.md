# Solutions - JavaScript exercises


# This

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

Make the console.log() prints 'Aurelio De Rosa'.<br>
Don't change the obj! Go for multiple solutions

```js
const test = obj.prop.getFullname;
console.log(obj.prop.getFullname()); // output 'Aurelio De Rosa'
console.log(test.call(obj.prop)); // output 'Aurelio De Rosa'
const fn = test.bind(obj.prop);
console.log(fn); // output 'Aurelio De Rosa'
```

## Prototype - How can we implement looping with a callback?

```js
myForEach([0, 1, 2], function (value, index) {
  console.log(value, this[index] === value /* should be true */);
})[
  // make it work with
  (0, 1, 2)
].myForEach(function (value) {
  console.log(value);
});
```

```js
function myForEach(array, fn) {
  for (var i = 0; i < array.length; i++) {
    fn.call(array, array[i], i);
  }
}

Array.prototype.myForEach = function (fn) {
  myForEach(this, fn);
};
```

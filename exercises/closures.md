# Javascript Closures

## Write a function that takes an argument and returns that argument.

    identify(3)  // 3

<img src="./solution.jpeg" width="300">

    function identity(x) {
        return x;
    }

    // or
    var identity = function(x) {
        return x;
    }

## Write two binary functions add and mul, that takes two numbers and return their sum and products.

    add(3, 4)   // 7
    mul(3, 4)   // 12

<img src="./solution.jpeg" width="300">

    function add(x, y) {
        return x + y;
    }

    function mul(x, y) {
        return x * y;
    }

## Write a function that takes an argument and return a function that returns that argument;

    const idf = identityf(3);
    const result = idf();  // 3

<img src="./solution.jpeg" width="300">

    function identityf(arg) {
        return function() {
            return arg;
        }
    }

## Write a function that adds from two invocations:

    const result = addf(3)(4)  // 7

<img src="./solution.jpeg" width="300">

    function addf(x) {
        return function(y) {
            return x + 7;
        }
    }

## Write a function that takes a binary function (like add), and makes it callable with two invocations.

    const addf = applyf(add);
    const result1 = addf(3)(4)           // 7
    const result2 = applyf(mul)(5)(6)    // 30

<img src="./solution.jpeg" width="300">

    function applyf(fn) {
        return function(x) {
            return function(y) {
                return fn(x, y);
            }
        }
    }

## Write a function that takes a function and an argument, and returns a function that can supply a second argument.

    const add3 = curry(add, 3);
    const result1 = add3(4)              // 7
    const result2 = curry(mul, 5)(6)     // 30

<img src="./solution.jpeg" width="300">

    function curry(fn, x) {
        return function(y) {
            return fn(x, y);
        }
    }

## Without writing any new function (using existing functions), show three ways to create the inc function

    inc(5)          // 6
    inc(inc(5))     // 7

<img src="./solution.jpeg" width="300">

    inc = addf(1);
    inc = applyf(add)(1);
    inc = curry(add, 1);

## Write 'methodize', a function that converts a binary function to a method.

    Number.prototype.add = methodize(add);
    (3).add(4)      // 7

<img src="./solution.jpeg" width="300">

    function methodize(fn) {
        return function(y) {
            return fn(this, y);
        }
    }

## Write 'demethodize', a function that converts a method to a binary function

    demethodize(Number.prototype.add)(5, 6) // 11

<img src="./solution.jpeg" width="300">

    function demethodize(fn) {
        return function(that, y) {
            return fn.call(that,y);
        }
    }

# Write a function 'twice' that takes a binary function and returns a unary function that passes its argument to the binary function twice.

    var double = twice(add);
    const result1 = double(11)  // 22
    var square = twice(mul);
    const result2 = square(11)  // 121

<img src="./solution.jpeg" width="300">

    function twice(fn) {
        return function(x) {
            return fn(x, x);
        }
    }

## Write a function 'compose' that takes two unary functions and return a unary function that calls them both.

    const result = compose(double, square)(3)     // 36

<img src="./solution.jpeg" width="300">

    function compose(fn1,fn2) {
        return function(x) {
            return fn2(fn1(x));
        }
    }

## Write a function 'composeb' that takes two binary functions and return a function that calls them both.

    const result = composeb(add, mul)(2,3,5);      // 25

<img src="./solution.jpeg" width="300">

    function composeb(fn1, fn2) {
        return function(x,y,z) {
            return fn2(fn1(x,y), z);
        }
    }

## Write a function that allows another function to only be called once.

    add_once    = once(add);
    const result1 = add_once(3, 4)  // 7
    const result2 = add_once(3, 4)  // throw;

<img src="./solution.jpeg" width="300">

    function once(fn) {
        return function(x, y) {
            var f = fn;
            fn = null;
            return f.apply(this, arguments);
        }
    }

## Write a factory function that returns two functions that implement and up/down counter;

    counter = counterf(10);
    const result1 = counter.inc();  // 11
    const result2 = counter.dec();  // 10

<img src="./solution.jpeg" width="300">

    function counterf(x) {
        return {
            inc() {
                x = x + 1;
                return x;
            }
            dec() {
                x = x - 1;
                return x;
            }
        }
    }

## Write a revocable function that takes a 'nice' function, and returns a 'revoke' function that denies access to the nice function, and invoke function that can invoke the nice function until it is revoked.

(don't use a boolean flag)

    temp = revocable(alert);
    temp.invoke(7);     // alert: 7
    temp.revoke();
    temp.invoke(8);     // throw;

<img src="./solution.jpeg" width="300">

    function revocable(fn) {
        return {
            invoke: function(x) {
                fn.apply(x, arguments);
            },
            revoke: function() {
                fn = null;
            }
        }
    }

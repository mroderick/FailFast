# FailFast helps you detect errors in your code faster

You can use FailFast to safeguard functions from bad input, and giving the caller an early warning that bad input is being passed.

<pre>
<code>
// define a function, using FailFast to protect itself from bad input
function myFunction( myParam ){
        FailFast.assert.isNumber( 'myParam must be a number, you passed: ' + myParam, myParam );
        // your real code here
}

// call the function with bad input
myFunction( 'lorem ipsum' );

// throws Error with message property of
// "myParam must be a number, you passed: lorem ipsum"
// the execution will be halted, and the developer will immediately see
// what he's done wrong
</code>
</pre>

## Implemented methods

* FailFast.assert
* FailFast.assert.isNotNull
* FailFast.assert.isBoolean
* FailFast.assert.isString
* FailFast.assert.isArray
* FailFast.assert.isFunction
* FailFast.assert.isDate
* FailFast.assert.isNumber
* FailFast.assert.isNormalNumber
* FailFast.assert.isObject
* FailFast.assert.hasProperty
* FailFast.assert.match

## More reading about failing fast

* [FailFast introduction](http://martinfowler.com/ieeeSoftware/failFast.pdf)
* [FailFast on Wikipedia](http://en.wikipedia.org/wiki/Fail-fast)
* [C2 Wiki about FailFast](http://www.c2.com/cgi/wiki?FailFast)
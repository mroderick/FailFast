# FailFast [![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

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

## Testing
The tests are done using [BusterJS](http://busterjs.org) and the excellent [Sinon.JS](http://cjohansen.no/sinon/). 

## Future of FailFast

* Build script to create the following wrappers
	* jQuery plugin
	* Ender.js wrapper
* More extensive examples of good use

## Versioning

FailFast uses [Semantic Versioning](http://semver.org/) for predictable versioning.

## Changelog

* v2.0
	* Got rid of the mandatory msg argument, as it lead to a lot of repetition for very little value
	* Grouping all functions under the assert function, should be familiar for users of Buster.JS
	* Exposing the fail function, to make it easy for users to create custom assertions
	
## License

MIT: http://mrgnrdrck.mit-license.org

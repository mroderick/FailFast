/*!
Copyright (c) 2010 Morgan Roderick http://roderick.dk

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*jslint evil: false, strict: false, undef: true, white: false, onevar:false, plusplus:false */
/**
 *  @version 1.0
 *  @author Morgan Roderick
 *  @description   
 *  FailFast helps you detect errors in your code faster.
 *  You can use FailFast to safeguard functions from bad input, and give the caller an early warning that bad input
 *  is being passed.
 *
 *  @namespace Holds assertion functions
 *
 *  @example
 *  // define a function, using FailFast to protect itself from bad input
 *  function myFunction( myParam ){
 *      FailFast.assertNumber( 'myParam must be a number, you passed: ' + myParam, myParam );
 *      // your real code here
 *  }
 * 
 *  // call the function with bad input
 *  myFunction( 'lorem ipsum' );
 * 
 *  // throws Error with message property of 
 *  // "myParam must be a number, you passed: lorem ipsum"
 *  // the execution will be halted, and the developer will immediately see 
 *  // what he's done wrong
 * 
 *  @see <a href="http://martinfowler.com/ieeeSoftware/failFast.pdf">http://martinfowler.com/ieeeSoftware/failFast.pdf</a>
 *  @see <a href="http://en.wikipedia.org/wiki/Fail-fast">http://en.wikipedia.org/wiki/Fail-fast</a>
 *  @see <a href="http://www.c2.com/cgi/wiki?FailFast">http://www.c2.com/cgi/wiki?FailFast</a>
 */
var FailFast = (function(undef){    
    
    /**
     *  Throws Errors
     *  @private
     */
    function fail( msg ){
        var error = new Error( msg );
        error.name = 'FailFast.AssertError';
        error.message = error.message || msg;
        throw error;
    }
    
    return (
        /** @lends FailFast */ {
        
        VERSION : '1.0',
        
        /**
         *  Asserts that the passed value is true
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Boolean } value The value to examine
         *  @returns { Boolean }
         *  @throws Error
         */
        assert : function( msg, value ){
            return value === true || fail( msg );
        },

        /**
         *  Asserts that the passed value is not null
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param {} value The value to examine
         *  @returns { Boolean }
         *  @throws Error
         */
        assertNotNull : function( msg, value ){
            return value !== null || fail( msg );
        },
        
        /**
         *  Asserts that the passed value is a Boolean
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Boolean } value The value to examine
         *  @returns { Boolean }
         *  @throws Error
         */
        assertBoolean : function( msg, value ){
            return value !== undef && Object.prototype.toString.call(value) === '[object Boolean]' || fail( msg );
        },

        /**
         *  Asserts that the passed expression is a string, accepts both string literals and instances of String
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { String } value The value to examine
         *  @returns { Boolean }
         *  @throws Error
         */
        assertString : function( msg, value ){
            return value !== undef && Object.prototype.toString.call(value) === '[object String]' || fail( msg );
        },

        /**
         *  Asserts that the passed expression is an Array
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Array } value The value to examine
         *  @returns { Boolean }
         *  @throws Error
         */
        assertArray : function( msg, value ){
            return value !== undef && Object.prototype.toString.call(value) === '[object Array]' || fail( msg );
        },

        /**
         *  Asserts that the passed expression is a Function
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Function } value The value to examine
         *  @returns { Boolean }
         *  @throws Error
         */
        assertFunction : function( msg, value ){        
            return value !== undef && Object.prototype.toString.call(value) === "[object Function]" || fail( msg );
        },

        /**
         *  Asserts that the passed value is a Date
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Date } value The value to examine
         *  @returns { Boolean }
         *  @throws Error
         */
        assertDate : function( msg, value ){
            return value !== undef && Object.prototype.toString.call(value) === '[object Date]' || fail( msg );
        },        

        /**
         *  Asserts that the passed value is a Number
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Number } value The value to examine
         *  @returns { Boolean }
         *  @throws Error
         */
        assertNumber : function( msg, value ){
            return Object.prototype.toString.call(value) === '[object Number]' || fail( msg );
        },

        /**
         *  Asserts that the passed expression is a number and asserts that the passed expression is not: 
         *      NaN,
         *      Number.MAX_NUMBER,
         *      Number.MIN_NUMBER,
         *      Number.NEGATIVE_INFINITY,
         *      Number.POSITIVE_INFINITY
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Number } value The value to examine
         *  @returns { Boolean }
         *  @throws Error
         */
        assertNormalNumber : function( msg, value ){
            return (
                +value === value &&
                isFinite(value) ||
                fail( msg )
            );
        },

        /**
         *  Asserts that the passed expression is an Object, i.e. has Object in it's prototype chain
         *  This will fail for Arrays, Dates, Strings, Numbers and Booleans
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Object } value The value to examine
         *  @returns { Boolean }
         *  @throws Error
         */
        assertObject : function( msg, value ){
            return value !== undef && Object.prototype.toString.call(value) === '[object Object]' || fail( msg );
        },

        /**
         *  Asserts that an object has a property
         *  This method checks the entire prototype chain
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Object } object The object to examine
         *  @param { String } propertyName The property to check for
         *  @returns { Boolean }
         *  @throws Error
         */
        assertHasProperty : function( msg, object, propertyName ){
            return propertyName in object || fail( msg );
        }
    });    
}()); 
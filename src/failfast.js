/*
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
 * section: FailFast
 * [[FailFast]] helps you detect errors in your code faster.
 * You can use [[FailFast]] to safeguard functions from bad input, and giving the caller an early warning that bad input
 * is being passed.
 *
 *     // define a function, using FailFast to protect itself from bad input
 *     function myFunction( myParam ){
 *             FailFast.assertNumber( 'myParam must be a number, you passed: ' + myParam, myParam );
 *             // your real code here
 *     }
 *
 *     // call the function with bad input
 *     myFunction( 'lorem ipsum' );
 *
 *     // throws Error with message property of 
 *     // "myParam must be a number, you passed: lorem ipsum"
 *     // the execution will be halted, and the developer will immediately see 
 *     // what he's done wrong
 * 
 * <ul>
 *     <li><a href="http://martinfowler.com/ieeeSoftware/failFast.pdf">FailFast introduction</li>
 *     <li><a href="http://en.wikipedia.org/wiki/Fail-fast">FailFast on Wikipedia</a></li>
 *     <li><a href="http://www.c2.com/cgi/wiki?FailFast">C2 Wiki about FailFast</a></li>
 * </ul>
**/
var FailFast = (function(undef){    
    
    function fail( msg ){
        var error = new Error( msg );
        error.name = 'FailFast.AssertError';
        error.message = error.message || msg;
        throw error;
    }
    
    return {
        
        VERSION : '0.0',
        
        /**
         *  FailFast.assert( value [, msg]  ) -> undefined
         *  - msg (String): A message to pass as part of the Error generated  
         *  - value: An expression to be examined
         *  Asserts that the passed value evaluates to true
        **/ 
        assert : function( msg, value ){
            return value === true || fail( msg );
        },

        /**
         *  FailFast.assertNotNull( value [, msg] ) -> undefined
         *  - value: An expression to be examined
         *  - msg (String): A message to pass as part of the Error generated  
         *  Asserts that the passed expression is not null
        **/
        assertNotNull : function(  msg, value ){
            return value !== null || fail( msg );
        },
        
        /**
         *  FailFast.assertBoolean( value [, msg] ) -> undefined
         *  - msg (String): A message to pass as part of the Error generated  
         *  - value: An expression to be examined
         *  Asserts that the passed expression is a Boolean, no truthy or falsy values here
        **/     
        assertBoolean : function( msg, value ){
            return value !== undef && Object.prototype.toString.call(value) === '[object Boolean]' || fail( msg );
        },

        /**
         *  Asserts that the passed expression is a string, accepts both string literals and instances of String
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { String } value The value to examine
         *  @throws Error
         */
        assertString : function( msg, value ){
            return value !== undef && Object.prototype.toString.call(value) === '[object String]' || fail( msg );
        },

        /**
         *  Asserts that the passed expression is an Array
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Array } value The value to examine
         *  @throws Error
         */
        assertArray : function( msg, value ){
            return value !== undef && Object.prototype.toString.call(value) === '[object Array]' || fail( msg );
        },

        /**
         *  Asserts that the passed expression is a Function
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Function } value The value to examine
         *  @throws Error
         */
        assertFunction : function( msg, value ){        
            return value !== undef && Object.prototype.toString.call(value) === "[object Function]" || fail( msg );
        },

        /**
         *  Asserts that the passed value is a Date
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Date } value The value to examine
         *  @throws Error
        **/
        assertDate : function( msg, value ){
            return value !== undef && Object.prototype.toString.call(value) === '[object Date]' || fail( msg );
        },        

        /**
         *  FailFast.assertNumber( value [, msg ] ) -> undefined
         *  - msg (String): A message to pass as part of the Error generated  
         *  - value: An expression to be examined
         *  Asserts that the passed expression is a number, accepts both number literals and instances of Number
        **/    
        assertNumber : function( msg, value ){
            return Object.prototype.toString.call(value) === '[object Number]' || fail( msg );
        },

        /**
         *  FailFast.assertNormalNumber( value [, msg ] ) -> undefined
         *  - value: An expression to be examined
         *  - msg (String): A message to pass as part of the Error generated  
         *  Asserts that the passed expression is a number and asserts that the passed expression is not: 
         *      NaN,
         *      Number.MAX_NUMBER,
         *      Number.MIN_NUMBER,
         *      Number.NEGATIVE_INFINITY,
         *      Number.POSITIVE_INFINITY
        **/
        assertNormalNumber : function( msg, value ){
            return (
                Object.prototype.toString.call(value) === '[object Number]' && 
                !isNaN( value ) &&
                value !== Number.MIN_VALUE &&
                value !== Number.MAX_VALUE &&
                value !== Number.NEGATIVE_INFINITY &&
                value !== Number.POSITIVE_INFINITY ||
                fail( msg )
            );
        },

        /**
         *  FailFast.assertObject( value [, msg ] ) -> undefined
         *  - value: An expression to be examined
         *  - msg (String): A message to pass as part of the Error generated  
         *  Asserts that the passed expression is an Object, i.e. has Object in it's prototype chain
         *  This will fail for Arrays, Dates, Strings, Numbers and Booleans
        **/
        assertObject : function( msg, value ){
            return value !== undef && Object.prototype.toString.call(value) === '[object Object]' || fail( msg );
        },

        /**
         *  FailFast.assertInstanceOf( klass, value [, msg ] ) -> undefined
         *  - msg: (String): A message to pass as part of the Error generated  
         *  - klass: (Object): The object 
         *  - value: An expression to be examined
         *  Asserts that the passed expression is an instance of the passed Class (klass)
         *  Use this method with caution, as it makes testing a lot harder, when you cannot use duck typing
        **/
        assertInstanceOf : function( msg, klass, value ){
            return value !== undef && value instanceof klass || fail( msg );
        },

        /**
         *  Asserts that an object has a property
         *  This method checks the entire prototype chain
         *  @param { String } msg The message to provide as part of the thrown Error
         *  @param { Object } object The object to examine
         *  @param { String } propertyName The property to check for
         */
        assertHasProperty : function( msg, object, propertyName ){
            return propertyName in object || fail( msg );
        }
    };    
}()); 
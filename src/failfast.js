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
/*global console:true, jstestdriver:true */
/**
    @description
    <p>
        FailFast helps you detect errors in your code faster.
    </p>
    <p>
        You can use FailFast to safeguard functions from bad input, and giving the caller an early warning that bad input is being passed.
    </p>
    <ul>
        <li><a href="http://martinfowler.com/ieeeSoftware/failFast.pdf">FailFast introduction</li>
        <li><a href="http://en.wikipedia.org/wiki/Fail-fast">FailFast on Wikipedia</a></li>
        <li><a href="http://www.c2.com/cgi/wiki?FailFast">C2 Wiki about FailFast</a></li>
    </ul>

    @example
    // define a function, using FailFast to protect itself from bad input
    function myFunction( myParam ){
            FailFast.assertNumber( myParam, 'myParam must be a number, you passed: ' + myParam );
            // your real code here
    }

    // call the function with bad input
    myFunction( 'lorem ipsum' );

    // throws Error with message property of 
    // "myParam must be a number, you passed: lorem ipsum"
    // the execution will be halted, and the developer will immediately see 
    // what he's done wrong
    
    @version 0.1
    @author <a href="mailto:morgan@roderick.dk">Morgan Roderick</a>
    @namespace Holds functions for failing fast :-)
 */
var FailFast = {
    
    /**
     * Asserts that the passed expression evaluates to true
     * @param { expression } exp The expression to evaluate
     * @param { String } message The message to provide as part of the thrown AssertException
     * @throws Error
     * 
     */
    assert : function( exp, msg ){
        var message = msg || 'FailFast.assert: The passed expression is not true';        
        if ( exp !== true ){
            if ( console && console.error && typeof jstestdriver === "undefined" ){
                console.error( message );
            }
            throw ( new Error( message ) );            
        }
    },

    /**
     *  Asserts that the passed expression is a Boolean, no truthy or falsy values here
     *  @param { expression } exp The expression to evaluate
     *  @param { String } message The message to provide as part of the thrown AssertException
     */     
    assertBoolean : function( exp, msg ){
        var message = msg || 'FailFast.assertNumber: The passed argument is not a Boolean';
        this.assert( typeof exp === 'boolean', message );
    },

    /**
     * Asserts that the passed expression is not null
     * @param { expression } exp The expression to evaluate
     * @param { String } message The message to provide as part of the thrown AssertException
     * @throws Error
     */
    assertNotNull : function( exp, msg ){
        var message = msg || 'FailFast.assertNumber: The passed argument is null';
        this.assert( exp !== null, message );
    },

    /**
     * Asserts that the passed expression is a number, accepts both number literals and instances of Number
     * @param { expression } exp The expression to evaluate
     * @param { String } message The message to provide as part of the thrown Error
     * @throws Error
     */
    assertNumber : function ( exp, msg ){
        var message = msg || 'FailFast.assertNumber: The passed argument is not a Number';
        this.assert( !isNaN(parseInt(exp, 10)), message);
    },

    /**
     * Asserts that the passed expression is a number
     * Asserts that the passed expression is not: 
     *      NaN,
     *      Number.MAX_NUMBER,
     *      Number.MIN_NUMBER,
     *      Number.NEGATIVE_INFINITY,
     *      Number.POSITIVE_INFINITY
     * @param { expression } exp The expression to evaluate
     * @param { String } message The message to provide as part of the thrown Error
     * @throws Error
     */
    assertNormalNumber : function( exp, msg ){
        var message = msg || 'FailFast.assertNormalNumber: The passed argument is not a "normal" Number';
        this.assertNumber( exp, message );
        this.assert( !isNaN( exp ), message );
        this.assert( exp !== Number.MIN_VALUE, message );
        this.assert( exp !== Number.MAX_VALUE, message );
        this.assert( exp !== Number.NEGATIVE_INFINITY, message );
        this.assert( exp !== Number.POSITIVE_INFINITY, message );
    },
    
    /**
     * Asserts that the passed expression is an object, null is NOT accepted
     * @param { expression } exp The expression to evaluate
     * @param { String } message The message to provide as part of the thrown AssertException
     * @throws Error
     */
    assertObject : function( exp, msg ){
        var message = msg || 'FailFast.assertObject: The passed argument is not an Object';
        this.assertNotNull( exp, message );
        this.assert( typeof exp === 'object', message );  
    },
    
    /**
     * Asserts that the passed expression is an instance of the passed Class (klass)
     * Use this method with caution, as it makes testing a lot harder, when you cannot use duck typing
     * @param { expression } exp The expression to evaluate
     * @param { String } message The message to provide as part of the thrown AssertException
     * @throws Error
     */
    assertInstanceOf : function ( klass, exp, msg ){
        var message = msg || 'FailFast.assertInstanceOf: The passed argument is not an instance of the specified class';
        this.assert( exp !== undefined, message );
        this.assert( exp instanceof klass, message );
    },

    /**
     * Asserts that an object has a property
     * This method checks the entire prototype chain
     * @param { Object } object The object to examine
     * @param { String } propertyName The property to check for
     * @param { String } message The error message to pass in the error object
     */
    assertHasProperty : function( object, propertyName, msg ){
        var message = msg || 'FailFast.assertHasProperty: The passed object does not have a property named "%d"'.replace( '%d', propertyName );
        this.assert( propertyName in object, message );
    },

    /**
     * Asserts that the passed expression is a string, accepts both string literals and instances of String
     * @param { expression } exp The expression to evaluate
     * @param { String } message The message to provide as part of the thrown AssertException
     * @throws Error
     */
    assertString : function( exp, msg ){
        var message = msg || 'FailFast.assertString: The passed argument is not a String';
        this.assert( exp !== undefined && typeof exp === 'string' || exp instanceof String, message );
    },
    
    /**
     * Asserts that the passed expression is an Array
     * @param { expression } exp The expression to evaluate
     * @param { String } msg The message to provide as part of the thrown AssertException
     * @throws Error
     */
    assertArray : function( exp, msg ){
        var message = msg || 'FailFast.assertArray: The passed argument is not an Array';
        this.assert( exp !== undefined, msg );
        this.assert( Object.prototype.toString.call(exp) === "[object Array]", message );
    },
    
    /**
     *  Asserts that the passed expression is a Function
     * @param { expression } exp The expression to evaluate
     * @param { String } msg The message to provide as part of the thrown AssertException
     * @throws Error
     */
    assertFunction : function( exp, msg ){
        var message = msg || 'FailFast.assertFunction: The passed argument is not a Function';
        this.assert( typeof exp === 'function', msg );
    }
};
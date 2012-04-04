/*
Copyright (c) 2010,2011,2012 Morgan Roderick http://roderick.dk
License: MIT - http://mrgnrdrck.mit-license.org
*/
/*jslint white:true, plusplus:true */
/*global
	module,
	exports,
	define
*/
/**
 *	@version 2.0
 *	@author Morgan Roderick
 *	@description   
 *	FailFast helps you detect errors in your code faster.
 *	You can use FailFast to safeguard functions from bad input, and give the caller an early warning that bad input
 *	is being passed.
 *
 *	@namespace Holds assertion functions
 *
 *	@example
 *	// define a function, using FailFast to protect itself from bad input
 *	function myFunction( myParam ){
 *		FailFast.assert.isNumber( myParam );
 *		// your real code here
 *	}
 * 
 *	// call the function with bad input
 *	myFunction( 'lorem ipsum' );
 * 
 *	// throws Error with message property of 
 *	// "Expected Number but got string"
 *	// the execution will be halted, and the developer will see the mistake
 * 
 *	@see <a href="http://martinfowler.com/ieeeSoftware/failFast.pdf">http://martinfowler.com/ieeeSoftware/failFast.pdf</a>
 *	@see <a href="http://en.wikipedia.org/wiki/Fail-fast">http://en.wikipedia.org/wiki/Fail-fast</a>
 *	@see <a href="http://www.c2.com/cgi/wiki?FailFast">http://www.c2.com/cgi/wiki?FailFast</a>
 */

var FailFast = (typeof module !== "undefined" && module.exports) || {};

(function(exports){	
	
	"use strict";

	/**
	 *	Throws Errors
	 *	@private
	 */
	function fail( msg ){
		var error = new Error( msg );
		error.name = 'FailFast.Failure';
		error.message = error.message || msg;
		error.toString = function toString(){
			return ("Error: " + msg);
		};
		throw error;
	}
	
	var undef,
	
		/**
		 *	Asserts that the passed value is true
		 *	@param { Boolean } value The value to examine
		 *	@returns { Boolean }
		 *	@throws Error
		 */
		assert = function( value ){
			var msg = 'Expected value to be true';
			return value === true || fail( msg );
		};

	/**
	 *	Asserts that the passed value is not null
	 *	@param {} value The value to examine
	 *	@returns { Boolean }
	 *	@throws Error
	 */
	assert.isNotNull = function assertNotNull( value ){
		var msg = 'Expected value to not be null';
		return value !== null || fail( msg );
	};

	/**
	 *	Asserts that the passed value is a Boolean
	 *	@param { Boolean } value The value to examine
	 *	@returns { Boolean }
	 *	@throws Error
	 */
	assert.isBoolean = function assertBoolean( value ){
		var msg = 'Expected Boolean but got ' + typeof value;
		return (value !== undef && Object.prototype.toString.call(value) === '[object Boolean]') || fail( msg );
	};

	/**
	 *	Asserts that the passed expression is a string, accepts both string literals and instances of String
	 *	@param { String } value The value to examine
	 *	@returns { Boolean }
	 *	@throws Error
	 */
	assert.isString = function assertString( value ){
		var msg = 'Expected String but got ' + typeof value;
		return (value !== undef && Object.prototype.toString.call(value) === '[object String]') || fail( msg );
	};

	/**
	 *	Asserts that the passed expression is an Array
	 *	@param { Array } value The value to examine
	 *	@returns { Boolean }
	 *	@throws Error
	 */
	assert.isArray = function assertArray( value ){
		var msg = 'Expected Array but got ' + typeof value;
		return (value !== undef && Object.prototype.toString.call(value) === '[object Array]') || fail( msg );
	};

	/**
	 *	Asserts that the passed expression is a Function
	 *	@param { Function } value The value to examine
	 *	@returns { Boolean }
	 *	@throws Error
	 */
	assert.isFunction = function assertFunction( value ){		
		var msg = 'Expected Function but got ' + typeof value;
		return (value !== undef && Object.prototype.toString.call(value) === "[object Function]") || fail( msg );
	};

	/**
	 *	Asserts that the passed value is a Date
	 *	@param { Date } value The value to examine
	 *	@returns { Boolean }
	 *	@throws Error
	 */
	assert.isDate = function assertDate( value ){
		var msg = 'Expected Date but got ' + typeof value;
		return (value !== undef && Object.prototype.toString.call(value) === '[object Date]') || fail( msg );
	};

	/**
	 *	Asserts that the passed value is a Number
	 *	@param { Number } value The value to examine
	 *	@returns { Boolean }
	 *	@throws Error
	 */
	assert.isNumber = function assertNumber( value ){
		var msg = 'Expected Number but got ' + typeof value;
		return Object.prototype.toString.call(value) === '[object Number]' || fail( msg );
	};

	/**
	 *	Asserts that the passed expression is a number and asserts that the passed expression is not: 
	 *		NaN,
	 *		Number.MAX_NUMBER,
	 *		Number.MIN_NUMBER,
	 *		Number.NEGATIVE_INFINITY,
	 *		Number.POSITIVE_INFINITY
	 *	@param { Number } value The value to examine
	 *	@returns { Boolean }
	 *	@throws Error
	 */
	assert.isNormalNumber = function assertNormalNumber( value ){
		var msg = 'Expected a Number, that is not: [NaN, Number.MAX_NUMBER, Number.MIN_NUMBER, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY]. Got ' + value;
		return (+value === value && isFinite(value) ) || fail( msg );
	};

	/**
	 *	Asserts that the passed expression is an Object, i.e. has Object in it's prototype chain
	 *	This will fail for Arrays, Dates, Strings, Numbers and Booleans
	 *	@param { Object } value The value to examine
	 *	@returns { Boolean }
	 *	@throws Error
	 */
	assert.isObject = function assertObject( value ){
		var msg = 'Expected Object but got ' + typeof value;
		return (value !== undef && Object.prototype.toString.call(value) === '[object Object]') || fail( msg );
	};

	/**
	 *	Asserts that an object has a property
	 *	This method checks the entire prototype chain
	 *	@param { Object } object The object to examine
	 *	@param { String } propertyName The property to check for
	 *	@returns { Boolean }
	 *	@throws Error
	 */
	assert.hasProperty = function assertHasProperty( object, propertyName ){
		var msg = 'Expected object to have property name: ' + String(propertyName);
		return (propertyName in object) || fail( msg );
	};

	/**
	 *	Asserts that the value passed matches the regular expression
	 *	@param { RegExp } regex The regular expression to use
	 *	@param { String } value The value to examine
	 *	@returns { Boolean }
	 *	@throws { Error }
	 */
	assert.match = function assertMatch( regex, value ){
		var msg = 'Expected ' + value + ' to match expression: ' + String(regex);
		return regex.test( value ) || fail( msg );
	};
	
	exports.name = 'FailFast';
	exports.version = '2.0';
	exports.assert = assert;
	exports.fail = fail;
	
}(FailFast));
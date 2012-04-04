/*jslint white:true, browser:true, plusplus:true */
/*global
	FailFast,
	buster,
	assert,
	refute
*/
(function(){
	"use strict";
	
	buster.testCase( "FailFast", {

		"test assert function" : function() {
			try {
				FailFast.assert( 'my message', true );
			} catch(ex){
				buster.assertions.fail('should not throw Error for true');
			}

			var invalidExpressions = [ false, null, undefined, 1, "true", "", {}, new Date(), [] ],
				i, j, exp;
			for( i = 0, j = invalidExpressions.length; i < j; i++ ){
				exp = invalidExpressions[i];
				assert.exception( function(){
					FailFast.assert( 'some message', exp );
				});
			}
		},

		"test assertBoolean function" : function(){
			
			try {
				FailFast.assertBoolean( 'not a boolean value', true	 );
				FailFast.assertBoolean( 'not a boolean value', false );
			} catch(ex){
				buster.assertions.fail('should not throw Error for boolean values');
			}

			var badBooleans = [ 'true', 'false', '', {}, undefined, 0, null ],
				i, j;
			for ( i = 0, j = badBooleans.length; i < j; i++ ){
				assert.exception( function(){
					FailFast.assertBoolean( badBooleans[i] );
				});
			}
		},

		"test assertNotNull function" : function(){		   // test that no exception is thrown for valid values
			var validExpressions = [ 1, Number( 123 ), true, false, undefined, {}, [], new Date() ],
				i, j, exp;
			for ( i = 0, j = validExpressions.length; i < j; i++ ){
				exp = validExpressions[i];
				try {
					FailFast.assertNotNull( 'some message', exp );
				} catch(ex){
					buster.assertions.fail();
				}
			}

			// test that exceptions ARE trown for invalid values
			assert.exception(function(){
				FailFast.assertNotNull( 'some message', null );
			});
		},

		"test assertNumber function" : function(){

			var number = Number( 1233 ),
				invalid_expressions = [ "", [], {}, false, true, new Date() ],
				i, j;
				
			try {
				FailFast.assertNumber( 'some message', 1 );
				FailFast.assertNumber( 'some message', number ); 
			} catch(ex){
				buster.assertions.fail();
			}

			for ( i = 0, j = invalid_expressions.length; i < j; i++ ){
				assert.exception( function(){
					FailFast.assertNumber( 'some message', invalid_expressions[i] );
				});
			}
		},

		"test assertNormalNumber function" : function(){
			var number, i, j,
				validNumbers = [ 1, -1000, 1.223245, 1000000000, 0, -2414.2324 ],
				invalidNumbers = [ NaN, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ];

			for ( i = 0, j = validNumbers.length; i < j; i++ ){
				number = validNumbers[i];
				try {
					FailFast.assertNormalNumber( 'some message', number );
				} catch(ex){
					buster.assertions.fail('should not throw Error for regular Number values');
				}
			}

			for ( i = 0, j = invalidNumbers.length; i < j; i++ ){
				number = invalidNumbers[i];
				assert.exception( function(){
					FailFast.assertNormalNumber( 'some message', number );
				});
			}
		},

		"test assertObject function" : function() {
			var exp, i, j,
				validExpressions = [ {} ],
				invalidExpressions = [ 1, true, "some string literal", false, undefined, null ];
			for ( i = 0; i < validExpressions.length; i++ ) {
				exp = validExpressions[i];
				
				try {
					FailFast.assertObject( 'some message', exp );
				} catch(ex){
					buster.assertions.fail('should not throw Error for Object input');
				}
			}

			for ( i = 0, j = invalidExpressions.length; i < j; i++ ){
				exp = invalidExpressions[i];
				assert.exception( function(){
					FailFast.assertObject( 'some message', exp );
				});
			}
		},

		"test assertHasProperty function" : function(){		   
			var myObject = {
					myKey : 'myValue'
				},
				KNOWN_KEY = 'myKey',
				UNKNOWN_KEY = 'unknownKey';
			
			try {
				FailFast.assertHasProperty( 'expected object to have property', myObject, KNOWN_KEY );
			} catch(ex){
				buster.assertions.fail('should not throw Error for Object with specified property');
			}

			assert.exception( function(){
				FailFast.assertHasProperty( 'expected object to have property', myObject, UNKNOWN_KEY );
			});
		},

		"test assertString function" : function(){
			var value, i, j,
				literals	= ['', 'some string', "some double quoted string" ],
				instances	= [ String(), String( 'some string' ), String( "some double quoted string" ) ],
				nonStrings	= [ 1, null, undefined, new Date(), {}, [], true, false ];
				
			for ( i = 0, j = literals.length; i < j; i++ ){
				value = literals[i];
				try {
					FailFast.assertString( 'some message', value );
				} catch(ex){
					buster.assertions.fail();
				}
			}
			
			for ( i = 0, j = instances.length; i < j; i++ ){			
				value = instances[i];
				try {
					FailFast.assertString( 'some message', value );
				} catch(ex){
					buster.assertions.fail();
				}
			}
			
			for ( i = 0, j = nonStrings.length; i < j; i++ ){
				value = nonStrings[i];
				assert.exception( function(){
					FailFast.assertString( 'some message', value  );
				});
			}		 
		},

		"test assertArray function" : function(){
			try {
				FailFast.assertArray( 'some message', []  );
			} catch(ex){
				buster.assertions.fail('should not throw Error for Array input');
			}

			// should raise errors for non-array input
			var invalidArrays = [
				'a string that is not an array',
				null,
				true,
				false,
				NaN,
				undefined,
				{},
				123
			],
			i, j, invalidArray;

			for ( i = 0, j = invalidArrays.length; i < j; i++ ){
				invalidArray = invalidArrays[i];
				assert.exception( function(){
					FailFast.assertArray( 'some message', invalidArray );
				});
			}
		},

		"test assertFunction funciton" : function(){
			try {
				FailFast.assertFunction( 'some message', function(){} );
			} catch(ex){
				buster.assertions.fail('should not throw Error for Function input');
			}

			var badFunctions = [ new Date(), [], {}, 123, 'function', null, undefined, NaN ],
				i, j, badFunc;
			for ( i = 0, j = badFunctions.length; i < j; i++ ){
				assert.exception( function(){
					badFunc = badFunctions[i];
					FailFast.assertFunction( 'some message', badFunc );
				});
			}

			// expectAsserts( badFunctions.length + 1 );		
		},

		"test assertDate function" : function(){
			try {
				FailFast.assertDate( 'some message', new Date() );
			} catch(ex){
				buster.assertions.fail('should not throw Error for Date input');
			}

			var badDates = [ [], {}, 123, null, undefined, NaN ],
				i, j, badDate;
			for ( i = 0, j = badDates.length; i < j; i++ ){
				assert.exception( function(){
					badDate = badDates[i];
					FailFast.assertDate( 'some message', badDate );
				});
			}
		},

		"test assertMatch function" : function(){
			var VALID_REGEX = /^[a-z0-9]{32}$/,
				VALID_VALUE = '62bb7f0eef3e47fc63968142bea82002',
				INVALID_VALUES = ['', '****************', -1, new Date(), [], {} ],
				i, j, badValue;

			try {
				FailFast.assertMatch( 'some message', VALID_REGEX, VALID_VALUE );
			} catch (ex){
				buster.asssertions.fail('should not throw error for valid regex and value');
			}

			for ( i = 0, j = INVALID_VALUES.length; i < j; i++ ){
				assert.exception( function(){
					badValue = INVALID_VALUES[i];
					FailFast.assertMatch( 'some message', VALID_REGEX, badValue );
				});
			}
		}
	});	
}());
TestCase( "FailFast", {

    "test assert function" : function() {
        assertNoException( 'should not throw Error for true', function(){
            FailFast.assert( 'my message', true );
        });

        var invalidExpressions = [ false, null, undefined, 1, "true", "", {}, new Date(), [] ];
        for( var i = 0, j = invalidExpressions.length; i < j; i++ ){
            var exp = invalidExpressions[i];
            assertException( 'should throw Error for non-true values', function(){
                FailFast.assert( 'some message', exp );
            });
        }
        
        expectAsserts( invalidExpressions.length + 1 );
    },
    
    "test assertBoolean function" : function(){
        assertNoException( 'should not throw Error for true', function(){
            FailFast.assertBoolean( 'not a boolean value', true  );
        });
        
        assertNoException( 'should not throw Error for false', function(){
            FailFast.assertBoolean( 'not a boolean value', false );            
        });
        
        var badBooleans = [ 'true', 'false', '', {}, undefined, 0, null ];
        for ( var i = 0, j = badBooleans.length; i < j; i++ ){
            assertException( 'should throw Error for non-Boolean input', function(){
                FailFast.assertBoolean( badBooleans[i] );
            });
        }
    },

    "test assertNotNull function" : function(){        // test that no exception is thrown for valid values
        var validExpressions = [ 1, new Number( 123 ), true, false, undefined, {}, [], new Date() ];
        for ( var i = 0, j = validExpressions.length; i < j; i++ ){
            var exp = validExpressions[i];
            assertNoException( 'should not throw Error for non-null values', function(){
                FailFast.assertNotNull( 'some message', exp );
            });
        }

        // test that exceptions ARE trown for invalid values
        assertException( 'should throw Error for null value', function(){
            FailFast.assertNotNull( 'some message', null );
        });

        expectAsserts( validExpressions.length + 1 );
    },
    
    "test assertNumber function" : function(){
        
        assertNoException( 'should not throw Error for Number literals', function(){
            FailFast.assertNumber( 'some message', 1 );
        });
            
        var number = new Number( 1233 );
        assertNoException( 'should not throw Error for Number instances', function(){
            FailFast.assertNumber( 'some message', number ); 
        });

        var invalid_expressions = [ "", [], {}, false, true, new Date() ];
        for ( var i = 0, j = invalid_expressions.length; i < j; i++ ){
            assertException( 'should throw Error for non-Number values', function(){
                FailFast.assertNumber( 'some message', exp );
            });
        }
    },
    
    "test assertNormalNumber function" : function(){
        var number, i, j;

        var validNumbers = [ 1, -1000, 1.223245, 1000000000, 0, -2414.2324 ];
        for ( i = 0, j = validNumbers.length; i < j; i++ ){
            number = validNumbers[i];
            assertNoException( 'should not throw Error for regular Number values', function(){
                FailFast.assertNormalNumber( 'some message', number );
            });
        }
        
        var invalidNumbers = [ NaN, Number.MAX_VALUE, Number.MIN_VALUE, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ];
        for ( i = 0, j = invalidNumbers.length; i < j; i++ ){
            number = invalidNumbers[i];
            assertException( 'should throw Error for special Number values', function(){
                FailFast.assertNormalNumber( 'some message', number );
            });
        }
    },

    "test assertObject function" : function() {
        var exp, i, j;

        var validExpressions = [ {}, new Object ];
        for ( i = 0; i < validExpressions.length; i++ ) {
            exp = validExpressions[i];
            assertNoException( 'should not throw Error for Object input', function(){
                FailFast.assertObject( 'some message', exp ); 
            });
        }

        var invalidExpressions = [ 1, true, "some string literal", false, undefined, null ];
        for ( i = 0, j = invalidExpressions.length; i < j; i++ ){
            exp = invalidExpressions[i];
            assertException( 'should throw Error for non-Object input', function(){
                FailFast.assertObject( 'some message', exp );
            });
        }
    },
    

    
    "test assertHasProperty function" : function(){        
        assertNoException( 'should not throw Error for Object with specified property', function(){
            var myObject = {
                myKey : 'myValue'
            };
            FailFast.assertHasProperty( 'expected object to have property', myObject, 'myKey' );
        });
        
        assertException( 'should throw Error for Object missing specified property', function(){
            var myObject = {
                myKey : 'myValue'
            };
            FailFast.assertHasProperty( 'expected object to have property', myObject, 'unknowKey' );
        });
    },
    
    "test assertString function" : function(){

        var value, i, j;

        var literals = ['', 'some string', "some double quoted string" ];
        for ( i = 0, j = literals.length; i < j; i++ ){
            value = literals[i];
            assertNoException( 'should not raise any error for string literals', function(){
                FailFast.assertString( 'some message', value );
            });
        }

        var instances = [ new String(), new String( 'some string' ), new String( "some double quoted string" ) ];
        for ( i = 0, j = instances.length; i < j; i++ ){            
            value = instances[i];
            assertNoException( 'should not raise any error for string instances', function(){
                FailFast.assertString( 'some message', value );
            });
        }

        var nonStrings = [ 1, null, undefined, new Date, {}, [], true, false ];
        for ( i = 0, j = nonStrings.length; i < j; i++ ){
            value = nonStrings[i];
            assertException( 'should throw Error for non-string input', function(){
                FailFast.assertString( 'some message', value  );
            });
        }        
    },

    "test assertArray function" : function(){

        assertNoException('should not throw Error for Array input', function(){
            FailFast.assertArray( 'some message', []  );
            FailFast.assertArray( 'some message', new Array() );
        });
        
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
        ];
        
        for ( var i = 0, j = invalidArrays.length; i < j; i++ ){
            var invalidArray = invalidArrays[i];
            assertException( 'should throw Error for non-Array input', function(){
                FailFast.assertArray( 'some message', invalidArray );
            });
        }
    },
    
    "test assertFunction funciton" : function(){
        assertNoException( 'should not throw Error for Function input', function(){
            FailFast.assertFunction( 'some message', function(){} );
        });
        
        var badFunctions = [ new Date, [], {}, 123, 'function', null, undefined, NaN ];
        for ( var i = 0, j = badFunctions.length; i < j; i++ ){
            assertException( 'should throw Error for non-Function input', function(){
                var badFunc = badFunctions[i];
                FailFast.assertFunction( 'some message', badFunc );
            });
        }
        
        expectAsserts( badFunctions.length + 1 );        
    },
    
    "test assertDate function" : function(){
        assertNoException( 'should not throw Error for Date input', function(){
            FailFast.assertDate( 'some message', new Date() );
        })

        var badDates = [ [], {}, 123, new Function(), null, undefined, NaN ];
        for ( var i = 0, j = badDates.length; i < j; i++ ){
            assertException( 'should throw Error for non-Date input', function(){
                var badDate = badDates[i];
                FailFast.assertDate( 'some message', badDate );
            });
        }

    },

	"test assertMatch function" : function(){
		
		var VALID_REGEX = /^[a-z0-9]{32}$/
		var VALID_VALUE = '62bb7f0eef3e47fc63968142bea82002';
		var INVALID_VALUES = ['', '****************', -1, new Date, [], {} ];
		
		assertNoException( 'should not throw error for valid regex and value', function(){
			FailFast.assertMatch( 'some message', VALID_REGEX, VALID_VALUE );
		});
		
		for ( var i = 0, j = INVALID_VALUES.length; i < j; i++ ){
			assertException( 'should throw Error for non-matching values', function(){
				var badValue = INVALID_VALUES[i];
				FailFast.assertMatch( 'some message', VALID_REGEX, badValue );
			});
		}
	}
});
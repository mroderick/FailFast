TestCase( "FailFast", {

    "test assert function" : function() {
        assertNoException( 'should not throw Error for true', function(){
            FailFast.assert( true, 'my message' );
        });

        var invalidExpressions = [ false, null, undefined, 1, "true", "", {}, new Date(), [] ];
        for( var i = 0, j = invalidExpressions.length; i < j; i++ ){
            var exp = invalidExpressions[i];
            assertException( 'should throw Error for non-true values', function(){
                FailFast.assert( exp, 'some message' );
            });
        }
        
        expectAsserts( invalidExpressions.length + 1 );
    },

    "test assertNotNull function" : function(){        // test that no exception is thrown for valid values
        var validExpressions = [ 1, new Number( 123 ), true, false, undefined, {}, [], new Date() ];
        for ( var i = 0, j = validExpressions.length; i < j; i++ ){
            var exp = validExpressions[i];
            assertNoException( 'should not throw Error for non-null values', function(){
                FailFast.assertNotNull( exp, 'some message' );
            });
        }

        // test that exceptions ARE trown for invalid values
        assertException( 'should throw Error for null value', function(){
            FailFast.assertNotNull( null, 'some message' );
        });

        expectAsserts( validExpressions.length + 1 );
    },
    
    "test assertNumber function" : function(){
        
        assertNoException( 'should not throw Error for Number literals', function(){
            FailFast.assertNumber( 1, 'some message' );
        });
            
        var number = new Number( 1233 );
        assertNoException( 'should not throw Error for Number instances', function(){
            FailFast.assertNumber( number, 'some message' ); 
        });

        var invalid_expressions = [ "", [], {}, false, true, new Date() ];
        for ( var i = 0, j = invalid_expressions.length; i < j; i++ ){
            assertException( 'should throw Error for non-Number values', function(){
                FailFast.assertNumber( exp, 'some message' );
            });
        }
    },
    
    "test assertObject function" : function() {
        var exp, i, j;

        var validExpressions = [ {}, new Object, [], new Array(), new Number(), new Date(), new String( 'some string' ) ];
        for ( i = 0; i < validExpressions.length; i++ ) {
            exp = validExpressions[i];
            assertNoException( 'should not throw Error for Object input', function(){
                FailFast.assertObject( exp, 'some message' ); 
            });
        }

        var invalidExpressions = [ 1, true, "some string literal", false, undefined, null ];
        for ( i = 0, j = invalidExpressions.length; i < j; i++ ){
            exp = invalidExpressions[i];
            assertException( 'should throw Error for non-Object input', function(){
                FailFast.assertObject( exp, 'some message' );
            });
        }
    },

    "test assertNormalNumber function" : function(){
        var number, i, j;

        var validNumbers = [ 1, -1000, 1.223245, 1000000000, 0, -2414.2324 ];
        for ( i = 0, j = validNumbers.length; i < j; i++ ){
            number = validNumbers[i];
            assertNoException( 'should not throw Error for regular Number values', function(){
                FailFast.assertNormalNumber( number, 'some message' );
            });
        }
        
        var invalidNumbers = [ NaN, Number.MAX_VALUE, Number.MIN_VALUE, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ];
        for ( i = 0, j = invalidNumbers.length; i < j; i++ ){
            number = invalidNumbers[i];
            assertException( 'should throw Error for special Number values', function(){
                FailFast.assertNormalNumber( number, 'some message' );
            });
        }
    },
    
    "test assertString function" : function(){

        var value, i, j;

        var literals = ['', 'some string', "some double quoted string" ];
        for ( i = 0, j = literals.length; i < j; i++ ){
            value = literals[i];
            assertNoException( 'should not raise any error for string literals', function(){
                FailFast.assertString( value, 'some message' );
            });
        }

        var instances = [ new String(), new String( 'some string' ), new String( "some double quoted string" ) ];
        for ( i = 0, j = instances.length; i < j; i++ ){            
            value = instances[i];
            assertNoException( 'should not raise any error for string instances', function(){
                FailFast.assertString( value, 'some message' );
            });
        }

        var nonStrings = [ 1, null, undefined, new Date, {}, [], true, false ];
        for ( i = 0, j = nonStrings.length; i < j; i++ ){
            value = nonStrings[i];
            assertException( 'should throw Error for non-string input', function(){
                FailFast.assertString( value, 'some message' );
            });
        }        
    },
    
    "test assertInstanceOf function" : function(){
        var i, j;
        
        var DummyClass = function(){};
        var pairs = [
            {
                type : String,
                instance : new String( 'some string')
            }, {
                type : Number,
                instance : new Number( 1234 )
            }, {
                type : Object,
                instance : {}
            }, {
                type : Object,
                instance : new Object()
            }, {
                type : Date,
                instance : new Date()
            }, {
                type : Array,
                instance : new Array()
            }, {
                type : Array,
                instance : []
            }, {
                type : DummyClass,
                instance : new DummyClass()
            }
        ];
        
        for ( i = 0, j = pairs.length; i < j; i++ ){
            var pair = pairs[i];
            assertNoException( 'should not throw Error for instances matching supplied Class', function(){
                FailFast.assertInstanceOf( pair.type, pair.instance, 'some message' );
            });
        }
        
        var invalidPairs = [
            { 
                type : Number,
                instance : '123' 
            }, {
                type : String,
                instance : 123
            }, {
                type : String,
                instance : null
            }, {
                type : String,
                instance : true
            }, {
                type : Array,
                instance : {}
            }, {
                type : DummyClass,
                instance : new Object()
            }
        ];
        
        for ( i = 0, j = invalidPairs.length; i < j; i++ ){
            var invalidPair = invalidPairs[i];
            assertException( 'should throw Error for instances not matching supplied Class', function(){
                FailFast.assertInstanceOf( invalidPair.type, invalidPair.instance, 'some message' ); 
            });
        }        
    },

    "test assertArray function" : function(){

        assertNoException('should not throw Error for Array input', function(){
            FailFast.assertArray( [], 'some message' );
            FailFast.assertArray( new Array(), 'some message' );
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
                FailFast.assertArray( invalidArray, 'some message' );
            });
        }
    }
});
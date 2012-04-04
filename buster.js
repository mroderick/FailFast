/*jslint white:true, browser:true, plusplus:true */
/*global module */

var config = module.exports;
config["FailFast in Browser"] = {
    env: "browser",
    sources: [
        "src/**/*.js"
    ],
    tests: [
        "test/test-*.js"
    ]
};
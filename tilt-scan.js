#!/usr/bin/env node

var path = require('path');
var pkg = require(path.join(__dirname, 'package.json'));
var Bleacon = require('bleacon');
var request = require('request');

// Parse command line options

var program = require('commander');
program
    .version(pkg.version)
    .option('-u, --url [url]', 'post to specified url [http://example.com]', '')
    .parse(process.argv);

Bleacon.on('discover', function (bleacon) {
    tilt = {
        "a495bb10c5b14b44b5121370f02d74de": "Red",
        "a495bb20c5b14b44b5121370f02d74de": "Green",
        "a495bb30c5b14b44b5121370f02d74de": "Black",
        "a495bb40c5b14b44b5121370f02d74de": "Purple",
        "a495bb50c5b14b44b5121370f02d74de": "Orange",
        "a495bb60c5b14b44b5121370f02d74de": "Blue",
        "a495bb70c5b14b44b5121370f02d74de": "Pink"
    };
    if (tilt[bleacon.uuid] != null) {
        var message = bleacon;
        message.timeStamp = Date.now();
        if (program.url != '') {
            //Lets configure and request
            request({
                url: program.url,
                method: 'POST',
                json: message
            }, function (error, response, body) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(response.statusCode, body);
                }
            });
        }

        console.log(tilt[bleacon.uuid] + ' ' + bleacon.major + ',' + bleacon.minor);
    }

});

Bleacon.startScanning();

//
console.log('Scanning:');
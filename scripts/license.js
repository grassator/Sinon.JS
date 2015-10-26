#!/usr/bin/env node
"use strict";

var path = require("path");
var fs = require("fs");
var version = require("../package.json").version;

var licensePath = path.join(__dirname, "..", "LICENSE");
var templatePath = path.join(__dirname, ".", "license_template.txt");
var now = new Date();
var data = {
    version: version,
    timestamp: now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate(),
    license: fs.readFileSync(licensePath, { encoding: "utf8" }).split("\n").join("\n * ")
};
var preamble = fs.readFileSync(templatePath, { encoding: "utf8" });
preamble = preamble.replace(/{{\s*(\w+)\s*}}/g, function (m, placeholder) {
    return data[placeholder];
});

process.stdout.write(preamble);

#!/usr/bin/env node

import * as readline from "node:readline/promises"

import {adiObject, parse, SyntaxError} from "@pilchd/fle"
import {program} from "commander";

import check from "./check.js"


program
    .name("fle-cli")
    .description("fle frontend for ADI files")
    .option("-c, --check", "write a checkfile instead of ADI");
program.parse();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
const input: string[] = [];
rl.on("line", line => input.push(line));

rl.once("close", () => {
    try {
        const fle = parse(input.join("\n"), "stdin");

        switch (program.opts().check || false) {
            case false:
                console.log(adiObject(fle.adif.header, "header"));
                fle.adif.qso.forEach(qso => console.log(adiObject(qso, "record")));
                break;
            case true:
                fle.adif.qso.forEach(qso => console.log(check(qso)) + ".");
                break;
        }
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            process.stderr.write(e.message + '\n');
            process.exit();
        }
        throw e;
    }
});

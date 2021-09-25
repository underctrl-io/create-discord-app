"use strict";
import { runEvent } from "../index";

export default class {
    constructor(public client:runEvent) {
        this.client = client
    };
    async execute() {

        console.log('active bot!');
    };
};
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const assert = require('assert');

describe('Tabbing into custom element with delegates focus', () => {
    const URL = '/delegates-focus';

    before(async () => {
        await browser.url(URL);
    });

    it('should apply focus to input in shadow', async () => {
        await browser.keys(['Tab']);
        const activeFromDocument = await browser.$(function () {
            return document.activeElement;
        });
        assert.strictEqual(await activeFromDocument.getTagName(), 'integration-delegates-focus');

        const activeFromShadow = await browser.$(function () {
            return document.querySelector('integration-delegates-focus').shadowRoot.activeElement;
        });
        assert.strictEqual(await activeFromShadow.getTagName(), 'input');
    });

    it('should apply focus to body after exiting in shadow', async () => {
        await browser.keys(['Tab']);
        const activeFromDocument = await browser.$(function () {
            return document.activeElement;
        });

        const tabName = await activeFromDocument.getTagName();
        const isTopElement = tabName === 'body' || tabName === 'html';
        assert.ok(isTopElement);

        const activeFromShadow = await browser.execute(function () {
            return document.querySelector('integration-delegates-focus').shadowRoot.activeElement;
        });
        assert.strictEqual(activeFromShadow, null);
    });

    it('should apply focus to input in shadow when tabbing backwards', async () => {
        await browser.keys(['Shift', 'Tab', 'Shift']);
        const activeFromDocument = await browser.$(function () {
            return document.activeElement;
        });
        assert.strictEqual(await activeFromDocument.getTagName(), 'integration-delegates-focus');

        const activeFromShadow = await browser.$(function () {
            return document.querySelector('integration-delegates-focus').shadowRoot.activeElement;
        });
        assert.strictEqual(await activeFromShadow.getTagName(), 'input');
    });
});

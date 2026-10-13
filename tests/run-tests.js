// Runs the engine tests and source checks in Node:  node tests/run-tests.js
// The engine and the tests are both read out of the HTML files, so this always
// tests the real code in index.html. The browser-only checks (CSP blocking,
// Quick mode and storage) run in tests/index.html.
'use strict';
const fs = require('fs');
const path = require('path');

function scriptById(html, id) {
  const m = new RegExp('<script id="' + id + '">([\\s\\S]*?)<\\/script>').exec(html);
  if (!m) throw new Error('No <script id="' + id + '"> found');
  return m[1];
}

const root = path.join(__dirname, '..');
const appHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const testHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const fakeWindow = {};
new Function('window', scriptById(appHtml, 'engine'))(fakeWindow);
const E = fakeWindow.ReportEngine;

const shared = new Function(scriptById(testHtml, 'shared-tests') +
  '\nreturn { makeHarness, defineEngineTests, defineStaticTests };')();

const harness = shared.makeHarness();
shared.defineEngineTests(harness.test, E);
shared.defineStaticTests(harness.test, appHtml);

harness.run().then((results) => {
  let group = '';
  for (const r of results) {
    if (r.group !== group) { group = r.group; console.log('\n' + group); }
    console.log((r.ok ? '  ok   ' : '  FAIL ') + r.name + (r.ok ? '' : '\n         ' + r.error));
  }
  const failed = results.filter((r) => !r.ok).length;
  console.log('\n' + (results.length - failed) + ' passed, ' + failed + ' failed');
  process.exitCode = failed ? 1 : 0;
});

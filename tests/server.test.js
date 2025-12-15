const http = require('http');
const assert = require('assert');

http.get('http://localhost:3000', res => {
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ Test servidor OK');
});

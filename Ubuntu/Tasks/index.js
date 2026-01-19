const os = require('os');

// OS Info
console.log('Operating System Info:');
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('OS Release:', os.release());
console.log('Hostname:', os.hostname());

// User Info
const userInfo = os.userInfo();
console.log('\nUser Info:');
console.log('Username:', userInfo.username);
console.log('Home Directory:', userInfo.homedir);
console.log('Shell:', userInfo.shell);

import os from 'node:os'



export function getSysInfo() {
    // OS Info
    console.log('Operating System Info:');
    console.log('Platform:', os.platform());
    console.log('Architecture:', os.arch());
    console.log('OS Release:', os.release());
    console.log('Hostname:', os.hostname());
    
    //Memory info
    console.log(`total Memory: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`  )
    console.log(`free Memory: ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB` )

    //System uptime
    console.log(`System uptime : ${(os.uptime() / 60 ).toFixed(2).toString()} Min`)

    // User Info
    const userInfo = os.userInfo();
    console.log('\nUser Info:');
    console.log('Username:', userInfo.username);
    console.log('Home Directory:', userInfo.homedir);
    console.log('Shell:', userInfo.shell);
    return {
        "Operating System Info":{
            "Platform":os.platform(),
            "Architecture":os.arch(),
            "OS Release":os.release(),
            "Hostname": os.hostname()
        },
        "Memory info":{
            "total Memory":(os.totalmem() / Math.ceil(1024 ** 3)).toFixed(2) + ' GB',
            "free Memory":(os.freemem() / (1024 ** 3)).toFixed(2) + ' GB'
        },
        "System uptime":(os.uptime() / (60 ** 2) ).toFixed(2) + ' hours',
        "user Info":{
            "Username":userInfo.username,
            "Home Directory":userInfo.homedir,
            "Shell":userInfo.shell
        }
    }
}
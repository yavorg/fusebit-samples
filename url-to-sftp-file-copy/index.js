const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');
const Client = require('ssh2-sftp-client');

/**
* @param ctx {FusebitContext}
* @param cb {FusebitCallback}
*/
module.exports = async (ctx, cb) => {
    const fileUrl = ctx.body.fileToCopy;
    const fileName = fileUrl.substring(fileUrl.lastIndexOf('/')+1);
    const tmpFilePath = Path.resolve('/tmp', fileName);
    const remoteFilePath =  Path.resolve(ctx.configuration.SFTP_PATH, fileName);
    
    try {
        await downloadImage(fileUrl, tmpFilePath);
        let response = await uploadImage(ctx.configuration.SFTP_HOST,
            ctx.configuration.SFTP_PORT,
            ctx.configuration.SFTP_USER,
            ctx.configuration.SFTP_PASSWORD,
            tmpFilePath,
            remoteFilePath);
        cb(null, {body: response});
    } catch (e) {
        cb(e);
    }
}

async function uploadImage(host, port, username, password, localFilePath, remoteFilePath){
    let sftp = new Client();
    await sftp.connect({
        host: host,
        port: port,
        username: username,
        password: password
    });
    let response = await sftp.fastPut(localFilePath, remoteFilePath);
    sftp.end();
    return response;
}

async function downloadImage(fileUrl, tmpFilePath){
    const writer = Fs.createWriteStream(tmpFilePath);
    
    const response = await Axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    writer.on('finish', () => { return; });
    writer.on('error', (e) => { throw e; });
}
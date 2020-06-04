const path = require('path');
const types = {
    'css': 'text/css',
    'gif': 'image/gif',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'svg': 'image/svg+html',
    'swf': 'application/x-shockwave-flash',
    'tiff': 'image/tiff',
    'txt': 'text/plain',
    'wav': 'audio/x-wav',
    'wma': 'audio/x-ms-wma',
    'wmv': 'audio/x-ms-wmv',
    'html': 'text/html',
    'json': 'application/json',
    'xml': 'text/xml',
    'pdf': 'application/pdf',
    'js': 'text/javascript'
}
module.exports = (filePath)=>{
    return types[path.extname(filePath).split('.').pop().toLowerCase()] || types['txt'];
}

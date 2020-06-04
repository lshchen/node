const config = require('../config/defaultConfig');
function isFresh (stats,req,res){
    const {maxAge, expires, cacheControl, lastModified, etag} = config;
    if (expires) {
        res.setHeader('Expires', (Date.now() + maxAge * 1000).toUTCString());
    }
    if (cacheControl) {
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    }
    if (lastModified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString());
    }
    if (etag) {
        res.setHeader('Etag', `${stats.size}-${stats.mtime}`);
    }
}
module.exports = (stats,req,res) => {
    isFresh(stats,req,res);
    const isLastModified = req.headers['if-modified-since'];
    const isEtag = req.headers['if-none-match'];
    if (!isLastModified && !isEtag) return false;
    if (isLastModified && isLastModified != res.getHeader('Last-Modified')) return false;
    if (isEtag && isEtag != res.getHeader('Etag')) return false;
    return true;
}

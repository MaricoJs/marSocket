let getDate = function (timestamp = Date.now()) {
    let date = new Date(timestamp)
    return `${date.getFullYear()}-${date.getMonth()<9?'0'+(date.getMonth()+1):(date.getMonth()+1)}-${date.getDate()<10?'0'+date.getDate():date.getDate()}`
}
const getTime = (timestamp = Date.now(), justDate = false) => {
    let dateStr = justDate ? '' : getDate(timestamp) + ' ',
        date = new Date(timestamp);
    return `${dateStr}${date.getHours() >9 ? date.getHours(): '0'+date.getHours()}:${date.getMinutes()>9 ?date.getMinutes() :'0'+date.getMinutes() }:${date.getSeconds()>9?date.getSeconds():'0'+date.getSeconds()}`
}
module.exports.getDate = getDate
module.exports.getTime = getTime
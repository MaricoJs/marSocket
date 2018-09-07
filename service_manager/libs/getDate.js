let now = Date.now()
let getDate = function (timestamp = now,inclueTime = false) {
    let date = new Date(timestamp)
    let res =  `${date.getFullYear()}-${date.getMonth()<9?'0'+(date.getMonth()+1):(date.getMonth()+1)}-${date.getDate()<10?'0'+date.getDate():date.getDate()}`;
    if(inclueTime){
        res +=  ` ${date.getHours() >9 ? date.getHours(): '0'+date.getHours()}:${date.getMinutes()>9 ?date.getMinutes() :'0'+date.getMinutes() }:${date.getSeconds()>9?date.getSeconds():'0'+date.getSeconds()}`
    }
    return res
}
const getTime = (timestamp = now) => {
    return getDate(timestamp,true)
}
module.exports.getDate = getDate
module.exports.getTime = getTime
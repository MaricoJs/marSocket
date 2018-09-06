function compareVersion(oldV, newV) {
    console.log(`oldV:${oldV}---newV:${newV}`)
    var hasNew = false,
        oldArr = oldV.split('.'),
        newArr = newV.split('.');
    oldArr[1] = oldArr[1] || '0';
    newArr[1] = newArr[1] || '0';
    var oldV12 = (oldArr[0] + oldArr[1]) * 1,
        newV12 = (newArr[0] + newArr[1]) * 1;
    if(newV12 > oldV12) {
        hasNew = true;
    } else if(newV12 == oldV12) {
        oldArr[2] = oldArr[2] || '0';
        newArr[2] = newArr[2] || '0';
        oldArr[3] = oldArr[3] || '0';
        newArr[3] = newArr[3] || '0';
        var oldV34 = (oldArr[2] + oldArr[3]) * 1,
            newV34 = (newArr[2] + newArr[3]) * 1;
        if(newV34 > oldV34) {
            hasNew = true;
        }
    }
    return hasNew
}
module.exports.compareVersion = compareVersion;
// console.log(compareVersion('1.0.1','1.1.0'))
// console.log(compareVersion('1.0.1','1.0.0'))
// console.log(compareVersion('1.0.1','1.0.2'))
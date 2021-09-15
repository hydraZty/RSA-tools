function stringToBase64 (str) {
    var base64Str = new Buffer.from(str).toString('base64');
    return base64Str;
}
function base64ToString  (base64Str) {
    var str = new Buffer.from(base64Str,'base64').toString();
    return str;
}
function clacEuler (x, y, m, result = 1n) {
    /*
    * 入参都为 BigInt
    * 计算 x ** y % m
    * 利用回折递归求值，避免数字过大，并优化性能
    * 原理参考快速模幂法
    * 因为此处用了递归，当幂过大会超过最大调用堆栈，解决方法可以改写成循环。
    */ 
    if( y > 100 ){
       return clacEuler(x, y - 100n ,m,result * x ** 100n % m)
    }else{
      return result * x ** y % m
    }
}
module.exports = {
    stringToBase64,
    base64ToString,
    clacEuler,
}
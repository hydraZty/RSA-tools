const lodash = require('lodash')
const { stringToBase64, base64ToString, clacEuler } = require('./utils')

module.exports = {
    generateKey: function (customPrimeNums, primeSet){
        let p, q
        /*
        * 从质数集中随机取不同的两个质数 q p
        */ 
        if(customPrimeNums){
            [p, q] = customPrimeNums
        }else {
            [p, q] = lodash.sampleSize(primeSet, 2)
        }
        /*
        * 两质数相乘得到乘积 n
        */
        const n = p * q
        /*
        * 计算欧拉函数 φ(n) -> EULER
        */
        const EULER = (q - 1) * (p - 1)
        /*
        * 随机取个与 φ(n) 互质并小于 φ(n) 的数， （可随意更换为满足条件的正整数）
        */
        const e = EULER % 7 !== 0 ? 7 : EULER % 11 !== 0 ? 11 : EULER % 17 !== 0 ? 17 :  29
        /*
        * 计算模反元素 d，使得 e * d 被 φ(n) 除的余数为1
        * 此处暴力解法，效率低下
        * TODO：改用扩展欧几里得算法
        */
        let d
        for(let i = 1; !d; i++){
            if(e * i % EULER === 1){
                d = i
            } 
        }

        const keys = {
            p,
            q,
            n,
            EULER,
            e,
            d,
        }

        /*
        * 公钥私钥已做 JSON base64 编码
        */
        const privateKey = stringToBase64(JSON.stringify({n,d}))
        const publicKey = stringToBase64(JSON.stringify({n,e}))

        console.log(`计算得出 RSA 相关值为： `)
        console.log(keys)
        console.log('公钥(n, e) 为:')
        console.log(publicKey)
        console.log('私钥(n, d) 为:')
        console.log(privateKey)
    },
    encrypt: (Base64, text) => {
        const publicKey = JSON.parse(base64ToString(Base64))
        console.log(publicKey)
        console.log('密文: ', clacEuler(BigInt(text), BigInt(publicKey.e), BigInt(publicKey.n) ))
    },
    decrypt: (Base64, cipherText) =>  {
        const privateKey = JSON.parse(base64ToString(Base64))
        console.log(privateKey)
        console.log('解密为: ', clacEuler(BigInt(cipherText), BigInt(privateKey.d), BigInt(privateKey.n) ))
    }
}

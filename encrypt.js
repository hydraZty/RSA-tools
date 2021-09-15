const inquirer  = require('inquirer')
const { PRIMExx, PRIME1xx, PRIME3xx } = require('./const')
const { generateKey, encrypt, decrypt } = require('./core')

const promptList = [
    {
        type: 'list',
        message: '要执行什么操作:',
        name: 'action',
        choices: [
            "生成密钥",
            "加密",
            "解密"
        ],
    },
    {
        type: 'confirm',
        message: '是否使用内置质数集合',
        name: 'useInner',
        when: (answers)=>answers.action === '生成密钥'
    },
    {
        type: 'list',
        message: '使用什么区间的指数集合',
        name: 'set',
        choices: [
            {
                name: "0 - 100(容易验算)",
                value: PRIMExx
            },
            
            {
                name: "100 - 200(加密英文字符)",
                value: PRIME1xx
            },
            
            {
                name: "300 - 400(加密中文字符)",
                value: PRIME3xx
            },
        ],
        when: (answers)=>answers.useInner
    },
    //TODO 加入质数验证
    {
        type: 'input',
        message: '请输入一个质数',
        name: 'p',
        when: (answers)=>answers.useInner === false
    },
    {
        type: 'input',
        message: '请再输入一个不同的质数',
        name: 'q',
        when: (answers)=>answers.useInner === false
    },
    {
        type: 'input',
        message: '请粘贴*公钥*在此处',
        name: 'publicKey',
        when: (answers)=>answers.action === '加密'
    },
    {
        type: 'input',
        message: '请输入要加密的文本',
        name: 'text',
        when: (answers)=>answers.action === '加密'
    },
    {
        type: 'input',
        message: '请粘贴*私钥*在此处',
        name: 'privateKey',
        when: (answers)=>answers.action === '解密'
    },
    {
        type: 'input',
        message: '请输入要解密的文本',
        name: 'cipherText',
        when: (answers)=>answers.action === '解密'
    }
];

inquirer.prompt(promptList).then(answers => {
    if(answers.action === '生成密钥'){
        if(answers.set){
            generateKey(null, answers.set)
        }else{
            generateKey([Number(answers.p) , Number(answers.q)])
        }
    }else if(answers.action === '加密'){
        encrypt(answers.publicKey, answers.text)
    }else if(answers.action === '解密'){
        decrypt(answers.privateKey, answers.cipherText)
    }
})
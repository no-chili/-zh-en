#!/usr/bin/env node
const readline = require('readline')
const axios = require('axios')

const config=process.argv.slice(2)
//参数一
const choose=config[0]
//参数二
const option=config[1]

//当前api
const port='YouDao'

//参数配置
const _Option={
  port,
  outDir:'',
  catchDir:''
}

if(choose==='--config'){
  console.log(option);
}else if(choose==='--catch'){
  console.log(option);
}else if(choose==='--use'){
  console.log(option);
}else if(choose==='--want'){
  console.log(option);
}
// 输出样式
console.log('\x1B[36m','');

// 配置输入输出
const reader= readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

//历史
const wordList=new Map()

//追加历史
function addWord(src,tgt){
  wordList.set(src,tgt)
}
//输出历史搜索
function sout(){
  wordList.forEach((value,key)=>{
    console.log(key,value);
  })
  process.exit()
}

reader.setPrompt('输入要查询的单词：')
reader.prompt()

reader.on('line',async (input)=>{
  if(input.trim().toLowerCase()==='@close'){
    console.log('good by');
    process.exit()
  }else if(input.trim().toLowerCase()==='@sout'){
    sout()
  }else{
    await search(input)
    console.log('');
    reader.prompt()
  }
})

// 搜索输出
async function search(key){
  if(_Option.port=='YouDao'){
    const {data:res}=await axios.get('http://fanyi.youdao.com/translate',{
      params:{
       doctype:'json',
       type:'JSON',
       i:key
      }
     })
     const [[{src,tgt}]]=res.translateResult
     addWord(src,tgt)
     console.log('');
     console.log(tgt);
  }
 
}


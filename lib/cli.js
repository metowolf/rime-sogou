#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const opencc = require('node-opencc')
const Parse = require('./parse')

let filename = process.argv[2]
let basename = path.basename(filename, '.scel')
let dirname = path.dirname(filename)

if (!fs.lstatSync(filename).isFile()) {
  throw new Error(`invalid file`)
}

let data = fs.readFileSync(filename)
let parse = new Parse(data)
let info = parse.info()
let chinese = parse.chinese()

console.log(info)

let result = `# Rime Sogou
# encoding: utf-8
#
# name: ${info.name}
# type: ${info.type}
# description: ${info.description}
# example: ${info.example.join(' ')}
#
---
name: luna_pinyin.sogou.${basename}
version: "${Date.now()}"
sort: by_weight
use_preset_vocabulary: true
...

`

for (let item of chinese) {
  let pinyin = item.pinyin.join(' ')
  result += `${item.word}\t${pinyin}\t${item.frequency}\n`
}

result = opencc.simplifiedToTraditional(result.trim())

fs.writeFileSync(`${dirname}/luna_pinyin.sogou.${basename}.dict.yaml`, result)

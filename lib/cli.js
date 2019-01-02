#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const opencc = require('node-opencc')
const Parse = require('./parse')

let filename = process.argv[2]
let basename = path.basename(filename, '.scel')
let dirname = path.dirname(filename)

let parse = new Parse(filename)
let info = parse.info()
let chinese = parse.chinese()

let result = `# Rime Sogou
# encoding: utf-8
#
# name: ${info.name}
# type: ${info.type}
# description: ${info.description}
# example: ${info.example.join(' ')}
#
---
name: rime_sogou.${basename}
version: "${Date.now()}"
sort: by_weight
use_preset_vocabulary: true
...
`

for (let item of chinese) {
  let pinyin = item.pinyin.join(' ')
  result += `${item.word}\t${pinyin}\t${item.frequency}\n`
}

result = opencc.simplifiedToTraditional(result)

fs.writeFileSync(`${dirname}/${basename}.dict.yaml`, result)

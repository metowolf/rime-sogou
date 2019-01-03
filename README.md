<p align="center">
<img src="https://user-images.githubusercontent.com/2666735/50629646-64043400-0f78-11e9-96e0-9fdfea4d86d8.png" width="100px" alt="rime-sogou">
</p>

<p align="center">搜狗細胞詞庫解析</p>


## Command-line Usage

### Installation

```bash
npm i rime-sogou -g
```
or
```bash
yarn global add rime-sogou
```

### Usage

```bash
rime-sogou ./dictionaries/computer.scel
```

this will write a `luna_pinyin.computer.dict.yaml` file


## Module Usage

### Installation

```bash
npm i rime-sogou
```
or
```bash
yarn add rime-sogou
```

### Usage

```javascript
const fs = require('fs')
const RimeSogou = require('rime-sogou')

let data = fs.readFileSync('./dictionaries/computer.scel')
let rimeSogou = new RimeSogou(data)

console.log(rimeSogou.info())

/*
{ name: '计算机词汇大全【官方推荐】',
  type: '计算机科技',
  description: '官方推荐，词库来源于网友上传！',
  example:
   [ '自动文件分类\r',
     '扩散激发模型\r',
     '安天盾防火墙\r',
     '金狐盗号木马\r',
     '事件提供程序\r',
     '异动处理单位' ] }
*/

console.log(rimeSogou.chinese())

/*
[ { word: '阿姆达尔定律',
   pinyin: [ 'a', 'mu', 'da', 'er', 'ding', 'lv' ],
   frequency: 3419 },
 { word: '阿帕网', pinyin: [ 'a', 'pa', 'wang' ], frequency: 4902 },
 { word: '埃尔布朗基',
   pinyin: [ 'ai', 'er', 'bu', 'lang', 'ji' ],
   frequency: 4362 },
 { word: '埃尔米特函数',
   pinyin: [ 'ai', 'er', 'mi', 'te', 'han', 'shu' ],
   frequency: 2429 },
 { word: '埃克特', pinyin: [ 'ai', 'ke', 'te' ], frequency: 2718 },
 { word: '艾丽莎病毒',
   pinyin: [ 'ai', 'li', 'sha', 'bing', 'du' ],
   frequency: 9948 },
 { word: '安德夫木马',
   pinyin: [ 'an', 'de', 'fu', 'mu', 'ma' ],
   frequency: 10051 },
 { word: '按钮类型',
   pinyin: [ 'an', 'niu', 'lei', 'xing' ],
   frequency: 2135 },
 ... 10199 more items ]
*/
```

## Author

**rime-sogou** © [metowolf](https://github.com/metowolf).<br>

> Blog [@meto](https://i-meto.com) · GitHub [@metowolf](https://github.com/metowolf) · Twitter [@metowolf](https://twitter.com/metowolf) · Telegram Channel [@metooooo](https://t.me/metooooo)

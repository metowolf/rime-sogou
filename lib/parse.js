const fs = require('fs')

class Parse {

  constructor(filename) {

    if (!fs.lstatSync(filename).isFile()) {
      throw new Error(`invalid file`)
    }

    let data = fs.readFileSync(filename)
    this.buffer = data
  }

  _readString(begin, end) {
    return this.buffer.slice(begin, end).toString('utf16le')
  }

  _readInt(begin) {
    return this.buffer.readInt16LE(begin)
  }

  info() {
    return {
      name: this._readString(0x130, 0x338).split('\x00')[0].trim(),
      type: this._readString(0x338, 0x540).split('\x00')[0].trim(),
      description: this._readString(0x540, 0xd40).split('\x00')[0].trim(),
      example: this._readString(0xd40, 0x1540).split('\x00')[0].trim().split(' '),
    }
  }

  // 拼音索引表
  _table() {

    let result = {}
    let pos = 0x1540
    let length = 0x2628

    while (pos < length) {

      // 索引
      let index = this._readInt(pos)
      pos += 2

      // 音節長度
      let word_len = this._readInt(pos)
      pos += 2

      // 音節
      let word = this._readString(pos, pos + word_len)
      pos += word_len

      // 儲存結果
      result[index] = word

    }

    return result
  }

  chinese() {

    this.table = this._table()

    let result = []
    let pos = 0x2628
    let length = this.buffer.length

    while (pos < length) {

      // 同音詞
      let homophone = this._readInt(pos)
      pos += 2

      // 拼音索引表長度
      let index = this._readInt(pos)
      pos += 2

      // 拼音
      let pinyin = []
      for (let i = pos; i < pos + index; i += 2) {
        pinyin.push(this.table[this._readInt(i)])
      }
      pos += index

      // 同音異義語
      for (let i = 0; i < homophone; i += 1) {

        // 詞條長度
        let word_len = this._readInt(pos)
        pos += 2

        // 詞條
        let word = this._readString(pos, pos + word_len)
        pos += word_len
        if (pos >= length) break

        // 擴展數據長度
        let ext_len = this._readInt(pos)
        pos += 2

        // 擴展數據
        let ext = this._readString(pos, pos + ext_len)
        let frequency = this._readInt(pos)
        pos += ext_len
        if (pos >= length) break

        // 儲存結果
        result.push({
          word,
          pinyin,
          frequency
        })

      }
    }

    return result
  }

}

module.exports = Parse

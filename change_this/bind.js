Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
      throw new TypeError('Error')
    }
    let _this = this
    let args = [...arguments].slice(1)
    return function F() {
      // 判断是否被当做构造函数使用
      if (this instanceof F) {
        return _this.apply(this, args.concat([...arguments]))
      }
      return _this.apply(context, args.concat([...arguments]))
    }
  }
Function.prototype.call = function (self = window) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
      }
    let args = [...arguments].slice(1);
    self.fn = this;
    let result = self.fn(...args);
    return result;
}


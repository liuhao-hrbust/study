Function.prototype.myApply = function(self = window) {
    if (typeof this !== 'function') {
        throw new Error('error');
    }
    let args = arguments[1];
    self.fn = this;
    let result;
    if (args) {
        result = self.fn(...args);
    } else {
        result = self.fn();
    }
    delete self.fn;
    return result;
}
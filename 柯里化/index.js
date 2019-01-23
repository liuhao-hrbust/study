function add() {
    function next() {
        let args = [].slice.call(arguments);
        console.log(args);
        return next;
    }
    next.toString = () => {};
    return next;
}
add(1)(2);

function getFile(file) {
    return new Promise(function(resolve) {
        fakeAjax(file, resolve);
    });
}
function output(text) {
    output(text);
}
const p1 = getFile('file1');
const p2 = getFile('file2');
const p3 = getFile('file3');

p1.then(output)
    .then(function() {
        return p2;
    })
    .then(output)
    .then(function() {
        return p3;
    })
    .then(output)
    .then(function() {
        output('Complete!');
    });

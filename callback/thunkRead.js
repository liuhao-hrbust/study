['file1', 'file2', 'file3']
    .map(getFile)
    .reduce(function(chain, filePromise) {
        return chain
            .then(function() {
                return filePromise;
            })
            .then(output);
    }, Promise.resolve())
    .then(function() {
        output('Complete!');
    });

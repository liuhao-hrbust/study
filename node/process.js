process.stdin.resume();
process.stdin.on("data", data => {
    process.stdout.write("read from console " + data.toString());
});

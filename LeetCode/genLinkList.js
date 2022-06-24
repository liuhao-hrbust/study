function genLinkList(arr) {
    const nodeList = arr.map(val => new Node(val));

    for (let i = 0; i < nodeList.length - 1; i++) {
        const node = nodeList[i];
        node.next = nodeList[i + 1];
    }

    nodeList[nodeList.length - 1].next = null;

    return nodeList[0];
}

function Node(val) {
    this.val = val;
}

module.exports = genLinkList;

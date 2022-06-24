// 题目： 给定一个单链表的头节点head，节点的值类型是整型，
// 再给定一个整数pivot，实现一个调整链表的函数，将链表调整为左部分都是值小于pivot的节点，
// 中间部分都是值等于pivot的节点，右部分都是值大于pivot的节点。

/**
 * 调整后所有小于pivot的节点之间的相对顺序和调整前一样
 * 调整后所有等于pivot的节点之间的相对顺序和调整前一样
 * 调整后所有大于pivot的节点之间的相对顺序和调整前一样
 * 时间复杂度请达到O(N)，额外空间复杂度请达到O(1)
 */

function partitionLinkedList(head, pivot) {
    let l1 = head;
    let l2 = null;
    let n1 = head;

    while (n1) {
        if (n1.val >= pivot) {
            l2;
        }
    }
}

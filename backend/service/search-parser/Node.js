module.exports = class Node {
    constructor({left,right,value,child}) {
        if (left)this.left = left;
        if (right)this.right = right;
        if (value)this.value = value;
        if (child)this.child = child;
    }
};
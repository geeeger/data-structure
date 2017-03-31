(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['LinkedList'], factory);
    } else {
        // Browser globals
        root.Stack = factory(root.LinkedList);
    }
}(this, function (LinkedList) {

    function Stack () {
        this.stack = new LinkedList();
        this.currentAmount = 0;
    }

    var StackProto = Stack.prototype;

    StackProto.push = function (element) {
        this.stack.add(element);
        this.currentAmount++;
    };

    StackProto.pop = function () {
        if (this.currentAmount) {
            this.currentAmount--;
            return this.stack.removeFirst();
        }
        return null;
    };

    StackProto.peek = function () {
        if (this.isEmpty()) {
            return null;
        }
        var element = this.pop();
        this.push(element);
        return element;
    };

    StackProto.size = function () {
        return this.currentAmount;
    };

    StackProto.isEmpty = function () {
        return this.currentAmount === 0;
    };

    return Stack;
}));
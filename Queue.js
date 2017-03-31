(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.Queue = factory();
    }
}(this, function () {

    function Node(element, previousNode, nextNode) {
        this.e = element;
        this.previous = previousNode;
        this.next = nextNode;
    }

    function Queue() {
        this.top = null;
        this.bottom = null;
        this.size = 0;
    }

    var QueueProto = Queue.prototype;

    QueueProto.push = function (element) {
        this.top = new Node(element, null, this.top);
        if (this.size++ == 0) {
            this.bottom = this.top;
        }
        else {
            this.top.next.previous = this.top;
        }
    };

    QueueProto.pop = function () {
        if (this.size === 0) {
            return null;
        }
        var element = this.bottom.e;
        this.bottom = this.bottom.previous;
        if (this.bottom != null) {
            this.bottom.next = null;
        }
        this.size--;
        return element;
    };

    QueueProto.peek = function () {
        if (this.size === 0) {
            return null;
        }
        return bottom.e;
    };

    QueueProto.size = function () {
        return this.size;
    };

    QueueProto.isEmpty = function () {
        return this.size === 0;
    };

    return Queue;
}));
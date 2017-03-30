(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.LinkedList = factory();
    }
}(this, function () {

    function Node(element, next) {
        this.treasure = element;
        this.next = next;
    }

    function LinkedList(root) {
        this.root = root || null;
    }

    var LinkedListProto = LinkedList.prototype;

    LinkedListProto.add = function (element) {
        var self = this;
        if (self.root === null) {
            self.root = new Node(element, null);
        }
        else {
            self.root = new Node(element, self.root);
        }
    };

    LinkedListProto.removeFirst = function () {
        var self = this;
        if (self.root === null) {
            return null;
        }
        var element = self.root.treasure;
        self.root = self.root.next;
        return element;
    };

    LinkedListProto.search = function (element) {
        var self = this;
        var current = self.root;
        while (current != null) {
            if (current.treasure === element) {
                return true;
            }
            current = current.next;
        }
        return false;
    };

    LinkedListProto.remove = function (element) {
        var self = this;
        if (self.root === null) {
            return false;
        }
        if (self.root.treasure === element) {
            self.root = self.root.next;
            return true;
        }

        var current = self.root.next;
        var previous = self.root;

        while (current != null) {
            if (current.treasure === element) {
                previous.next = current.next;
                return true;
            }
            previous = current;
            current = current.next;
        }
        return false;
    };

    LinkedListProto.edit = function (target, updateTo) {
        var self = this;
        if (self.remove(target)) {
            self.add(updateTo);
            return true;
        }
        return false;
    }

    return LinkedList;
}));
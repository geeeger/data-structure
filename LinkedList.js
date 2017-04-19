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
        this._size = !!root ? 1 : 0;
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
        self._size++;
    };

    LinkedListProto.removeFirst = function () {
        var self = this;
        if (self.root === null) {
            return null;
        }
        var element = self.root.treasure;
        self.root = self.root.next;
        self._size--;
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
        return this.removeIf(function (item) {
            return item === element;
        });
    };

    LinkedListProto.stream = function () {
        var self = this;
        var stream = [];
        if (self.root === null) {
            return stream;
        }
        var current = self.root;
        while (current != null) {
            stream.push(current.treasure);
            current = current.next;
        }
        return stream;
    };

    LinkedListProto.removeIf = function (callback) {
        var self = this;
        if (self.root === null) {
            return false;
        }

        if(callback(self.root.treasure)) {
            self.root = self.root.next;
            self._size--;
            return true;
        }

        var current = self.root.next;
        var previous = self.root;

        while (current != null) {
            if (callback(current.treasure)) {
                previous.next = current.next;
                self._size--;
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
    };

    LinkedListProto.isEmpty = function () {
        return self._size === 0;
    }

    return LinkedList;
}));
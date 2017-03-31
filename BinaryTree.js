(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.BinaryTree = factory();
    }
}(this, function () {

    function Optional() {

    }

    Optional.of = function (value) {
        if (value === undefined) {
            throw new TypeError('NullPointerException: of(value)');
        }
        return new Optional.init(value);
    };

    Optional.ofNullable = function (value) {
        return new Optional.init(value);
    };

    function OptionalConstructor(value) {
        this.value = value;
    }

    var OptionalConstructorProto = OptionalConstructor.prototype;

    OptionalConstructorProto.map = function (fn) {
        var value = this.value;
        value === undefined ? (value = '') : '';
        return Optional.ofNullable(fn.call(this, value));
    };

    OptionalConstructorProto.orElse = function (value) {
        if (!this.value) {
            return value;
        }
        return this.value;
    };

    Optional.init = OptionalConstructor;

    function Node(element, nodeLeft, nodeRight) {
        this.treasure = element;
        this.left = nodeLeft;
        this.right = nodeRight;
    }

    var NodeProto = Node.prototype;

    NodeProto.toString = function () {
        return Optional
            .ofNullable(this.left)
            .map(function (node) {
                return node.toString();
            })
            .orElse(" ") + " " +
            this.treasure.toString() + " " +
            Optional
                .ofNullable(this.right).map(function (node) {
                    return node.toString();
                })
                .orElse(" ");
    };

    NodeProto.equals = function (node) {
        return this.treasure === node;
    };

    function BinaryTree(root) {
        this.root = root;
    }

    var BinaryTreeProto = BinaryTree.prototype;

    BinaryTreeProto.add = function (treasure) {
        if (treasure === undefined) {
            return;
        }
        if (!this.root) {
            this.root = new Node(treasure);
        }
        else {
            this._add(treasure, this.root);
        }
    };

    BinaryTreeProto._add = function (treasure, root) {
        if (root.treasure === treasure) {
            return;
        }
        else if (root.treasure > treasure) {
            if (!root.left) {
                root.left = new Node(treasure);
            }
            else {
                this._add(treasure, root.left);
            }
        }
        else {
            if (!root.right) {
                root.right = new Node(treasure);
            }
            else {
                this._add(treasure, root.right);
            }
        }
    };

    BinaryTreeProto.contains = function (treasure) {
        if (treasure === undefined || !this.root) {
            return false;
        }
        else {
            return this._contains(treasure, this.root);
        }
    };

    BinaryTreeProto._contains = function (treasure, root) {
        if (!root) {
            return false;
        }
        if (root.treasure === treasure) {
            return true
        }
        if (root.treasure > treasure) {
            return this._contains(treasure, root.left);
        }
        else {
            return this._contains(treasure, root.right);
        }
    };

    BinaryTreeProto.remove = function (treasure) {
        this.root = this._remove(treasure, this.root);
    };

    BinaryTreeProto._remove = function (treasure, root) {
        if (!root) {
            return null;
        }
        else if (root.treasure > treasure) {
            root.left = this._remove(treasure, root.left);
        }
        else if (root.treasure < treasure) {
            root.right = this._remove(treasure, root.right);
        }
        // 找到了，但是他有两个子节点
        else if (root.left && root.right) {
            // 用左最大替换
            root.treasure = this._findMax(root.left);
            // 删除左最大
            root.left = this._remove(root.treasure, root.left)
        }
        else {
            return root.left ? root.left : root.right;
        }
        return root;
    };

    BinaryTreeProto._findMax = function (root) {
        if (root.right) {
            return this._findMax(root.right);
        }
        return root.treasure;
    };

    BinaryTreeProto.modify = function (oldTreasure, newTreasure) {
        if (oldTreasure === undefined || newTreasure === undefined || oldTreasure === newTreasure) {
            return ;
        }
        if (newTreasure === undefined) {
            this.remove(oldTreasure);
        }
        else if (this.contains(oldTreasure)) {
            this.remove(oldTreasure);
            this.add(newTreasure);
        }
    };

    BinaryTreeProto.toString = function () {
        return Optional.ofNullable(this.root).map(function (root) {
            return root.toString();
        }).orElse(" ");
    };

    BinaryTreeProto.printTree = function (level) {
        if (level.length) {
            var newLevel = [];
            for (var i = 0, len = level.length; i < len; i++) {
                var node = level[i];
                console.log(node.treasure);
                node.left && newLevel.push(node.left);
                node.right && newLevel.push(node.right);
            }
            console.log('\n');
            this.printTree(newLevel);
        }
    };

    return BinaryTree;
}));
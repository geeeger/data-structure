(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['LinkedList'], factory);
    } else {
        // Browser globals
        root.HashMap = factory(root.LinkedList);
    }
}(this, function (LinkedList) {
    // 储存结构
    
    function Entry (key, value, hashcode) {
        this.key = key;
        this.value = value;
        this.hashcode = hashcode;
    }

    var EntryProto = Entry.prototype;

    EntryProto.getKey = function () {
        return this.key;
    };

    EntryProto.getValue = function () {
        return this.value;
    };

    EntryProto.getHashcode = function () {
        return this.hashcode;
    };

    EntryProto.toString = function () {
        return this.key + '=' + this.value;
    };

    var OVERFLOW = 0x7fffffff;

    function hashCode(key) {
        key = key.toString();
        var hash = 0;
        var offset = 0;
        var len = key.length;
        for (var i = 0; i < len; i++) {
            hash = 31 * hash + key.charCodeAt(offset++);
            if (hash >= OVERFLOW) {
                hash %= (OVERFLOW + 1);
            }
        }
        return hash;
    }

    function hashFunction(key, capacity) {
        return hashCode(key) & (capacity - 1);
    }

    function HashMap() {
        this._capacity = 32;
        this._tableSize = 0;
        this._size = 0;
        this._resizeRatio = 0.5;
        this._table = new Array(this._capacity);
    }

    var HashMapProto = HashMap.prototype;

    HashMapProto.size = function () {
        return this._size;
    };

    HashMapProto.tableSize = function () {
        return this._tableSize;
    };

    HashMapProto._hashFunction = function (key) {
        return hashCode(key) & (this._capacity - 1);
    };

    HashMapProto.put = function (key, value) {
        // 如果空位少于一半，我们增加数组长度
        if (this._tableSize / this._capacity > this._resizeRatio) {
            this._resize();
        } 
        this.remove(key); // 这里是一个偷懒的小方法。因为map中不能存在同样的key，所以在放入新的key的时候，如果这个key已经存在，新的值将会覆盖旧的值。
        var entry = new Entry(key, value, this._hashFunction(key));
        if (!this._table[entry.hashcode]){ // 如果篮子是空的
            this._table[entry.hashcode] = new LinkedList();
            this._tableSize++; // 这里我们记录目前数组之中list的个数
        }
        this._table[entry.getHashcode()].add(entry); // 在对应的篮子中放入key value
        this._size++;
    };



    HashMapProto._resize = function () {
        var self = this;

        // 我们的数组长度一直是2^n。这样可以提高hash function的运行效率
        self._capacity = self._capacity * 2;


        // LinkedList<Entry>[] array = new LinkedList[capacity]; // 新建一个数组
        // 
        // 对于js array而言，预先分配并没有什么用，因为js array在不连续的状态下会退化成hashTable
        // 所以如果要用HashMap不如用js原生的Map或者jsObject;
        // 这里还原弦子聚聚原写法而已
        var array = new Array(self._capacity);

        self._table
            .filter(function (item) {
                return item !== undefined;
            })
            .forEach(function (item, index) {
                item.stream().forEach(function (e, i) {
                    e.hashcode = self._hashFunction(e.getKey());
                    if (!array[e.hashcode]) {
                        array[e.hashcode] = new LinkedList();
                    }
                    array[e.hashcode].add(e);
                });
            });

        self._table = array;
    };

    HashMapProto.containsKey = function(key) {
        var hashcode = this._hashFunction(key);
        if (hashcode >= this._table.length || this._size <= 0) {
            return false;
        }
        var list = this._table[hashcode];
        if (!list) {
            return false;
        }
        return list.stream().filter(function (item) {
            return item.getKey() === key;
        }).length > 0;
    };

    HashMapProto.remove = function (key) {
        var self = this;
        var hashcode = self._hashFunction(key);
        if (hashcode >= self._table.length || self._size === 0) {
            return false;
        }
        var list = self._table[hashcode];
        if (!list) {
            return false;
        }
        list.removeIf(function (item) {
            return item.getKey() === key;
        });
        if (list.isEmpty()) {
            console.log(list)
            self._tableSize--;
            self._table[hashcode] = undefined;
        }
        self._size--;
    };

    HashMapProto.get = function (key) {
        var hashcode = this._hashFunction(key);
        if (hashcode >= this._table.length || this._size <= 0) {
            return null;
        }
        var list = this._table[hashcode];
        if (!list) {
            return null;
        }
        return list
            .stream()
            .filter(function (item) {
                return item.getKey() === key;
            })
            .map(function (item) {
                return item.getValue();
            })[0] || null;
    }

    return HashMap;
}));
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.recursive = factory();
    }
}(this, function () {

    function fibonacci(n) {
        if (n === 1) {
            return 1;
        }
        if (n === 0) {
            return 0;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    function factorial(n) {
        if (n === 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    function gcd(big, small) {
        if (small === 0) {
            return big;
        }
        return gcd(small, big % small);
    }

    return {
        fibonacci: fibonacci,
        factorial: factorial,
        gcd: gcd
    };
}));
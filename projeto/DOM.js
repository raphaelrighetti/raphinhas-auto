(function(window, document) {
    function DOM(seletor) {
        this.element = document.querySelectorAll(seletor);
    }

    DOM.prototype.on = function on(event, func) {
        Array.prototype.forEach.call(this.element, function(item) {
            item.addEventListener(event, func, false);
        });
    }
    DOM.prototype.off = function off(event, func) {
        Array.prototype.forEach.call(this.element, function(item) {
            item.removeEventListener(event, func, false);
        });
    }
    DOM.prototype.get = function get(index) {
        if(index !== undefined)
            return this.element[index];
        return this.element;
    }

    DOM.prototype.forEach = function forEach(func) {
        Array.prototype.forEach.call(this.element, func);
    }
    DOM.prototype.map = function map(func) {
        return Array.prototype.map.call(this.element, func);
    }
    DOM.prototype.filter = function filter(func) {
        return Array.prototype.filter.call(this.element, func);
    }
    DOM.prototype.reduce = function reduce() {
        return Array.prototype.reduce.apply(this.element, arguments);
    }
    DOM.prototype.reduceRight = function reduceRight() {
        return Array.prototype.reduceRight.apply(this.element, arguments);
    }
    DOM.prototype.every = function every(func) {
        return Array.prototype.every.call(this.element, func);
    }
    DOM.prototype.some = function some(func) {
        return Array.prototype.some.call(this.element, func);
    }

    DOM.is = function is(obj) {
        return Object.prototype.toString.call(obj);
    }
    DOM.isArray = function isArray(obj) {
        return DOM.is(obj) === '[object Array]';
    }
    DOM.isObject = function isObject(obj) {
        return DOM.is(obj) === '[object Object]';
    }
    DOM.isFunction = function isFunction(obj) {
        return DOM.is(obj) === '[object Function]';
    }
    DOM.isNumber = function isNumber(obj) {
        return DOM.is(obj) === '[object Number]';
    }
    DOM.isString = function isString(obj) {
        return DOM.is(obj) === '[object String]';
    }
    DOM.isBoolean =function isBoolean(obj) {
        return DOM.is(obj) === '[object Boolean]';
    }
    DOM.isNull = function isNull(obj) {
        return DOM.is(obj) === '[object Null]' || DOM.is(obj) === '[object Undefined]';
    }

    window.DOM = DOM;
})(window, document);
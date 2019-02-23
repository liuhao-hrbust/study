/**
 * 不带模板字符串
 */

class Vue {
    constructor(options) {
        this.init(options);
    }

    init(options) {
        this.$options = options;
        this.$el = options.el;
        this.$method = options.method;
        this.$data = options.method;
        this.obverse(this.$data);
        this.binding = {};
    }

    obverse(data) {
        let value;
        Object.keys(data).forEach(key, () => {
            this.binding[key] = {
                directions: []
            };
            value = data[key];
            if (typeof value === "object") {
                obverse(value);
            }
            let binding = this.binding[key];
            Object.defineProperty(value, key, {
                configurable: true,
                enumerable: true,
                get() {
                    return value;
                },
                set(newVal) {
                    if (newVal !== value) {
                        data[key] = newVal;
                        binding.directives.forEach(function(item) {
                            // 当number改变时，触发_binding[number]._directives 中的绑定的Watcher类的更新
                            item.update();
                        });
                    }
                }
            });
        });
    }

    complie(root) {
        // root 为 id为app的Element元素，也就是我们的根元素
        let _this = this;
        let nodes = root.children;
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            if (node.children.length) {
                // 对所有元素进行遍历，并进行处理
                this.complie(node);
            }

            if (node.hasAttribute("v-click")) {
                // 如果有v-click属性，我们监听它的onclick事件，触发increment事件，即number++
                node.onclick = (function() {
                    let attrVal = nodes[i].getAttribute("v-click");
                    return _this.$methods[attrVal].bind(_this.$data); //bind是使data的作用域与method函数的作用域保持一致
                })();
            }

            if (
                node.hasAttribute("v-model") &&
                (node.tagName == "INPUT" || node.tagName == "TEXTAREA")
            ) {
                // 如果有v-model属性，并且元素是INPUT或者TEXTAREA，我们监听它的input事件
                node.addEventListener(
                    "input",
                    (function(key) {
                        let attrVal = node.getAttribute("v-model");
                        //_this._binding['number']._directives = [一个Watcher实例]
                        // 其中Watcher.prototype.update = function () {
                        //	node['vaule'] = _this.$data['number'];  这就将node的值保持与number一致
                        // }
                        _this.binding[attrVal].directives.push(
                            new Watcher("input", node, _this, attrVal, "value")
                        );

                        return function() {
                            _this.$data[attrVal] = nodes[key].value; // 使number 的值与 node的value保持一致，已经实现了双向绑定
                        };
                    })(i)
                );
            }

            if (node.hasAttribute("v-bind")) {
                // 如果有v-bind属性，我们只要使node的值及时更新为data中number的值即可
                let attrVal = node.getAttribute("v-bind");
                _this._binding[attrVal]._directives.push(
                    new Watcher("text", node, _this, attrVal, "innerHTML")
                );
            }
        }
    }
}

class Watcher {
    constructor(name, el, vm, exp, attr) {
        this.name = name; //指令名称，例如文本节点，该值设为"text"
        this.el = el; //指令对应的DOM元素
        this.vm = vm; //指令所属myVue实例
        this.exp = exp; //指令对应的值，本例如"number"
        this.attr = attr; //绑定的属性值，本例为"innerHTML"

        this.update();
    }

    update() {
        this.el[this.attr] = this.vm.$data[this.exp];
    }
}

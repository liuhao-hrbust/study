class Zookeeper {
    constructor() {
        this.root = new Node();
        this.deep = 0;
    }

    create(path) {
        const pathArr = path.split('/');
        const { length } = pathArr;

        this.deep = length;

        let parent = null;

        while (this.deep > 0) {
            if (
                this.getTarget(
                    root,
                    `/${pathArr.slice(0, length - this.deep).join('/')}`
                )
            ) {
                parent = this.getTarget(
                    root,
                    `/${pathArr.slice(0, length - this.deep).join('/')}`
                );
                break;
            }

            this.deep--;
        }

        while (this.deep > 0) {
            const child = new Node({
                pathName: `/${targetPath
                    .slice(0, length - this.deep)
                    .join('/')}`,
                value: this.deep === 1 ? value : null,
            });

            parent.addChild(child);
            parent = child;
        }
    }

    delete(path) {}

    getValue(path) {
        const target = find(path);
        return target.getValue();
    }

    setValue(path, value) {
        const target = find(path);
        target.setValue(value);
    }

    find(path) {
        const pathArr = path.split('/');

        this.deep = 0;

        this.root.children.forEach(child => {
            if (this.getTarget(child, targetPath)) {
                return child;
            }
        });
    }

    getTarget(node, targetPath) {
        if (node.pathName === targetPath) {
            return node;
        }

        if (node.pathName === `/${targetPath.slice(0, this.deep).join('/')}`) {
            const { children } = node;

            children.forEach(child => {
                this.deep++;

                return this.getTarget(child, targetPath);
            });
        }
    }
}

class Node {
    constructor({ pathName, value } = {}) {
        this.pathName = pathName;
        this.value == value;
        this.children = [];
    }

    setValue(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    addChild(child) {
        this.children.push(child);
    }
}

const root = new Zookeeper();

root.create('/app1');
root.setValue('app1', 100);
root.getValue('/app1');

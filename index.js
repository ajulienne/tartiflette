module.exports = class Tartiflette {
    /**
     * Parse the json data and create the element tree
     * @param container Element in which to append the tree
     * @param json definition of the tree
     */
    static parse(container, json) {
        for (let el of json) {
            
            const tag = el.tag || 'div';

            // Type of the element
            const node = document.createElement(tag);

            // Syntaxic sugar for several often used elements (rather than specifying an attrs object)
            switch(tag.toLowerCase()) {
                case 'a':
                    this.addAttributes(node, el, ['href', 'target']);
                    break;
                case 'img':
                    this.addAttributes(node, el, ['src', 'alt', 'width', 'height']);
                    break;
                default:
                    break;
            }

            // Inner text and element ID
            if (el.text) {
                node.innerText = el.text;
            }
            if (el.id) {
                node.setAttribute('id', el.id);
            }

            // CSS classes
            if (el.classes) {
                for (const c of el.classes) {
                    node.classList.add(c);
                }
            }

            // Element attributes (such as class, title, etc..)
            if (el.attrs) {
                for (const key in el.attrs) {
                    if (!node.hasAttribute(el.attrs[key])) {
                        node.setAttribute(key, el.attrs[key]);
                    }
                }
            }

            // Element custom data (dataset)
            if (el.dataset) {
                for (const key in el.dataset) {
                    node.dataset[key] = el.dataset[key];
                }
            }

            // Element children (recursive call)
            if (el.children) {
                this.parse(node, el.children);
            }

            container.append(node);
        }
    }

    static addAttributes(node, el, attributes) {
        for (let a of attributes) {
            if (el[a]) {
                node.setAttribute(a, el[a]);
            }
        }
    }

}

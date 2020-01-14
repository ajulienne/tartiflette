module.exports = class Tartiflette {
    /**
     * Parse the json data and create the element tree
     * @param container Element in which to append the tree
     * @param json definition of the tree
     */
    static parse(container, json) {
        for (let el of json) {
            
            // Type of the element
            const div = document.createElement(el.tag || 'div');

            // Inner text
            if (el.text) {
                div.innerText = el.text;
            }
            
            // Element ID
            if (el.id) {
                div.setAttribute('id', el.id);
            }

            // Element attributes (such as class, title, etc..)
            if (el.attrs) {
                for (const key in el.attrs) {
                    div.setAttribute(key, el.attrs[key]);
                }
            }

            // Element custom data (dataset)
            if (el.dataset) {
                for (const key in el.dataset) {
                    div.dataset[key] = el.dataset[key];
                }
            }

            // Element children (recursive call)
            if (el.children) {
                this.parse(div, el.children);
            }

            container.append(div);
        }
    }
}

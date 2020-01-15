# Tartiflette

[![Build Status](https://travis-ci.com/ajulienne/tartiflette.svg?branch=master)](https://travis-ci.com/ajulienne/tartiflette)

Create a DOM tree from a JSON object.

## Usage

`parse(container, json)` :

* `container`: DOM Element in which to append the created elements
* `json`: Array of nodes. Each node can have the following :
  * `text`: inner text
  * `tag`: tag of the element. Default to `div`.
  * `id`: value of the `id` attribute
  * `attrs`: object defining the attributes of the node
  * `dataset`: object defining the data attributes of the node
  * `children`: array of children nodes.

## Exemple

```javascript
const data = [
    {
        tag: 'h1',
        text: 'Tartiflette generated list'
    },
    {
        tag: 'img',
        attrs: {
            src: 'http://some-image.png',
            title: 'Image title'
        }
    },
    {
        tag: 'ul',
        children: [
            {
                tag: 'li',
                text: 'first item'
            },
            {
                tag: 'li',
                text: 'second item'
            }
        ]
    },
    {
        tag: 'button',
        text: 'Click me!',
        dataset: {
            tartiflette: 'value'
        }
    }
];

Tartiflette.parse(document.getElementById('container'), data);
```

This will yield the following HTML :

```html
<div id="container">
    <h1>Tartiflette generated list</h1>
    <img src="http://some-image.png" title="Image title">
    <ul>
        <li>first item</li>
        <li>second item</li>
    </ul>
    <button data-tartiflette="value">Click me!</button>
</div>
```
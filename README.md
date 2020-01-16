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

For ease of use and readability, some more common elements have dedicated attributes (instead of using the `attrs` object) :
* `a`:
  * `href`
  * `target`
* `img`:
  * `src`
  * `alt`
  * `width`
  * `height`

## Exemple

```javascript
const data = [
    {
        "tag": "h1",
        "text": "Tartiflette generated list"
    },
    {
        "children": [
            {
                "tag": "a",
                "text": "Tartiflette github",
                "href": "https://github.com/ajulienne/tartiflette"
            }
        ]
    },
    {
        "tag": "img",
        "src": "http://some-image.png",
        "alt": "Alt text",
        "attrs": {
            "title": "Image title"
        }
    },
    {
        "tag": "ul",
        "children": [
            {
                "tag": "li",
                "text": "first item"
            },
            {
                "tag": "li",
                "text": "second item"
            }
        ]
    },
    {
        "tag": "button",
        "text": "Click me!",
        "dataset": {
            "tartiflette": "value"
        },
        "classes": ["primary", "large"]
    }
];

Tartiflette.parse(document.getElementById('container'), data);
```

This will yield the following HTML :

```html
<div id="container">
    <h1>Tartiflette generated list</h1>
    <div>
        <a href="https://github.com/ajulienne/tartiflette">Tartiflette github</a>
    </div>
    <img src="http://some-image.png" alt="Alt text" title="Image title">
    <ul>
        <li>first item</li>
        <li>second item</li>
    </ul>
    <button class="primary large" data-tartiflette="value">Click me!</button>
</div>
```
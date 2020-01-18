# Tartiflette

[![Build Status](https://travis-ci.com/ajulienne/tartiflette.svg?branch=master)](https://travis-ci.com/ajulienne/tartiflette)
[![codecov](https://codecov.io/gh/ajulienne/tartiflette/branch/master/graph/badge.svg)](https://codecov.io/gh/ajulienne/tartiflette)

Create a DOM tree from a JSON object.

Tartiflette aims to improve the code readability when you need to create DOM elements in javascript. You only need to define the elements you want to create in a JSON format that represents the tree, and to specify a container in which to append those elements.

For example :

Without Tartiflette

```javascript
const container = document.getElementById("container");

const firstDiv = document.createElement("div");
const paragraph = document.createElement("p");
paragraph.innerText = "Some text."

const anchor = document.createElement("a");
anchor.setAttribute("href", "http://google.com");
anchor.innerText = "Google";
paragraph.append(anchor);
firstDiv.append(paragraph);

const list = document.createElement("ul");
list.classList.add("somme-class");

const firstItem = document.createElement("li");
firstItem.innerText = "First item";

const secondItem = document.createElement("li");
secondItem.innerText = "Second item";

list.append(firstItem);
list.append(secondItem);
container.append(firstDiv);
container.append(list);
```

With tartiflette

```javascript
const container = document.getElementById("container");

const data = [
    {
        tag: 'div',
        children: [
            {
                tag: 'a',
                text: 'Google',
                href: 'http://google.com'
            }
        ]
    },
    {
        tag: 'ul',
        classes: ['some-class'],
        children: [
            {
                tag: 'li',
                text: 'First item'
            },
            {
                tag: 'li',
                text: 'Second item'
            }
        ]
    }
];

Tartiflette.parse(container, data);
```

## Installation

Get the lib from NPM :

```bash
npm install --save tartiflette
```

You can then import it in your JS files :

```javascript
// ES2015
import * as Tartiflette from 'tartiflette';
Tartiflette.parse(container, data);

// CommonJS
const Tartiflette = require('tartiflette');
Tartiflette.parse(container, data);

//AMD
require(['tartiflette'], function(tartiflette) {
    tartiflette.parse(container, data);
});
```

You can also directly include the `tartiflette.js` file in your HTML and use the provided `tartiflette` object :

```html
<script type="text/javascript" src="https://unpkg.com/tartiflette/dist/tartiflette.js"></script>
<script type="text/javascript">
    tartiflette.parse(container, data);
</script>
```

## Usage

`parse(container, json)` :

-  `container`: DOM Element in which to append the created elements

-  `json`: Array of nodes. Each node can have the following :

  -  `text`: inner text

  -  `tag`: tag of the element. Default to `div`.

  -  `id`: value of the `id` attribute

  -  `attrs`: object defining the attributes of the node

  -  `dataset`: object defining the data attributes of the node

  -  `children`: array of children nodes.

For ease of use and readability, some more common elements have dedicated attributes (instead of using the `attrs` object) :

-  `a`:

  -  `href`

  -  `target`

-  `img`:

  -  `src`

  -  `alt`

  -  `width`
  
  -  `height`

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
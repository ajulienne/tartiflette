const Tartiflette = require('./index');

test('should create a single element', () => {
    const el = document.createElement('div');
    Tartiflette.parse(el, [{
        text: 'test'
    }]);
    expect(el.childElementCount).toBe(1);
    expect(el.firstChild.innerText).toBe('test');
});

test('should create multiple elements', () => {
    const el = document.createElement('div');
    Tartiflette.parse(el, [{
        text: 'element1'
    }, {
        text: 'element2'
    }]);
    expect(el.childElementCount).toBe(2);
});

test('should create a single element with sub elements', () => {
    const el = document.createElement('div');
    Tartiflette.parse(el, [{
        text: 'test',
        children: [
            {
                text: 'sub1'
            },
            {
                text: 'sub2'
            }
        ]
    }]);
    expect(el.childElementCount).toBe(1);
    expect(el.firstChild.childElementCount).toBe(2);
});

test('should create a list', () => {
    const el = document.createElement('div');
    Tartiflette.parse(el, [{
        tag: 'ul',
        children: [
            {
                text: 'el 1',
                tag: 'li'
            },
            {
                text: 'el 2',
                tag: 'li'
            }
        ]
    }]);
    expect(el.firstElementChild.tagName).toBe('UL');
    expect(el.firstElementChild.firstElementChild.tagName).toBe('LI');
});

test('should create an element with an ID', () => {
    const el = document.createElement('div');
    Tartiflette.parse(el, [{
        text: 'element',
        id: 'EL'
    }]);
    expect(el.firstChild.getAttribute('id')).toBe('EL');
});

test('should create an element with a title attribute', () => {
    const el = document.createElement('div');
    const str = 'element title'
    Tartiflette.parse(el, [{
        text: 'element',
        attrs: {
            title: str
        }
    }]);
    expect(el.firstChild.getAttribute('title')).toBe(str);
});

test('should create an element with a data attribute', () => {
    const el = document.createElement('div');
    const value = 'some value'
    Tartiflette.parse(el, [{
        text: 'element',
        dataset: {
            key: value
        }
    }]);
    expect(el.firstElementChild.dataset['key']).toBe(value);
});

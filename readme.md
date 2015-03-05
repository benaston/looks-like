# looks-like

Compare objects by property type.

File size: **563 bytes**.<br/>
Supported platforms: **server and browser**.<br/>
Supported language versions: **ES5 and above**.

If you use this library in your software please tweet me @benastontweet.

## Installation

```npm install looks-like```

## Example

```javascript
var looksLike = require('looks-like');

var o1, o2, example;

o1 = {
	bar: {
		bam: 'bam1',
		bat: null
	},
	baz: 42
};

o2 = {
	bar: {
		bam: 'bam1',
		bat: null
	},
	baz: '42'
};

example = {
	foo: {
		bar: {
			bam: 'bam2'
		},
		baz: 1
	}
};

looksLike(o1, example); // true
looksLike(o2, example); // false because o2.baz differs in type from example.baz.
```

## License & Copyright

This software is released under the MIT License. It is Copyright 2015, Ben Aston. I may be contacted at ben@bj.ma.

## How to Contribute

Pull requests including bug fixes, new features and improved test coverage are welcomed. Please do your best, where possible, to follow the style of code found in the existing codebase.
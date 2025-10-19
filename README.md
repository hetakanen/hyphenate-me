# Hyphenate Me! :curly_loop:

## Overview

<img loading="lazy" src="./img/banner.jpg"/>

A web application for text hyphenation across multiple languages. Breaks words by inserting hyphens followed by spaces to indicate line break points

### Supported Languages
- English (en-us)
- Finnish (fi)
- Swedish (sv)
- German (de)

#### Examples:
```
Ystävälliset tervetulotoivotukset → Ys- ­tä- ­väl- ­li- ­set ter- ­ve- ­tu- ­lo- ­toi- ­vo- ­tuk- ­set
Talonpojan kissanpoika → Ta- ­lon- ­po- ­jan kis- ­san- ­poi- ­ka
```

## Tech Stack
- Built with Vite react-ts template
- Uses [hyphen](https://www.npmjs.com/package/hyphen) library for hyphenation patterns
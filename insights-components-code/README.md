# insights-components

> shared assets and components for insights app

[![NPM](https://img.shields.io/npm/v/insights-components.svg)](https://www.npmjs.com/package/insights-components) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save insights-components
```

## Usage

```jsx
import React, { Component } from 'react'

import { MyComponent } from 'insights-components'
import 'insights-components/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## Release

    // standard release method
    ./release.sh
    
    // for bumping version automatically
    npm run release 
    
    // to publish the release
    git push --follow-tags origin master && npm publish
    the above command takes optional flags for alpha and beta release version
    --tag beta (for beta)
    --tag alpha (for alpha)
    
for more optional flags and release methods please read the official [standard-version](https://www.npmjs.com/package/standard-version) docs

## License

MIT © [akash-singh-au6](https://github.com/akash-singh-au6)

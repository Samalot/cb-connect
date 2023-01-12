[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# cb-connect

A utility library to download svg and attribute data for CyberBrokers (from the Ethereum Blockchain)


## Basic Usage

### loadBroker

Load data about a broker (Promise based)

```jsx
  import { loadBroker } from "cb-connect";

  const myFunction = async () => {
    const brokerID = 1000;
    const brokerData = await loadBroker(brokerID, provider);
  };
```

## Installation

Using npm:

```bash
  $ npm install cb-connect
```
    
## Basic Usage

### loadBroker

Load data about a broker (Promise based)

Input:
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `brokerID` | `number` | **Required**. The ID of the broker |
| `provider` | `provider` | **Optional**. A blockchain provider, if none is provided, then an Ethers.js one is automatically generated|

```jsx
  import { loadBroker } from "cb-connect";
  const BROKER_ID = 1000;

  const myFunction = async () => {
    const brokerData = await loadBroker(BROKER_ID, provider);
  };
```

Example Output: 

```jsx
{
  attributes: {
    className: "Leftovers",
    species: "Human",
    talent: "Leftover"
  },
  skills: {
    body: 19,
    mind: 11,
    soul: 4
  },
  layers: [
    {
      id: 5,
      data: '<defs></defs><g stroke="none" stroke-width="1" fil…ate(-194,-764)" id="id-31291"></path></g></g></g>',
      layerID: 114,
      label: "Twist Buns",
      group: "Hair"
    }
  ]
}
```

### buildSVGString

takes the svg layers object from loadBroker and turns it into a complete SVG string

```jsx
  import { loadBroker } from "cb-connect";
  const BROKER_ID = 1000;

  const myFunction = async () => {
    const brokerData = await loadBroker(BROKER_ID, provider);
    const svgString = buildSVGString(broker.layers);
  };
```
## Contributing

Contributions are always welcome! For any help, please contact me at samalotmedia@gmail.com
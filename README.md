# Package optimization

This NodeJs module resolves knapsack 01 problem reading data from a file and listing each item put in the package. It solves the problem using dynamic programming with recursiveness and memoization

## Installation

Use the node package manager (v14.15.1) [npm](https://www.npmjs.com/get-npm) to install dependencies and run the project. After the installation just run the following command on your terminal.

```bash
npm i
```

## Test

```bash
npm run test
```

## Build

```bash
npm run build
```

## Usage

```javascript
import { Packer } from '../package-optimization/dist';

const result = Packer.pack('/Users/lucas/Desktop/input');
console.log(result);
```

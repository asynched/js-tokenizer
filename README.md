# JS-TOKENIZER

Studies on compilers: Learning how a tokenizer works by building one.

## Requirements

- NodeJS
- Yarn

## Installation

### Dependencies

Install the dependencies running:

```sh
$ yarn
```

### Execute

#### Building a list of tokens

Execute the application by running:

```sh
$ yarn start
```

This is going to output an array to the console and it'll create a file named `tokens.json` in the root folder. The output file will look something close to:

```json
[
  {
    "type": "keyword",
    "value": "let"
  },
  {
    "type": "identifier",
    "value": "name"
  },
  {
    "type": "ponctuation",
    "value": "="
  },
  {
    "type": "string",
    "value": "Eder"
  },
  {
    "type": "ponctuation",
    "value": ";"
  },
  {
    "type": "keyword",
    "value": "let"
  },
  {
    "type": "identifier",
    "value": "age"
  },
  {
    "type": "ponctuation",
    "value": "="
  },
  {
    "type": "number",
    "value": "15"
  },
  {
    "type": "operator",
    "value": "+"
  },
  {
    "type": "number",
    "value": "5"
  },
  {
    "type": "ponctuation",
    "value": ";"
  }
]
```

#### Building a list of tokens (Development)

To execute the app on each save, just run:

```sh
yarn dev
```

The output will be the same as above, but now the script will auto execute on reload.

## Author

| ![Eder Lima](https://github.com/asynched.png?size=100) |
| ------------------------------------------------------ |
| [Eder Lima](https://github.com/asynched)               |

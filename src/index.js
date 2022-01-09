// @ts-check

const fs = require('fs')

const KEYWORDS = [
  'let',
  'const',
  'function',
  'var',
  'void',
  'undefined',
  'null',
]
const PONCTUATIONS = ['=', ';', '{', '}']
const OPERATORS = ['+', '-', '/', '*', '%', '<', '>']
const STRING = ['"', "'", '`']

const WORDS = /^(\$?[\w\d]+?)$/ // FIXME: This won't really work, since it allows identifiers or keywords to start with numbers. It's a workaround.
const WHITESPACE = /(\s|\n)/
const NUMBERS = /[\d]/
const NUMBERS_FLOATING = /(\d|\.)/

/**
 * @typedef TokenType
 * @property { string } type
 * @property { string } value
 */

/**
 * Tokenizes an input program and returns a list of all the matched tokens inside the program
 * @param { string } program
 * @returns { TokenType[] } List of all the tokens
 */
const tokenizer = (program) => {
  let current = 0
  const tokens = []

  while (current < program.length) {
    let char = program[current]

    // If the current char matches any ponctuation
    // append it as a token an skip to the next char
    if (PONCTUATIONS.includes(char)) {
      tokens.push({
        type: 'ponctuation',
        value: char,
      })
    }

    // If the current char matches any operator
    // append it as a token and skip to the next char
    if (OPERATORS.includes(char)) {
      tokens.push({
        type: 'operator',
        value: char,
      })
    }

    // If the current character is a
    // whitespace, skip to the next char
    if (WHITESPACE.test(char)) {
      current++

      // Skips to the next token
      continue
    }

    // If the current character is a number
    // continue until it isn't anymore
    if (NUMBERS.test(char)) {
      let number = ''

      while (NUMBERS_FLOATING.test(char)) {
        // Appends the current character to
        // the number value
        number += char

        // Continues to the next character
        current += 1
        char = program[current]
      }

      tokens.push({
        type: 'number',
        value: number,
      })

      // Skips to the next token
      continue
    }

    if (STRING.includes(char)) {
      let string = ''
      let stringIdentifier = char

      // Skips to the next token, since the current
      // will be the string identifier
      current += 1
      char = program[current]

      while (char != stringIdentifier) {
        // Appends the current character to the
        // end of the string
        string += char

        // Goes to the next character
        current += 1
        char = program[current]
      }

      tokens.push({
        type: 'string',
        value: string,
      })

      // Adds 1 to the current, since when the loop
      // exits, the current token will be the string
      // identifier
      current += 1

      continue
    }

    // If the current char matches a test for words (such as a keyword or an identifier),
    // loop until it doesn't match anymore and append the token as either an identifier
    // or a keyword.
    if (WORDS.test(char)) {
      let token = ''

      // While the current char matches
      // a word test, append the char
      // to the token
      while (WORDS.test(char)) {
        token += char
        current += 1
        char = program[current]
      }

      // Test for a keyword or push it as an identifier
      if (KEYWORDS.includes(token)) {
        tokens.push({
          type: 'keyword',
          value: token,
        })
      } else {
        tokens.push({
          type: 'identifier',
          value: token,
        })
      }

      continue
    }

    current++
  }

  return tokens
}

/**
 * Logs and writes a file
 * @param { TokenType[] } tokens Tokens
 */
const logAndWriteTokens = (tokens) => {
  console.log(tokens)
  fs.writeFileSync('tokens.json', JSON.stringify(tokens, null, 4))
}

let program = `let name = "Eder";
let age = 15 + 5;`

const tokens = tokenizer(program)

logAndWriteTokens(tokens)

// @ts-check

const KEYWORDS = [
  'let',
  'const',
  'function',
  'var',
  'void',
  'undefined',
  'null',
]
const PONCTUATIONS = ['=', '<', '>', ';']
const OPERATORS = ['+', '-', '/', '*', '%']
const STRING_IDENTIFIERS = ['"', "'", '`']

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
        char = program[current]
        current++
      }

      tokens.push({
        type: 'number',
        value: number,
      })

      // Skips to the next token
      continue
    }

    current++
  }

  return tokens
}

let program = `let name = "Eder";
let age = 15 + 5;`

console.log(tokenizer(program))
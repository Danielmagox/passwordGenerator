import _ from 'lodash'
const passwordStrength = require('check-password-strength')

const pwEl = document.getElementById('pw')
const copyEl = document.getElementById('copy')
const lenEl = document.getElementById('len')
const upperEl = document.getElementById('upper')
const lowerEl = document.getElementById('lower')
const numberEl = document.getElementById('number')
const symbolEl = document.getElementById('symbol')
const generateEl = document.getElementById('generate')
const checkSec = document.getElementById('security')
const ambigousEl = document.getElementById('ambigous')
const formBody = document.querySelector('.pw-body')
const userPwd = document.getElementById('user_pwd')

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'
const symbols = '!@#$%^&*+='
const ambiguousCharacters = '?¿_()[]/"|~,;:.<>'
let counter = 0

const getLowercase = () => {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)]
}

const getUppercase = () => {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)]
}

const getNumber = () => {
  return numbers[Math.floor(Math.random() * numbers.length)]
}

const getSymbol = () => {
  return symbols[Math.floor(Math.random() * symbols.length)]
}

const getAmbigousCharacter = () => {
  return ambiguousCharacters[
    Math.floor(Math.random() * ambiguousCharacters.length)
  ]
}

const generatePassword = () => {
  const len = lenEl.value

  let password = ''

  if (upperEl.checked) {
    password += getUppercase()
  }

  if (lowerEl.checked) {
    password += getLowercase()
  }

  if (numberEl.checked) {
    password += getNumber()
  }

  if (symbolEl.checked) {
    password += getSymbol()
  }

  if (ambigousEl.checked) {
    password += getAmbigousCharacter()
  }
  for (let i = password.length; i < len; i++) {
    const x = generateX()
    password += x
  }
  password = _.shuffle(password)
  password = password.join()
  password = password.replace(/,/g, '')
  pwEl.innerText = password
}

const generateX = () => {
  const xs = []
  if (upperEl.checked) {
    xs.push(getUppercase())
  }

  if (lowerEl.checked) {
    xs.push(getLowercase())
  }

  if (numberEl.checked) {
    xs.push(getNumber())
  }

  if (symbolEl.checked) {
    xs.push(getSymbol())
  }

  if (ambigousEl.checked) {
    xs.push(getAmbigousCharacter())
  }

  if (xs.length === 0) return ''

  return xs[Math.floor(Math.random() * xs.length)]
}

generateEl.addEventListener('click', generatePassword)

copyEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = pwEl.innerText

  if (!password) {
    return
  }

  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert('Password copied to clipboard')
})

checkSec.addEventListener('click', () => {
  const span = document.createElement('span')
  span.className += 'form-control'
  counter++
  if (passwordStrength(userPwd.value).value === 'Weak') {
    span.innerText = 'Security : Weak'
  }
  if (passwordStrength(userPwd.value).value === 'Medium') {
    span.innerText = 'Security : Medium'
  }
  if (passwordStrength(userPwd.value).value === 'Strong') {
    span.innerText = 'Security : Strong'
  }
  if (counter === 1) {
    formBody.appendChild(span)
  } else if (counter >= 2) {
    formBody.removeChild(formBody.lastElementChild)
    formBody.appendChild(span)
  }
})

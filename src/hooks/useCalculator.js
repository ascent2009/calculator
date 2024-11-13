import { ref, onMounted } from 'vue'

export const useCalculator = () => {
  let equation = ref('')
  let resultCalled = ref(false)
  let lastResult = ref(0)

  function buttonSwitch(val) {
    switch (val) {
      case this.buttons[0].title:
        clear()
        break
      case this.buttons[1].title:
        backspace()
        break
      case this.buttons[12].title:
        useNumber(val)
        break
      case this.buttons[13].title:
        useNumber(val)
        break
      case this.buttons[14].title:
        useNumber(val)
        break
      case this.buttons[8].title:
        useNumber(val)
        break
      case this.buttons[9].title:
        useNumber(val)
        break
      case this.buttons[10].title:
        useNumber(val)
        break
      case this.buttons[4].title:
        useNumber(val)
        break
      case this.buttons[5].title:
        useNumber(val)
        break
      case this.buttons[6].title:
        useNumber(val)
        break
      case this.buttons[17].title:
        useNumber(val)
        break
      case this.buttons[18].title:
        if (!equation.value) return
        useNumber(val)
        break
      case percentOperator:
        percent(val)
        break
      case minusOperator:
        minus()
        break
      case plusOperator:
        plus()
        break
      case minusPlusOperator:
        minusPlus()
        break
      case multiplyOperator:
        multiply()
        break
      case divideOperator:
        divide()
        break
      case '=':
        result()
        break
      default:
        break
    }
  }

  const useNumber = (num) => {
    equation.value = resultCalled.value
      ? num
      : equation.value.search(/^0/g)
        ? equation.value + num
        : equation.value.search(/^[-]$/g) !== -1
          ? equation.value + num
          : num

    resultCalled.value = false
  }
  const plusOperator = '+'
  const plus = () => {
    if (!equation.value) return
    // if (equation.value.includes('+')) return
    if (equation.value.includes('-')) equation.value.replace('-', '+')
    equation.value = checkOperator(equation.value, plusOperator)
  }
  const minusOperator = '-'
  const minus = () => {
    // if (equation.valu  e.includes('-')) return
    if (equation.value.includes('+')) equation.value.replace('+', '-')
    equation.value = checkOperator(equation.value, minusOperator)
  }
  const percentOperator = '%'
  const percent = () => {
    if (!equation.value) return
    if (equation.value.includes('%')) return
    equation.value = equation.value / 100
    // equation.value += String(equation.value)
    resultCalled.value = true
    equation.value = checkOperator(equation.value, percentOperator)

    // equation.value = String(equation.value / 100)
  }
  const minusPlusOperator = '+/-'
  const minusPlus = () => {
    let finalEqn = equation.value.replace(/( [+\-/*] )$/g, '')
    let eqResult = Function('"use strict";return (' + finalEqn.replace(/( \x+ )/g, ' * ') + ')')()
    equation.value = `${-eqResult.toLocaleString()}`
  }
  const multiplyOperator = '*'
  const multiply = () => {
    if (!equation.value) return
    if (equation.value.includes('*')) return
    equation.value = checkOperator(equation.value, multiplyOperator)
  }
  const divideOperator = '/'
  const divide = () => {
    if (!equation.value) return
    if (equation.value.includes('/')) return
    equation.value = checkOperator(equation.value, divideOperator)
    // equation.value = equation.value / equation.value
  }

  const checkOperator = (equation, requestedOperator = null) => {
    if (equation.search(/^0$/g) !== -1) {
      if (requestedOperator.search(/( [/*] )$/g) !== -1) return '0'
      else return requestedOperator.replace(/ /g, '')
    } else {
      if (resultCalled.value) {
        resultCalled.value = false
        return lastResult.value + requestedOperator
      } else {
        return equation.replace(/( [+\-/*%] )$/g, '') + requestedOperator
      }
    }
  }
  const result = () => {
    let finalEqn = equation.value.replace(/( [+\-/*] )$/g, '')
    resultCalled.value = finalEqn.search(/( [+\-/*] )/g) !== -1
    let eqResult = Function('"use strict";return (' + finalEqn.replace(/( \x+ )/g, ' * ') + ')')()
    equation.value = `${eqResult.toLocaleString()}`
    lastResult.value = eqResult
    // resultCalled.value = false
  }
  const clear = () => {
    equation.value = ''
    lastResult.value = '0'
  }
  const backspace = () => {
    equation.value = equation.value.substring(0, equation.value.length - 1)
  }
  const handleKeyDown = (e) => {
    const regKey = /[0-9]*-*\+*\/*\**%*\.*/g
    // if (regKey.test(e.key)) equation.value = 'Cool!'

    if (e.key === 'Enter') {
      result()
      // equation.value = ''
    }
    if (e.key === 'Escape') {
      clear()
      equation.value = ''
    }
    let tempEqValue = e.key
    if (regKey.test(e.tempEqValue)) {
      equation.value += tempEqValue
      console.log('e.key: ', typeof e.key)
    }
  }

  onMounted(() => window.addEventListener('keydown', handleKeyDown))

  return { equation, lastResult, handleKeyDown, buttonSwitch }
}

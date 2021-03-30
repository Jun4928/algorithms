const log = console.log

const isNumberRegExp = /\d/
const splitByNumbers = (str) => {
  return [...str].reduce((acc, el, idx) => {
    if (isNumberRegExp.test(el) && isNumberRegExp.test(str[idx - 1])) {
      acc[idx - 1] = acc[idx - 1] + el
      return acc
    }

    acc.push(el)
    return acc
  }, [])
}

const decode = (str) => {
  str = splitByNumbers(str)

  const stack = []
  let decoded = ''
  let index = 0
  while (index < str.length) {
    const current = str[index]
    if (current === '[') stack.push(index)
    if (current === ']') {
      const popped = stack.pop()

      if (stack.length === 0) {
        decoded += decode(str.slice(popped + 1, index)).repeat(Number(str[popped - 1]))
      }
    }

    if (!isNumberRegExp.test(current) && current !== '[' && current !== ']' && stack.length === 0)
      decoded += current
    index += 1
  }

  return decoded
}

log(decode('3[ab]2[c]')) // abababcc
log(decode('3[ab]2[c]def')) // abababccdef
log(decode('def15[abc]')) // defabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc
log(decode('5[ab2[c]]')) // abccabccabccabccabcc
log(decode('1[ab3[d5[e]]]')) // abdeeeeedeeeeedeeeee

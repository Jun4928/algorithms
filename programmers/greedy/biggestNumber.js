function solution(number, k) {
  const stack = []

  for (let idx in number) {
    const current = number[idx]

    let top = stack[stack.length - 1]
    while (k > 0 && top < current) {
      stack.pop(current)
      k -= 1
      top = stack[stack.length - 1]
    }

    stack.push(current)
  }

  stack.splice(-k, k)
  return stack.join('')
}

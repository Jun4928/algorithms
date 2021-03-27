# Greedy 알고리즘

- 탐욕스러운 선택이 최적의 해를 이끄는 알고리즘
- 보통 정렬 후에 해결 방법을 접근하는 것이 좋다.

## 큰 수 만들기

- k 만큼 삭제해서 큰 수를 만들어야 하는 문제
- 배열의 처음부터 끝까지 순회한다.
- 스택에다 숫자를 담고, 현재수와 비교해서 작은 것들을 걸러내는 방식으로 한다.

```js
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
```

## 구명 보트

- 투 포인터를 사용해서 푸는 문제
- 보트에 2명씩 탈 수 있고, 가장 적게 보트를 사용해야 한다.
- 즉, 몸무게가 가장 적게 나가는 사람과 가장 많이 나가는 사람이 짝을 이뤄서 보트에 타는 것이 좋다.
- 그게 아니라면 보트에 한 명씩 태운다.

```js
function solution(people, limit) {
  people = people.sort((a, b) => a - b)
  let [left, right] = [0, people.length - 1]

  let boats = 0
  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left += 1
    }

    right -= 1
    boats += 1
  }

  return boats
}
```

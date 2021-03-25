# Challenges

> 단번에 아이디어가 떠오르지 않았던 문제들

## 스킬트리

### 큐의 성질을 이용하자

> 필수로 배워야 하는 스킬: required
> 유저가 만든 스킬트리: skillTree

라고 했을 때, 스킬트리에서 스킬을 하나씩 꺼내서 필수로 배워야하는 스킬에서 현재 스킬을 지우고, 그 인덱스가 0인지를 확인한다.

순서를 지키기 위해서는 **가장 맨 앞** 에 있는 것을 확인하면 되기 때문에

```js
const isValidSkills = (required, skillTree) => {
  while (skillTree.length) {
    const currentSkill = skillTree.shift()
    let indexInRequired
    required = required.filter((skill, idx) => {
      if (skill === currentSkill) {
        indexInRequired = idx
        return false
      }

      return true
    })

    // required 에서 지워진 인덱스가 매번 0인지 확인하기
    // 순서를 지키기 위해서는 가장 맨 앞에 있는 것을 확인하면 된다.
    if (indexInRequired !== 0) return false
  }

  return true
}
```

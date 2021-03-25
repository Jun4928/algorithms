const log = console.log

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

    if (indexInRequired !== 0) return false
  }

  return true
}

function solution(skill, skill_trees) {
  const required = [...skill]

  const skillTrees = skill_trees.map((skill_tree) =>
    [...skill_tree].filter((skill) => required.includes(skill))
  )

  return skillTrees.filter((skillTree) => isValidSkills(required, skillTree)).length
}

// 2
log(solution('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA']))

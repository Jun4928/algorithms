/**
 * https://leetcode.com/problems/maximum-number-of-balloons/description/
 * # 1189. Maximum Number of Balloons
 *
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function (text) {
  const allowed = new Set('balloon')
  let counter = new Map([...allowed.values()].map(v => [v, 0]))
  for (const character of text) {
    if (allowed.has(character)) {
      counter.set(character, counter.get(character) + 1)
    }
  }

  // b => 1, a => 1, l => 2, o => 2, n => 1
  counter.set('l', Math.floor(counter.get('l') / 2))
  counter.set('o', Math.floor(counter.get('o') / 2))
  return Math.min(...counter.values())
}

console.log(maxNumberOfBalloons('nlaebolko')) // 1
console.log(maxNumberOfBalloons('loonbalxballpoon')) // 2
console.log(maxNumberOfBalloons('leetcode')) // 0
console.log(maxNumberOfBalloons('balllllllllllloooooooooon')) // 1
console.log(
  maxNumberOfBalloons(
    'krhizmmgmcrecekgyljqkldocicziihtgpqwbticmvuyznragqoyrukzopfmjhjjxemsxmrsxuqmnkrzhgvtgdgtykhcglurvppvcwhrhrjoislonvvglhdciilduvuiebmffaagxerjeewmtcwmhmtwlxtvlbocczlrppmpjbpnifqtlninyzjtmazxdbzwxthpvrfulvrspycqcghuopjirzoeuqhetnbrcdakilzmklxwudxxhwilasbjjhhfgghogqoofsufysmcqeilaivtmfziumjloewbkjvaahsaaggteppqyuoylgpbdwqubaalfwcqrjeycjbbpifjbpigjdnnswocusuprydgrtxuaojeriigwumlovafxnpibjopjfqzrwemoinmptxddgcszmfprdrichjeqcvikynzigleaajcysusqasqadjemgnyvmzmbcfrttrzonwafrnedglhpudovigwvpimttiketopkvqw'
  )
)

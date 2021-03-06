# myLibrary

### findMatchedIndexes.js

- 문자열과 찾고자 하는 단어가 주어졌을 때 문자열 내에 매칭되는 단어의 인덱스를 리턴하는 함수
- RegExp 의 **exec** 함수를 반복해서 사용한다.

```js
/**
 *
 * @param {string} str
 * @param {string} word
 * @returns {number[]} matched indecies of string with keyword
 */
```

### convertToColumns.js

- 2차원 행렬이 주어졌을 때
- column 기반으로 바꾸는 함수

```js
/**
 *
 * @param {arr[][]} matrix
 * @returns {arr[][]} columns 기반 2차원 배열
 */
```

### deleteUntil.js

- 배열의 뒤에서 k 만큼 삭제하는 함수

```js
/**
 *
 * @param {T[]} arr
 * @param {number} k
 */
```

### getCombination.js

조합 알고리즘, 재귀함수 사용했다. 핵심은 현재의 값(고정된 값)을 제외한 뒤의 배열에 대해서 똑같이 조합을 구하는 함수를 다시 콜한 후에 그 앞에 붙여주는 것. 조합은 순서가 상관없으니까, 앞에서 부터 순서대로 조합을 구하면 된다.

```javascript
const rest = origin.slice(index + 1) // 해당하는 fixed를 제외한 나머지 뒤
```

### getPermutation.js

위의 조합 알고리즘과 같은 구조에, 현재의 값(고정된 값)을 제외한 나머지 배열에 대해서 똑같이 순열을 구하는 함수를 다시 콜한 후에 그 앞에 붙여주는 것이 핵심이다. 한가지 다른점이 있다면 "나머지 배열"을 구할 때에 **순서**를 중요시 여기는 순열의 경우에 다음과 같이 나머지 배열의 모든 값에 대해서 순열을 구해야 한다.

```javascript
const rest = [...origin.slice(0, index), ...origin.slice(index + 1)] // 해당하는 fixed를 제외한 나머지 배열
```

### getSubsets.js

input으로 들어오는 배열에 대해서 멱집합(부분집합)을 구하는 함수. DFS(Depth First Search) 알고리즘으로 해결할 수 있다.

### setMethods.js

- 합집합, 교집합, 차집합, 대칭차집합, 상위집합 > 부분집합 여부를 구하는 함수 미리 구현 해 놓기

### mergeSort.js

- merge function: pure function that puts sorted left and right arrays into one array
- mergeSort function: recursive call

### quickSort.js

There are two other possible ways to impelement partition function which plays a key role in the quick sort algorithm

- lomuto's partition: always pick the end as the pivot value
- hoare's partition: pick the medium value as the pivot value

### memoization.js

- generic memoization function by using clousre, object, spread syntax

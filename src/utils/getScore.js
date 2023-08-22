import isEmpty from "medash/lib/isEmpty"
import toArray from "medash/lib/toArray"
export default (item = {}) => {
    const { userList = [], score } = item
    if (isEmpty(userList)) return score
    const scoreSet = new Set()
    const num = 1
    userList.forEach(u => {
        scoreSet.add(u.score || 0)
    })

    const size = scoreSet.size
    if (size === num) {
        const scores = toArray(scoreSet.values())
        return scores[0]
    } else {
        const scores = toArray(scoreSet.values())
        scores.sort((a, b) => a - b)
        return `${scores[0]}(${scores[1]})`
    }
}
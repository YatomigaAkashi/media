import matrix from '../ya_util/matrix'

function k_l(data, rate) {
    let c = matrix.cov(data)
    let eig = matrix.eig(c)
    let total = eig.reduce((a, b) => a + b.value, 0)
    eig = eig.sort((a, b) => b.value - a.value)
    let ans = []
    eig.reduce((sum, _) => {
        if ((sum / total) < rate) {
            ans.push(_.vector)
            sum += _.value
            return sum
        }
        return total
    }, 0)
    return {
        table: ans,
        k_l: matrix.multi(data, matrix.trans(ans))
    }
}

export default { k_l }

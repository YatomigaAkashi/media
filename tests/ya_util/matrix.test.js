import matrix from '../../ya_util/matrix'

describe('test matrix functions', () => {
    
    it('swap matrix symmetry item', () => {
        let test = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        let ans = [[1, 2, 3], [4, 5, 8], [7, 6, 9]]
        matrix.swap(test, 1, 2)
        expect(test.toString()).toBe(ans.toString())
    })
    
    it('trans matrix', () => {
        let test = [[1, 2, 3], [4, 5, 6]]
        let ans = [[1, 4], [2, 5], [3, 6]]
        expect(matrix.trans(test).toString()).toBe(ans.toString())
    })
    
    it('mean matrix to array', () => {
        let test = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        let ans = [4, 5, 6]
        expect(matrix.mean(test).toString()).toBe(ans.toString())
        expect(test.toString()).toBe([[1, 2, 3], [4, 5, 6], [7, 8, 9]].toString())
    })
    
    it('matrix sub array', () => {
        let test = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        let arr = [4, 5, 6]
        let ans = [[-3, -3, -3], [0, 0, 0], [3, 3, 3]]
        expect(matrix.sub(test, arr).toString()).toBe(ans.toString())
    })
    
    it('matrix sub matrix', () => {
        let test = [[1, 2, 3], [4, 5, 6]]
        let sub = [[2, 3, 1], [6, 4, 5]]
        let ans = [[-1, -1, 2], [-2, 1, 1]]
        expect(matrix.sub(test, sub).toString()).toBe(ans.toString())
    })
    
    it('matrix size', () => {
        let test = [[1, 2, 3], [4, 5, 6]]
        expect(matrix.size(test, 1)).toBe(2)
        expect(matrix.size(test, 2)).toBe(3)
    })
    
    it('matrix mul', () => {
        let test = [[1, 2], [3, 4], [5, 6]]
        let test2 = [[2, 4, 6], [8, 10, 12]]
        let ans = [[18, 24, 30], [38, 52, 66], [58, 80, 102]]
        expect(matrix.multi(test, test2).toString()).toBe(ans.toString())
    })
    
    it('matrix div', () => {
        let test = [[4, 2], [6, 4]]
        let ans = [[2, 1], [3, 2]]
        expect(matrix.div(test, 2).toString()).toBe(ans.toString())
    })
    
    it('create matrix zeros', () => {
        let ans = [[0, 0], [0, 0]]
        expect(matrix.zeros(2, 2).toString()).toBe(ans.toString())
    })
    
    it('cov', () => {
        let test = [[1, 2], [3, 4], [5, 6]]
        let ans = [[4, 4], [4, 4]]
        expect(matrix.cov(test).toString()).toBe(ans.toString())
    })
    
    it('eig', () => {
        let test = [[1, 1], [2, 3]]
        console.log(matrix.eig(test))
    })
})

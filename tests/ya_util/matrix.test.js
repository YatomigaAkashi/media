import matrix from '../../ya_util/matrix'

describe('test matrix functions', () => {
    
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
    
    it('matrix add', function () {
        let test = [[0, 2, 3], [4, 5, 6]]
        let add = [[2, 3, 1], [6, 4, 5]]
        let ans = [[2, 5, 4], [10, 9, 11]]
        expect(matrix.add(test, add).toString()).toBe(ans.toString())
    })
    
    it('matrix add continue', function () {
        let a1 = [[10, 2, 3], [4, 5, 6]]
        let a2 = [[2, 3, 1], [6, 4, 3]]
        let a3 = [[2, 5, 4], [10, 9, 11]]
        let ans = [[14, 10, 8], [20, 18, 20]]
        expect(matrix.add_con(a1, a2, a3).toString()).toBe(ans.toString())
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
    
    it('matrix mul matrix', () => {
        let test = [[1, 2], [3, 4], [5, 6]]
        let test2 = [[2, 4, 6], [8, 10, 12]]
        let ans = [[18, 24, 30], [38, 52, 66], [58, 80, 102]]
        expect(matrix.multi(test, test2).toString()).toBe(ans.toString())
    })
    
    it('matrix mul number', () => {
        let test = [[1, 2, 3], [4, 5, 6]]
        let ans = [[2, 4, 6], [8, 10, 12]]
        expect(matrix.multi(test, 2).toString()).toBe(ans.toString())
    })
    
    it('vector mul number', () => {
        let test = [1, 2, 3, 4]
        let ans = [2, 4, 6, 8]
        expect(matrix.multi(test, 2).toString()).toBe(ans.toString())
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
        let res = matrix.eig(test)
    })
    
    it('eu', () => {
        let a = [[5, 8], [7, 3]]
        let b = [[3, 4], [4, 9]]
        let ans = [[4.4721, 1.4142], [4.1231, 6.7082]]
        let res = matrix.eu(a, b)
        res = matrix.map(res, _ => _.toFixed(4))
        expect(res.toString()).toBe(ans.toString())
    })
    
    it('quick eu', () => {
        let a = [[5, 8], [7, 3], [4, 6], [14, 15]]
        let b = [[3, 4], [4, 9], [2, 3]]
        let ans = [[4.4721, 1.4142, 5.8310], [4.1231, 6.7082, 5.0000],
        [2.2361, 3.0000, 3.6056], [15.5563, 11.6619, 16.9706]]
        let res = matrix.eu_quick(a, b)
        res = matrix.map(res, _ => _.toFixed(4))
        // expect(res.toString()).toBe(ans.toString())
    })
    
    it('min 1', function () {
        let test = [[17, 24, 60], [72, 52, 44]]
        let res = matrix.min(test, 1)
        expect(res[0].val).toBe(17)
        expect(res[0].i).toBe(0)
        expect(res[1].val).toBe(24)
        expect(res[1].i).toBe(0)
        expect(res[2].val).toBe(44)
        expect(res[2].i).toBe(1)
    })
    
    it('min 2', function () {
        let test = [[18, 24, 30], [72, 52, 66], [58, 80, 102]]
        let res = matrix.min(test, 2)
        expect(res[0].val).toBe(18)
        expect(res[0].i).toBe(0)
        expect(res[1].val).toBe(52)
        expect(res[1].i).toBe(1)
        expect(res[2].val).toBe(58)
        expect(res[2].i).toBe(0)
    })
})

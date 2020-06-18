import vector from '../../ya_util/vector'

describe('vector', () => {
    it('vector sub', function () {
        let a = [1, 2]
        let b = [2, 3]
        let ans = [-1, -1]
        expect(vector.sub(a, b).toString()).toBe(ans.toString())
    })
    
    it('vector norm', function () {
        let a = [5, 7]
        let b = [2, 3]
        let ans = 5
        expect(vector.norm(a, b)).toBe(ans)
    })
    
    it('vector min', () => {
        let test = [4, 3, 5, 1, 9]
        let res = vector.min(test)
        expect(res.val).toBe(1)
        expect(res.i).toBe(3)
    })
})

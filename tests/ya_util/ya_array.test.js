import ya_array from '../../ya_util/ya_array'

describe('test array functions', () => {
    
    it('average [1 2 3] should be 2', function () {
        expect(ya_array.average([1,2,3])).toBe(2)
    })
    
    it('数组维度计算', () => {
        expect(ya_array.multi([1,2,3])).toBe(1)
        expect(ya_array.multi([[1,2,3]])).toBe(2)
    })
})

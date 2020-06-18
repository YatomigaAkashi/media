import vq from '../../dataCompression/vq'

describe('VQ', () => {
    it('vq', function () {
        let test = [[1, 4], [2, 5], [3, 6]]
        let res = vq.vq(test)
        console.log(res)
    })
})

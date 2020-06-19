import Kd_tree from "../../src/nearPoint/kd_tree"
import RandTest from "./randTest"
import ya_file from "../../src/ya_util/ya_file"
import path from 'path'

describe('Kd_tree', () => {
    
    it('split by medium', function () {
        let test = [[1, 2], [3, 1], [4, 6], [2, 7], [9, 4]]
        let ans1 = [ [ 3, 1 ], [ [ 1, 2 ], [ 2, 7 ] ], [ [ 4, 6 ], [ 9, 4 ] ] ]
        let ans2 = [ [ 9, 4 ], [ [ 3, 1 ], [ 1, 2 ] ], [ [ 4, 6 ], [ 2, 7 ] ] ]
        let res1 = Kd_tree.splitMedium(test, 0)
        let res2 = Kd_tree.splitMedium(test, 1)
        expect(res1.toString()).toBe(ans1.toString())
        expect(res2.toString()).toBe(ans2.toString())
    })
    
    it('create tree', function () {
        let test = [[1, 2], [3, 1], [4, 6], [2, 7], [9, 4]]
        let res = Kd_tree.kd(test)
        console.log(res)
    })
    
    it('find near path', function () {
        let test = [[1, 2], [3, 1], [4, 6], [2, 7], [9, 4]]
        let kd = Kd_tree.kd(test)
        let near = Kd_tree.findNearPath(kd, [1, 1])
        console.log(near)
    })
    
    it('find near node', function () {
        let test = [[1, 2], [3, 1], [4, 6], [2, 7], [9, 4]]
        let kd = Kd_tree.kd(test)
        let near = kd.findNearNode([1, 1], false)
        console.log(near)
    })
    
    it('find near node quick', function () {
        let test = [[1, 2], [3, 1], [4, 6], [2, 7], [9, 4]]
        let kd = Kd_tree.kd(test)
        let near = kd.findNearNode([1, 1])
        console.log(near)
    })
    
    it('find near node rand test data', () => {
        // let test = [
        //     [4.88,1.19],   [6.03,8.07],
        //     [3.54,11.83],  [12.53,15.62],
        //     [5.86,10.84],  [14.68,8.17],
        //     [18.51,8.57],  [12.80,11.24],
        //     [19.34,10.0], [12.60,15.97]
        // ]
        let test = RandTest.randList(1000, 20)
        let kd = Kd_tree.kd(test)
        let near1 = kd.findNearNode([11, 7], false)
        let near2 = kd.findNearNode([11, 7], true)
        console.log(near1)
        console.log(near2)
    })
    
    it('test BJ/real.txt', async () => {
        let test = await ya_file.read_kd(path.join(__dirname, './BJ/real.txt'))
        console.time('BJ build time')
        let kd = Kd_tree.kd(test)
        console.timeEnd('BJ build time')
        console.time('BJ inquiry time')
        let near = kd.findNearNode(test[50])
        console.log(near)
        console.timeEnd('BJ inquiry time')
    })
    
    it('test CA/real.txt', async function () {
        let test = await ya_file.read_kd(path.join(__dirname, './CA/real.txt'))
        console.time('CA build time')
        let kd = Kd_tree.kd(test)
        console.timeEnd('CA build time')
        console.time('CA inquiry time')
        let near = kd.findNearNode(test[100])
        console.log(near)
        console.timeEnd('CA inquiry time')
    })
})

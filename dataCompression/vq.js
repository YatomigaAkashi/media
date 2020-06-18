import Matrix from '../ya_util/matrix'
import Ya_array from "../ya_util/ya_array"
import Vector from "../ya_util/vector"

class Vq {
    static vq(data, num) {
        let inf = Infinity // 无穷大
        let theta = 0.001
        let code = Matrix.mean(data)  // 初始化码矢
        for (let i = 0; i < Math.sqrt(num); i++) {
            let code1 = Matrix.multi(code, (1 - theta))
            let code2 = Matrix.multi(code, (1 + theta))
            code = typeof code1[0] === "number"? [code1, code2]: [...code1, ...code2]
            while (true) {
                let dis = Matrix.eu(data, code)
                let min = Matrix.min(dis, 2)
                let all_distort = 0
                for (let j = 0; j < dis[0].length; j++) {
                    let e_distort = 0
                    let i_min = []
                    min.forEach((_, index) => _.i === j? i_min.push(index): '')
                    if (i_min.length !== 0) {
                        let x = data.filter((_, index) => i_min.find(_ => _ === index))
                        code[j] = Matrix.mean(x)
                        e_distort = Ya_array.sum(Matrix.eu(x, code[j]))
                    }
                    all_distort += e_distort
                }
                if (((inf - all_distort) / all_distort) < theta) {
                    break
                } else {
                    inf = all_distort
                }
            }
        }
        let dis = Matrix.eu(data, code)
        let res = Matrix.min(dis, 2)
        return {dis, res}
    }
}

export default Vq

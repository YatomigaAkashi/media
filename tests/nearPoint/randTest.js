class RandTest {
    static randList(n, v) {
        let zeros = (new Array(n)).fill(0)
        return zeros.map(_ => RandTest.randPoint(v))
    }
    
    static randPoint(v) {
        let a = (v * Math.random()).toFixed(4)
        let b = (v * Math.random()).toFixed(4)
        return [a, b]
    }
}

export default RandTest

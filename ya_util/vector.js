class Vector {
    // 生成指定值向量
    static fill(len, x) {
        return (new Array(len)).fill(x)
    }
    
    // 返回向量最小值和索引
    static min(v) {
        let val = Math.min(...v)
        let i = v.findIndex(_ => _ === val)
        return { val, i }
    }
    
    // 向量减法
    static sub(a, b) {
        return a.map((_, i) => _ - b[i])
    }
    
    // 向量欧氏距离
    static norm(a, b) {
        return Math.sqrt(Vector.sub(a, b).reduce((sum, _) => sum + _ ** 2, 0))
    }
}

export default Vector

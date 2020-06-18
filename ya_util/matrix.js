import clone from 'clone'
import matrix_eig from 'matrix-eig'
import ya_array from './ya_array'
import vector from './vector'

class Matrix {
    // 充满0的矩阵
    static zeros(x, y) {
        return (new Array(x)).fill((new Array(y)).fill(0))
    }
    
    // 矩阵遍历
    static map(matrix, callback) {
        return matrix.map((_, i) => _.map((_, j) => callback(_, i, j)))
    }
    
    // 获取矩阵长度
    static size(matrix, p = 1) {
        return p === 1? matrix.length: Matrix.size(matrix[0], p - 1)
    }
    
    // 返回维度 matrix 上的最小元素
    static min(matrix, i) {
        if (i === 2) return matrix.map(_ => vector.min(_))
        else if (i === 1) return Matrix.trans(matrix).map(_ => vector.min(_))
    }
    
    // 矩阵均值
    static mean(matrix) {
        return Matrix.trans(matrix).map(val => ya_array.average(val))
    }
    
    // 协方差
    static cov(matrix) {
        let mean_val = Matrix.mean(matrix)
        let mean_x = Matrix.sub(matrix, mean_val)
        let fix_n = Matrix.size(matrix, 1) - 1
        let mul = Matrix.multi(Matrix.trans(mean_x), mean_x)
        return Matrix.div(mul, fix_n)
    }
    
    // 计算特征值和特征向量
    static eig(matrix) {
        let ans = clone(matrix_eig.eig(matrix))
        let values = Object.values(ans.eigenvalues.real)
        let vectors = Object.values(ans.eigenvectors.right)
        return values.map(value => {
            return {
                value,
                vector: vectors.splice(0, values.length)
            }
        })
    }
    
    // 转置矩阵
    static trans(matrix) {
        let zeros = Matrix.zeros(Matrix.size(matrix, 2), Matrix.size(matrix, 1))
        return Matrix.map(zeros, (_, i, j) => matrix[j][i])
    }
    
    // 矩阵减法
    static sub(matrix, arr) {
        return ya_array.multi(arr) === 1? Matrix.map(matrix, (_, i, j) => _ - arr[j]): Matrix.map(matrix, (_, i, j) => _ - arr[i][j])
    }
    
    // 矩阵乘法
    static multi(a, b) {
        if (typeof b === "number") {
            if (typeof a[0] === "number") return a.map(_ => _ * b)
            return Matrix.map(a, _ => _ * b)
        }
        let zeros = Matrix.zeros(Matrix.size(a, 1), Matrix.size(b, 2))
        return Matrix.map(zeros, (_, i, j) => a[i].reduce((sum, cell, k) => sum + cell * b[k][j], 0))
    }
    
    // 矩阵除法
    static div(matrix, n) {
        return Matrix.map(matrix, _ => _ / n)
    }
    
    // 矩阵欧氏距离
    static eu(a, b) {
        if (typeof b[0] === "number") {
            let zeros = (new Array(Matrix.size(a, 1))).fill(0)
            return zeros.map((_, i) => vector.norm(a[i], b))
        }
        let zeros = Matrix.zeros(Matrix.size(a, 1), Matrix.size(b, 1))
        return Matrix.map(zeros, (_, i, j) => vector.norm(a[i], b[j]))
    }
}

export default Matrix

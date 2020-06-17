import clone from 'clone'
import matrix_eig from 'matrix-eig'
import ya_array from './ya_array'

class Matrix {
    // 充满0的矩阵
    static zeros(x, y) {
        return (new Array(x)).fill((new Array(y)).fill(0))
    }
    
    // 获取矩阵长度
    static size(matrix, p = 1) {
        if (p === 1) {
            return matrix.length
        }
        return Matrix.size(matrix[0], p - 1)
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
    
    // 交换矩阵对称的两个元素
    static swap(matrix, x, y) {
        let n = matrix[x][y]
        matrix[x][y] = matrix[y][x]
        matrix[y][x] = n
    }
    
    // 转置矩阵
    static trans(matrix) {
        let zeros = Matrix.zeros(Matrix.size(matrix, 2), Matrix.size(matrix, 1))
        return zeros.map((_, i) => _.map((_, j) => matrix[j][i]))
    }
    
    // 矩阵减法
    static sub(matrix, arr) {
        let multi = ya_array.multi(arr)
        if (multi === 1) {
            return matrix.map(x => x.map((val, index) => val - arr[index]))
        } else if (multi === 2) {
            return matrix.map((x, i) => x.map((y, j) => y - arr[i][j]))
        }
        throw new Error(`${arr} multi is not available`)
    }
    
    // 矩阵乘法
    static multi(a, b) {
        let zeros = Matrix.zeros(Matrix.size(a, 1), Matrix.size(b, 2))
        return zeros.map((_, i) => _.map((_, k) => a[i].reduce((sum, cell, j) => sum + cell * b[j][k], 0)))
    }
    
    // 矩阵除法
    static div(matrix, n) {
        return matrix.map(row => row.map(val => val / n))
    }
}

export default Matrix

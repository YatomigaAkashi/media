class Ya_array {
    // 计算数组平均数
    static average(arr) {
        return Ya_array.sum(arr) / arr.length
    }
    
    // 计算数组尺寸
    static multi(arr){
        let a = 1
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] instanceof Array) {
                a++
                arr = arr[i]
                Ya_array.multi(arr)
            }
        }
        return a;
    }
    
    // 计算数组和
    static sum(arr) {
        return arr.reduce((a, b) => a + b, 0)
    }
}

export default Ya_array

class Ya_array {
    static average(arr) {
        return arr.reduce((pre, val) => pre + val, 0) / arr.length
    }
    
    static multi(arr){
        let a = 1
        for (let i=0; i < arr.length; i++) {
            if (arr[i] instanceof Array) {
                a++
                arr = arr[i]
                Ya_array.multi(arr)
            }
        }
        return a;
    }
    
    static sum(arr, callback) {
        return arr.reduce((a, b) => a + b, 0)
    }
}

export default Ya_array

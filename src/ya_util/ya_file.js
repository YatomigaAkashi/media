import fs from 'fs'

class Ya_file {
    static read_file(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    
    static async read_music(path, str = ' ') {
        let data = await Ya_file.read_file(path)
        return data.split('\n').filter(val => val.trim().length !== 0).map(val => {
            let list = val.split(str)
            list.shift()
            return list.map(val => val * 1)
        })
    }
    
    static async read_kd(path, str = ' ') {
        let data = await Ya_file.read_file(path)
        return data.split('\n').filter(val => val.trim().length !== 0).map(val => {
            let list = val.split(str)
            return [list[6] * 1, list[7] * 1]
        })
    }
}

export default Ya_file

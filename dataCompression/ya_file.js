import fs from 'fs'

function read_file(path) {
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

async function read_music(path, str) {
    let data = await read_file(path)
    return data.split('\n').filter(val => val.trim().length !== 0).map(val => {
        let list = val.split(' ')
        list.shift()
        return list.map(val => val * 1)
    })
}

export default { read_music }

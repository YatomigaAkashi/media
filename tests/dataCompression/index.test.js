import ch from '../../src/dataCompression/index'
import ya_file from "../../src/ya_util/ya_file"
import path from "path"

describe('test work 2', () => {
    
    it('k-l', async () => {
        let color = await ya_file.read_music(path.join(__dirname, 'ColorHistogram.asc'), ' ')
        let res = ch.k_l(color, 0.95)
        console.log(res)
    })
    
    it('vq', async () => {
        let color = await ya_file.read_music(path.join(__dirname, 'ColorHistogram.asc'), ' ')
        let res = ch.vq(color, 32)
        console.log(res)
    })
})

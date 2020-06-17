import ch from '../../dataCompression/index'
import ya_file from "../../dataCompression/ya_file"
import path from "path"

describe('test work 2', () => {
    it('should ', async () => {
        let color = await ya_file.read_music(path.join(__dirname, 'ColorHistogram.asc'), ' ')
        let res = ch.k_l(color, 0.95)
        console.log(res)
    })
})

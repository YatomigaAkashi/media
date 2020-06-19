import Point from "./point"
import Vector from "../ya_util/vector"
import clone from 'clone'

class Node {
    constructor(node, distance) {
        this.node = node
        this.distance = distance
    }
    
    update(node, distance) {
        this.node = node
        this.distance = distance
    }
}

class Kd_tree {
    // 初始化
    set(parent, val, depth, dim, left, right) {
        this.val = val
        this.depth = depth
        this.dim = dim
        this.left = left
        this.right = right
        this.parent = parent
    }
    
    // 寻找临近点
    findNearNode(node, quick = true) {
        let begin = Kd_tree.findNearPath(this, node)
        let dis = Vector.norm(begin.val, node)
        let near = new Node(begin.val, dis)
        let visited = []
        if (quick) {
            Kd_tree.updateNearNodeQuick(begin, node, near, visited)
        } else {
            Kd_tree.updateNearNode(begin, node, near, visited)
        }
        return [near, visited]
    }
    
    // 寻找最近路径
    static findNearPath(kd, node) {
        let dim = kd.dim
        if (kd.val[dim] >= node[dim]) {
            return !kd.left? kd: Kd_tree.findNearPath(kd.left, node)
        } else {
            return !kd.right? kd: Kd_tree.findNearPath(kd.right, node)
        }
    }
    
    // 更新最近节点原始算法
    static updateNearNode(kd, node, ans, visited) {
        if (!visited.find(_ => _ === kd.val)) {
            let dis = Vector.norm(node, kd.val)
            if (kd.left) {
                Kd_tree.updateNearNode(kd.left, node, ans, visited)
            }
            if (kd.right) {
                Kd_tree.updateNearNode(kd.right, node, ans, visited)
            }
            if (!visited.find(_ => _ === kd.val.toString())) {
                visited.push(kd.val)
            }
            if (dis < ans.distance) {
                ans.update(kd.val, dis)
            }
            if (kd.parent) {
                Kd_tree.updateNearNode(kd.parent, node, ans, visited)
            }
        }
    }
    
    // 快速寻找最近节点算法，对左右子树进行剪枝剪枝
    static updateNearNodeQuick(kd, node, ans, visited) {
        if (!visited.find(_ => _ === kd.val)) {
            let dis = Vector.norm(node, kd.val)
            if (kd.left) {
                let left = node[kd.dim] - ans.distance
                if (left <= kd.val[kd.dim]) {
                    Kd_tree.updateNearNodeQuick(kd.left, node, ans, visited)
                }
            }
            if (kd.right) {
                let right = node[kd.dim] + ans.distance
                if (right >= kd.val[kd.dim]) {
                    Kd_tree.updateNearNodeQuick(kd.right, node, ans, visited)
                }
            }
            if (!visited.find(_ => _ === kd.val.toString())) {
                visited.push(kd.val)
            }
            if (dis < ans.distance) {
                ans.update(kd.val, dis)
            }
            if (kd.parent) {
                Kd_tree.updateNearNodeQuick(kd.parent, node, ans, visited)
            }
        }
    }
    
    // 构造树
    static kd(data, depth = 0, parent = null) {
        if (data.length === 0) {
            return null
        } else if (data.length === 1) {
            return new Point(data[0], depth, parent)
        } else {
            let dim = depth % data[0].length
            let [medium, left, right] = Kd_tree.splitMedium(data, dim)
            let kd = new Kd_tree()
            kd.set(parent, medium, depth, dim, Kd_tree.kd(left, depth + 1, kd), Kd_tree.kd(right, depth + 1, kd))
            return kd
        }
    }
    
    // 按中位值切分
    static splitMedium(matrix, dim) {
        matrix.sort((a, b) => a[dim] - b[dim])
        let half = Math.floor(matrix.length / 2)
        return [matrix[half], matrix.slice(0, half), matrix.slice(half + 1, matrix.length)]
    }
}


export default Kd_tree

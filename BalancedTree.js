class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(this.removeDuplicates(this.sort(arr)));
  }

  buildTree(arr) {
    if (arr.length === 0) return null;
    const mid = Math.floor(arr.length / 2);
    const root = new Node(arr[mid]);
    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));
    return root;
  }

  delete(value) {
    this.root = this.deleteHelper(this.root, value);
  }

  deleteHelper(root, value) {
    if (root === null) {
      return null;
    }
    if (value < root.data) {
      root.left = this.deleteHelper(right.left, value);
    } else if (value > root.data) {
      root.right = this.deleteHelper(root.right, value);
    } else {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) {
        return root.right;
      }
      if (!root.right) {
        return root.left;
      }
      let curr = root.right;
      while (curr.left) {
        curr = curr.left;
      }
      root.data = curr.data;
      root.right = this.deleteHelper(root.right, curr.data);
    }
    return root;
  }

  depth(value) {
    const traverse = (root, depth = 0) => {
      if (root === null) {
        return -1;
      }
      if (root.data === value) {
        return depth;
      }
      let left = traverse(root.left, depth + 1);
      let right = traverse(root.right, depth + 1);
      return left > right ? left : right;
    };
    return traverse(this.root);
  }

  find(value) {
    return this.findHelper(this.root, value);
  }

  findHelper(root, value) {
    if (root === null) {
      return null;
    }
    if (root.data === value) {
      return root;
    }
    if (value < root.data) {
      return this.findHelper(root.left, value);
    } else {
      return this.findHelper(root.right, value);
    }
  }

  height() {
    const traverse = (root) => {
      if (root === null) {
        return 0;
      }
      let left = traverse(root.left);
      let right = traverse(root.right);
      return left > right ? left + 1 : right + 1;
    };
    return traverse(this.root);
  }

  inOrder(callback = null) {
    const arr = [];
    const traverse = (root, callback = null) => {
      if (root === null) return null;
      if (root.left) traverse(root.left);
      arr.push(root.data);
      if (callback) {
        callback(root.data);
      }
      if (root.right) traverse(root.right);
    };
    traverse(this.root);
    return arr;
  }

  insert(value) {
    this.root = this.insertRecursive(this.root, value);
  }

  insertRecursive(root, value) {
    if (root === null) {
      return new Node(value);
    }
    if (root.data > value) {
      root.left = this.insertRecursive(root.left, value);
    } else {
      root.right = this.insertRecursive(root.right, value);
    }
    return root;
  }

  isBalanced() {
    const getHeight = (root) => {
      if (root === null) {
        return 0;
      }
      let left = getHeight(root.left);
      let right = getHeight(root.right);
      return left > right ? left + 1 : right + 1;
    };

    const balanced = (root) => {
      if (root === null) return true;
      let left = getHeight(root.left);
      let right = getHeight(root.right);

      let diff = Math.abs(left - right);
      if (diff > 1) return false;
      return balanced(root.left) && balanced(root.right);
    };
    return balanced(this.root);
  }

  levelOrder(callback = null) {
    return this.levelOrderHelper(this.root);
  }

  levelOrderHelper(root, callback = null) {
    if (root === null) {
      return [];
    }
    const queue = [];
    const levelOrderArr = [];
    queue.push(root);
    while (queue.length) {
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        let node = queue.shift();
        levelOrderArr.push(node.data);
        if (callback) {
          callback(node.data);
        }
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }
    }
    return levelOrderArr;
  }

  postOrder(callback = null) {
    const arr = [];
    const traverse = (root, callback = null) => {
      if (root.left) traverse(root.left);
      if (root.right) traverse(root.right);
      if (root === null) return null;
      arr.push(root.data);
      if (callback) {
        callback(root.data);
      }
    };
    traverse(this.root);
    return arr;
  }

  preOrder(callback = null) {
    const arr = [];
    const traverse = (root, callback = null) => {
      if (root === null) return null;
      arr.push(root.data);
      if (callback) {
        callback(root.data);
      }
      if (root.left) traverse(root.left);
      if (root.right) traverse(root.right);
    };
    traverse(this.root);
    return arr;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  sort(arr) {
    return arr.sort((a, b) => a - b);
  }

  rebalance() {
    let arrInOrder = this.inOrder();
    this.root = this.buildTree(arrInOrder);
  }

  removeDuplicates(arr) {
    const noDuplicates = [...new Set(arr)];
    return noDuplicates;
  }
}

// 1
const randomArray = () => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
};
const arr = randomArray();
const tree = new Tree(arr);

// 2
console.log(tree.isBalanced());

// 3
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

// 4
tree.insert(100);
tree.insert(101);
tree.insert(102);
tree.insert(103);

// 5
console.log(tree.isBalanced());

// 6
tree.rebalance();

// 7
console.log(tree.isBalanced());

// 8
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

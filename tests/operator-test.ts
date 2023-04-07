
import { expect } from 'chai';
import 'mocha';
import { TreeNode, Expression, TreeNodeType, LogicalOperatorType } from '../src/expression-tree-nodes/TreeNode';
import { transpiler } from '../src/transpiler';

describe('Operator Test', 
  () => { 
    it('should return true', () => { 

      const code = `
      'operator-overloading enabled';
      let treeNode1 = new TreeNode(TreeNodeType.ExpressionNode, Expression.Operation_Equals, null, [1, 2]);
      let treeNode2 = new TreeNode(TreeNodeType.ExpressionNode, Expression.Operation_Equals, null, [1, 2]);

      let newTreeNode = treeNode1 + treeNode2;
      `; 
      

      const transpiled_result = transpiler(code);

      console.log(transpiled_result);
      expect(true).to.equal(true);
  }); 
});
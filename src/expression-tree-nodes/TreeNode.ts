// The basic abstact syntax tree node of the expression tree
// representing the condition of a restriction plugin condition

import { Expression } from "../expression-tree-nodes/expression";

enum TreeNodeType { ExpressionNode, LogicalOperatorNode, BooleanValueNode}
enum LogicalOperatorType {AND, OR, NOT}

class TreeNode {
    type: TreeNodeType;
    expression: Expression | null;
    logicalOperator: LogicalOperatorType | null;
    expressionParameters: (number|string|bigint)[] | null;
    booleanValue: boolean | null;
    leftChild: TreeNode | null;
    rightChild: TreeNode | null;
    constructor(type: TreeNodeType, 
        expression: Expression | null, 
        logicalOperator: LogicalOperatorType | null, 
        expressionParameters:  (number|string|bigint)[] | null,
        booleanValue: boolean | null = null,
        leftChild: TreeNode | null = null,
        rightChild: TreeNode | null = null) {
        this.type = type;
        this.expression = expression;
        this.logicalOperator = logicalOperator;
        this.expressionParameters = expressionParameters;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
        this.booleanValue = booleanValue;

        // validate the node
        this.isValidLogicalOperatorNode();
        this.isValidExpressionNode();
    }

    serializeToString(): string {
        const leftChileString = this.leftChild ? this.leftChild.serializeToString() : null;
        const rightChildString = this.rightChild ? this.rightChild.serializeToString() : null;
        let returnString = "";
        if (this.type === TreeNodeType.ExpressionNode) {
            returnString+= `Expression: ${this.expression}(${this.expressionParameters})`;
        }
        else if (this.type === TreeNodeType.LogicalOperatorNode) {
            returnString+= `LogicalOperator: ${this.logicalOperator}`;
        }
        else if (this.type === TreeNodeType.BooleanValueNode) {
            returnString+= `BooleanValue: ${this.booleanValue}`;
        }
        if (leftChileString) {
            returnString+= ` LeftChild: ${leftChileString}`;
        }
        if (rightChildString) {
            returnString+= ` RightChild: ${rightChildString}`;
        }
        return returnString;
    }

    // if an operator "&&" is used, the expression will return a 
    // logical operator node with current node as left child, and 
    // the right operand as right child, and the operator type is "&&"
    [Symbol.for('&&')] (rightOperand: TreeNode): TreeNode {
        let logicalOperatorNode = new TreeNode(TreeNodeType.LogicalOperatorNode, null, LogicalOperatorType.AND, null);
        logicalOperatorNode.leftChild = this;
        logicalOperatorNode.rightChild = rightOperand;
        return logicalOperatorNode;
    }

    // if an operator "||" is used, the expression will return a
    // logical operator node with current node as left child, and
    // the right operand as right child, and the operator type is "||"
    [Symbol.for('||')] (rightOperand: TreeNode): TreeNode {
        let logicalOperatorNode = new TreeNode(TreeNodeType.LogicalOperatorNode, null, LogicalOperatorType.OR, null);
        logicalOperatorNode.leftChild = this;
        logicalOperatorNode.rightChild = rightOperand;
        return logicalOperatorNode;
    }

    // if an operator "!" is used, the expression will return a
    // logical operator node with current node as left child, and
    // a null object as right child, and the operator type is "!"
    [Symbol.for('!')] (): TreeNode {
        let logicalOperatorNode = new TreeNode(TreeNodeType.LogicalOperatorNode, null, LogicalOperatorType.NOT, null);
        logicalOperatorNode.leftChild = this;
        return logicalOperatorNode;
    }

    // check if the current node is a valid logical operator node,
    // and throw an exception if it is not
    isValidLogicalOperatorNode(){
        if (this.type === TreeNodeType.LogicalOperatorNode){
            // check if the logical operator type is null
            if (this.logicalOperator === null){
                throw new Error("The logical operator type of the current node is null. \n\
                Current node:\n " + JSON.stringify(this));
            }
            // if operator is AND, OR, make sure that the left and right child are not null
            if (this.logicalOperator === LogicalOperatorType.AND || this.logicalOperator === LogicalOperatorType.OR){
                if (this.leftChild === null || this.rightChild === null){
                    throw new Error("The left or right child of the current node is null for an AND or OR operator.\n\
                    Current node:\n " + JSON.stringify(this));
                }
            }
            // if operator is NOT, make sure that the left child is not null and the right child is null
            if (this.logicalOperator === LogicalOperatorType.NOT){
                if (this.leftChild === null || this.rightChild !== null){
                    throw new Error("The left child of the current node is null or the right child is not null.\n\
                    Current node:\n " + JSON.stringify(this));
                }
            }
        }
    }

    // check if the current node is a valid expression node,
    // and throw an exception if it is not
    isValidExpressionNode(){
        if (this.type === TreeNodeType.ExpressionNode){
            // check if the expression type is null
            if (this.expression === null){
                throw new Error("The expression type of the current expression node is null. \n\
                Current node:\n " + JSON.stringify(this));
            }
            // make sure that the left and right child are null
            if (this.leftChild !== null || this.rightChild !== null){
                throw new Error("The left or right child of the current node is not null for an expression node.\n\
                Current node:\n " + JSON.stringify(this));
            }
        }
    }

    // check if the current node is a valid boolean value node,
    // and throw an exception if it is not
    isValidBooleanValueNode(){
        if (this.type === TreeNodeType.BooleanValueNode){
            // check if the boolean value is null
            if (this.booleanValue === null){
                throw new Error("The boolean value of the current boolean value node is null. \n\
                Current node:\n " + JSON.stringify(this));
            }
            // make sure that the left and right child are null
            if (this.leftChild !== null || this.rightChild !== null){
                throw new Error("The left or right child of the current node is not null for a boolean value node.\n\
                Current node:\n " + JSON.stringify(this));
            }
            // make sure that the expression type is null
            if (this.expression !== null){
                throw new Error("The expression type of the current boolean value node is not null. \n\
                Current node:\n " + JSON.stringify(this));
            }
            // make sure that the logical operator type is null
            if (this.logicalOperator !== null){
                throw new Error("The logical operator type of the current boolean value node is not null. \n\
                Current node:\n " + JSON.stringify(this));
            }
            // make sure that the expression parameters is null
            if (this.expressionParameters !== null){
                throw new Error("The expression parameters of the current boolean value node is not null. \n\
                Current node:\n " + JSON.stringify(this));
            }
        }
    }
}


export { TreeNode, Expression, TreeNodeType, LogicalOperatorType };
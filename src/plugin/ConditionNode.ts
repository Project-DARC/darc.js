// The basic abstact syntax tree node of the expression tree
// representing the condition of a restriction plugin condition

import { Expression } from "./Expression";

enum ConditionNodeType { ExpressionNode, LogicalOperatorNode, BooleanValueNode}
enum LogicalOperatorType {AND, OR, NOT}

class ConditionNode {
    type: ConditionNodeType;
    expression: Expression | null;
    logicalOperator: LogicalOperatorType | null;
    expressionParameters: (number|string|bigint)[] | null;
    booleanValue: boolean | null;
    childList: ConditionNode[] = [];
    constructor(type: ConditionNodeType, 
        expression: Expression | null, 
        logicalOperator: LogicalOperatorType | null, 
        expressionParameters:  (number|string|bigint)[] | null,
        booleanValue: boolean | null = null) {
        this.type = type;
        this.expression = expression;
        this.logicalOperator = logicalOperator;
        this.expressionParameters = expressionParameters;
        this.childList = [];
        this.booleanValue = booleanValue;

        // validate the node
        this.isValidLogicalOperatorNode();
        this.isValidExpressionNode();
    }

    serializeToString(): string {
        const childListString = this.childList.length == 0 ? this.childList.map((child) => child.serializeToString()).join(" ") : null;
        let returnString = "";
        if (this.type === ConditionNodeType.ExpressionNode) {
            returnString+= `Expression: ${this.expression}(${this.expressionParameters})`;
        }
        else if (this.type === ConditionNodeType.LogicalOperatorNode) {
            returnString+= `LogicalOperator: ${this.logicalOperator}`;
        }
        else if (this.type === ConditionNodeType.BooleanValueNode) {
            returnString+= `BooleanValue: ${this.booleanValue}`;
        }
        if (childListString) {
            returnString+= ` Child List: ${childListString}`;
        }
        return returnString;
    }

    // if an operator "&" is used, the expression will return a 
    // logical operator node with current node as left child, and 
    // the right operand as right child, and the operator type is "&&"
    [Symbol.for('&')] (rightOperand: ConditionNode): ConditionNode {
        if (this.type === ConditionNodeType.ExpressionNode) {
            let logicalOperatorNode = new ConditionNode(ConditionNodeType.LogicalOperatorNode, null, LogicalOperatorType.AND, null);
            logicalOperatorNode.childList.push(this);
            logicalOperatorNode.childList.push(rightOperand);
            return logicalOperatorNode;
        }
        else if (this.type === ConditionNodeType.LogicalOperatorNode) {
            if (this.logicalOperator === LogicalOperatorType.AND) {
                this.childList.push(rightOperand);
                return this;
            }
            else if (this.logicalOperator === LogicalOperatorType.OR) {
                let logicalOperatorNode = new ConditionNode(ConditionNodeType.LogicalOperatorNode, null, LogicalOperatorType.AND, null);
                logicalOperatorNode.childList.push(this);
                logicalOperatorNode.childList.push(rightOperand);
                return logicalOperatorNode;
            }
            else if (this.logicalOperator === LogicalOperatorType.NOT) {
                let logicalOperatorNode = new ConditionNode(ConditionNodeType.LogicalOperatorNode, null, LogicalOperatorType.AND, null);
                logicalOperatorNode.childList.push(this);
                logicalOperatorNode.childList.push(rightOperand);
                return logicalOperatorNode;
            }
        }
        else if (this.type === ConditionNodeType.BooleanValueNode) {
            let logicalOperatorNode = new ConditionNode(ConditionNodeType.LogicalOperatorNode, null, LogicalOperatorType.AND, null);
            logicalOperatorNode.childList.push(this);
            logicalOperatorNode.childList.push(rightOperand);
            return logicalOperatorNode;
        }
        throw new Error("Invalid condition node type");

    }

    // if an operator "|" is used, the expression will return a
    // logical operator node with current node as left child, and
    // the right operand as right child, and the operator type is "||"
    [Symbol.for('|')] (rightOperand: ConditionNode): ConditionNode {
        let logicalOperatorNode = new ConditionNode(ConditionNodeType.LogicalOperatorNode, null, LogicalOperatorType.OR, null);
        
        return logicalOperatorNode;
    }

    // if an operator "!" is used, the expression will return a
    // logical operator node with current node as left child, and
    // a null object as right child, and the operator type is "!"
    [Symbol.for('!')] (): ConditionNode {
        let logicalOperatorNode = new ConditionNode(ConditionNodeType.LogicalOperatorNode, null, LogicalOperatorType.NOT, null);
        logicalOperatorNode.leftChild = this;
        return logicalOperatorNode;
    }

    // check if the current node is a valid logical operator node,
    // and throw an exception if it is not
    isValidLogicalOperatorNode(){
        if (this.type === ConditionNodeType.LogicalOperatorNode){
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
        if (this.type === ConditionNodeType.ExpressionNode){
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
        if (this.type === ConditionNodeType.BooleanValueNode){
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


export { ConditionNode, Expression, ConditionNodeType, LogicalOperatorType };
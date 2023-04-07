import { ConditionNode } from "../expression-tree-nodes/ConditionNode";
import { VotingParameters } from "./voting-param";

class RestrictionPlugin {
  restrictionPluginDescription: string;
  conditionExpressionTreeRootNode: ConditionNode;
  restrictionPluginReturnType: RestrictionPluginReturnType;
  votingParameters: VotingParameters | null;
  restrictionPluginType: RestrictionPluginType;
  constructor(restrictionPluginDescription: string, conditionExpressionTreeRootNode: ConditionNode, restrictionPluginReturnType: RestrictionPluginReturnType, votingParameters: VotingParameters | null, restrictionPluginType: RestrictionPluginType) {
    this.restrictionPluginDescription = restrictionPluginDescription;
    this.conditionExpressionTreeRootNode = conditionExpressionTreeRootNode;
    this.restrictionPluginReturnType = restrictionPluginReturnType;
    this.votingParameters = votingParameters;
    this.restrictionPluginType = restrictionPluginType;
  }
}

enum RestrictionPluginReturnType {
  NO,
  ABSOLUTELY_YES,
  VOTING_NEEDED
}

enum RestrictionPluginType {
  BEFORE_OPERATION,
  AFTER_OPERATION
}

export { RestrictionPlugin, RestrictionPluginReturnType, RestrictionPluginType };
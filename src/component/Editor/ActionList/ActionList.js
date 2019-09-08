import React from 'react';
import { Icon } from 'antd';
import Combinator from './Combinator';
import '../../../css/Editor/ActionList.css';
import { NewAction } from "../../../function/Element/SpecialAction";


class ActionList extends React.Component {

    // 添加新空动作
    addNewAction = () => {
        const { actionList } = this.props;
        const newActionList = actionList.concat([[NewAction]]);
        this.props.changeActionList(newActionList)
    };

    // 添加与某动作相同的动作
    addSameAction = k => {
        let { actionList } = this.props;
        actionList.splice(k+1, 0, actionList[k]);
        this.props.changeActionList(actionList)
    };

    // 删除某动作
    removeAction = k => {
        let { actionList } = this.props;
        actionList.splice(k, 1);
        this.props.changeActionList(actionList)
    };

    // 处理点击动作事件
    handleActionClick = k => {
        if (this.props.combinationState) {
            const { actionList, combinationAction } = this.props;
            combinationAction.push(actionList[k]);
            this.props.changeCombinationAction(combinationAction)
        }
        else {
            const { actionList } = this.props;
            this.props.changePreview(actionList[k])
        }
    };

    // 开启组合器
    combination = k => {
        if (this.props.combinationState) {
            const { actionList, combinationAction } = this.props;
            combinationAction.push(actionList[k]);
            this.props.changeCombinationAction(combinationAction)
        }
        else {
            this.props.changeCombinationState(!this.props.combinationState);
            const { actionList, combinationAction } = this.props;
            combinationAction.push(actionList[k]);
            this.props.changeCombinationAction(combinationAction)
        }
    };

    render() {
        const { actionList } = this.props;
        const actionItems = actionList.map((actions, index) => (
            <div className="action-item" key={index}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                     onClick={() => this.handleActionClick(index, "actionList")}>
                    { actions.map((action) => (action.list())) }
                </svg>
                <div style={{ width: "13%", height: "100%", display: "inline-block",
                    textAlign: "center" }}>
                    <Icon type="block" style={{ fontSize: "120%", color: "#E7EAED" }}
                          onClick={() => this.combination(index)}/>
                    <br/>
                    <Icon type="plus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                          onClick={() => this.addSameAction(index)}/>
                    <br/>
                    <Icon type="minus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                          onClick={() => this.removeAction(index)}/>
                </div>
            </div>
            )
        );
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    style={{ width: "100%", height: "100%" }}>
                    <div
                        style={{ width: "100%", color: "#E7EAED", height: "30px", lineHeight: "30px", paddingLeft: "8px" }}>
                        ActionList</div>
                    <div style={{ width: "100%", height: "calc(100% - 30px)", overflowY: "scroll", overflowX: "hidden",}}>
                        { actionItems }
                        <div id="new-plus">
                            <svg t="1563954469672" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="9208" width="100%" height="100%"
                                 onClick={this.addNewAction}>
                                <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
                                      p-id="9209"/>
                                <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
                                      p-id="9210"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <Combinator actionList={this.props.actionList}
                            combinationState={this.props.combinationState}
                            combinationAction={this.props.combinationAction}

                            changeActionList={this.props.changeActionList}
                            changeCombinationAction={this.props.changeCombinationAction}
                            changeCombinationState={this.props.changeCombinationState}/>
            </div>
        )
    }
}

export default ActionList;
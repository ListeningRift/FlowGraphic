import React from 'react';
import { Icon } from 'antd';
import '../../css/ActionList.css';
import { NewAction } from "../../function/PromptAction";

function Combinator(props) {
    const { combinationList } = props;
    const combinationItems = combinationList.map((actions, index) => (
        <div className="combination_item">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                 key={index}>
                { actions.map((action) => (action.list())) }
            </svg>
            <div style={{ width: "13%", height: "100%", display: "inline-block",
                textAlign: "center" }}>
                <Icon type="minus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                      onClick={() => props.removeCombinationAction(index)}/>
            </div>
        </div>
    ));
    return (
        <div id="action_combination" style={{ display: props.combinationState ? null : "none" }}>
            <div id="combination_title">Action Combinator</div>
            <div id="combination_items">
                { combinationItems }
            </div>
            <div id="combination_button">
                <button onClick={props.combination}>组合</button>
                <button onClick={props.ChangeCombination}>取消</button>
            </div>
        </div>
    )
}

class ActionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openKey: "actionList"
        }
    }

    onOpenChange = () => {
        if (this.state.openKey === "actionList") {
            this.setState({
                openKey: "finishedActionList"
            })
        }
        else {
            this.setState({
                openKey: "actionList"
            })
        }
    };

    startCombination = () => {
        this.props.changeCombinationState(!this.props.combinationState)
        this.onOpenChange()
    };

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
    handleActionClick = (k, from) => {
        if (this.props.combinationState) {
            if (from === "actionList") {
                const { actionList, combinationAction } = this.props;
                combinationAction.push(actionList[k]);
                this.props.changeCombinationAction(combinationAction)
            }
            else {
                const { finishedActionList, combinationAction } = this.props;
                combinationAction.push(finishedActionList[k]);
                this.props.changeCombinationAction(combinationAction)
            }
        }
        else {
            if (from === "actionList") {
                const { actionList } = this.props;
                this.props.changePreview(actionList[k])
            }
            else {
                const { finishedActionList } = this.props;
                this.props.changePreview(finishedActionList[k])
            }
        }
    };

    // 将数组内动作组合起来
    combination = () => {
        let { actionList, finishedActionList, combinationAction } = this.props;
        let actions = [];
        combinationAction.forEach((action) => {
            actions = actions.concat(action);
            const i = actionList.indexOf(action);
            actionList.splice(i, 1);
        });
        finishedActionList.push(actions);
        this.props.changeActionList(actionList);
        this.props.changeFinishedActionList(finishedActionList);
        this.props.changeCombinationAction([]);
        this.props.changeCombinationState(false);
        this.onOpenChange()
    };

    addSameCombination = k => {
        const { finishedActionList } = this.props;
        finishedActionList.splice(k+1, 0, finishedActionList[k]);
        this.props.changeFinishedActionList(finishedActionList)
    };

    // 删除组合动作
    removeCombination = k => {
        let { finishedActionList } = this.props;
        finishedActionList.splice(k, 1);
        this.props.changeFinishedActionList(finishedActionList)
    };

    // 删除动作组合器中的动作
    removeCombinationAction = k => {
        let { combinationAction } = this.props;
        combinationAction.splice(k, 1);
        this.props.changeCombinationAction(combinationAction)
    };

    render() {
        const { actionList, finishedActionList } = this.props;
        const actionItems = actionList.map((actions, index) => (
            <div className="action_item" key={index}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                     onClick={() => this.handleActionClick(index, "actionList")}>
                    { actions.map((action) => (action.list())) }
                </svg>
                <div style={{ width: "13%", height: "100%", display: "inline-block",
                    textAlign: "center" }}>
                    <Icon type="plus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                          onClick={() => this.addSameAction(index)}/>
                    <br/>
                    <Icon type="minus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                          onClick={() => this.removeAction(index)}/>
                </div>
            </div>
            )
        );
        const finishedItems = finishedActionList.map((actions, index) => (
            <div className="action_item">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                     onClick={() => this.handleActionClick(index, "finishedActionList")}>
                    { actions.map((action) => (action.list())) }
                </svg>
                <div style={{ width: "13%", height: "100%", display: "inline-block",
                    textAlign: "center" }}>
                    <Icon type="plus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                          onClick={() => this.addSameCombination(index)}/>
                    <br/>
                    <Icon type="minus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                          onClick={() => this.removeCombination(index)}/>
                </div>
            </div>
            )
        );
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    style={{ width: "100%",
                        height: this.state.openKey === "actionList" ? "calc(100% - 30px)" : "30px",
                        transition: "height 0.5s"}}>
                    <div onClick={() => this.onOpenChange()}
                        style={{ width: "100%", color: "#E7EAED", height: "30px", lineHeight: "30px", paddingLeft: "8px" }}>
                        ActionList</div>
                    <div style={{ width: "100%", height: "94%", overflowY: "scroll", overflowX: "hidden",
                    display : this.state.openKey === "actionList" ? null : "none"}}>
                        { actionItems }
                        <div id="new_plus">
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
                <div
                    style={{ width: "100%", borderTop: "1px solid #E7EAED",
                        height: this.state.openKey === "finishedActionList" ? "calc(100% - 30px)" : "30px" }}>
                    <div onClick={() => this.onOpenChange()}
                         style={{ width: "100%", color: "#E7EAED", height: "30px", lineHeight: "30px", paddingLeft: "8px" }}>
                        finishedActionList</div>
                    <div style={{ width: "100%", overflowY: "scroll", overflowX: "hidden",
                        display : this.state.openKey === "finishedActionList" ? null : "none"}}>
                        { finishedItems }
                        <div id="new_plus">
                            <svg t="1563954469672" className="icon" viewBox="0 0 1024 1024" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" p-id="9208" width="100%" height="100%"
                                 onClick={() => this.startCombination()}>
                                <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
                                      p-id="9209"/>
                                <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
                                      p-id="9210"/>
                            </svg>
                        </div>

                    </div>
                </div>
                <Combinator combination={this.combination}
                            combinationState={this.props.combinationState}
                            combinationList={this.props.combinationAction}
                            ChangeCombination={this.props.ChangeCombination}
                            removeCombinationAction={this.removeCombinationAction}/>
            </div>
        )
    }
}

export default ActionList;
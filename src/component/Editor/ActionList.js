import React from 'react';
import { Icon } from 'antd';
import '../../css/ActionList.css';

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

    combination = () => {
        this.props.ChangeCombination();
        this.onOpenChange()
    };

    render() {
        const { actionList, finishedActionList } = this.props;
        const actionItems = actionList.map((actions, index) => (
            <div className="action_item">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                     onClick={() => this.props.handleActionClick(index, "actionList")}>
                    { actions.map((action) => (action.list())) }
                </svg>
                <div style={{ width: "13%", height: "100%", display: "inline-block",
                    textAlign: "center" }}>
                    <Icon type="plus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                          onClick={() => this.props.addSameAction(index)}/>
                    <br/>
                    <Icon type="minus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                          onClick={() => this.props.removeAction(index)}/>
                </div>
            </div>
            )
        );
        const finishedItems = finishedActionList.map((actions, index) => (
            <div className="action_item">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                     onClick={() => this.props.handleActionClick(index, "finishedActionList")}>
                    { actions.map((action) => (action.list())) }
                </svg>
                <div style={{ width: "13%", height: "100%", display: "inline-block",
                    textAlign: "center" }}>
                    <Icon type="plus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                          onClick={() => this.props.addSameCombination(index)}/>
                    <br/>
                    <Icon type="minus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                          onClick={() => this.props.removeCombination(index)}/>
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
                                 onClick={this.props.addNewAction}>
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
                                 onClick={() => this.combination()}>
                                <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
                                      p-id="9209"/>
                                <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
                                      p-id="9210"/>
                            </svg>
                        </div>

                    </div>
                </div>
                <Combinator combination={this.props.combination}
                            combinationState={this.props.combinationState}
                            combinationList={this.props.combinationAction}
                            ChangeCombination={this.props.ChangeCombination}
                            removeCombinationAction={this.props.removeCombinationAction}/>
            </div>
        )
    }
}

export default ActionList;
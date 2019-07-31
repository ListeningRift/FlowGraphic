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
                    marginLeft: "3%", position: "relative", bottom: "30%"}}>
                    <Icon type="minus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                          onClick={() => props.remove(index)}/>
                </div>
            </div>
        )
    );
    return (
        <div id="action_combination">
            <span id="combination_title">Action Combinator</span>
            <div id="combination_items">
                { combinationItems }
            </div>
            <button>组合</button>
            <button>取消</button>
        </div>
    )
}

class ActionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            combinatorShow: false,
            unfoldItems: "actionItems"
        }
    }

    render() {
        const { actionList } = this.props;
        const actionItems = actionList.map((actions, index) => (
            <div className="action_item">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                     key={index}
                     onClick={() => this.props.handleActionChange(index)}
                     >
                    { actions.map((action) => (action.list())) }
                </svg>
                <div style={{ width: "13%", height: "100%", display: "inline-block",
                         marginLeft: "3%", position: "relative", bottom: "30%"}}>
                    <Icon type="plus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                    onClick={() => this.props.addSame(index)}/>
                    <br/>
                    <Icon type="minus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                    onClick={() => this.props.remove(index)}/>
                </div>
            </div>
            )
        );
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div style={{ width: "100%", height: "94%", overflowY: "scroll", overflowX: "hidden" }}>
                    { actionItems }
                    <div id="new_plus">
                        <svg t="1563954469672" className="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="9208" width="100%" height="100%"
                             onClick={this.props.addNew}>
                            <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
                                  p-id="9209"/>
                            <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
                                  p-id="9210"/>
                        </svg>
                    </div>
                </div>
                <div id="actionList_operation">
                    <button id="combination">动画组合</button>
                    <Combinator />
                </div>
            </div>
        )}
}

export default ActionList;
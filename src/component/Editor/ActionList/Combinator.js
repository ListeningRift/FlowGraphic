import React from 'react';
import { Icon, Button } from 'antd';
import '../../../css/Editor/ActionList.css';


function Combinator(props) {

    // 将数组内动作组合起来
    const combination = () => {
        let { actionList, combinationAction } = props;
        let actions = [];
        combinationAction.forEach((action) => {
            actions = actions.concat(action);
            const i = actionList.indexOf(action);
            actionList.splice(i, 1);
        });
        actionList.push(actions);
        props.changeActionList(actionList);
        props.changeCombinationAction([]);
        props.changeCombinationState(false);
    };

    // 取消组合动作
    const cancelCombination = () => {
        props.changeCombinationAction([]);
        props.changeCombinationState(false);
    };

    // 删除动作组合器中的动作
    const removeCombinationAction = k => {
        let { combinationAction } = props;
        combinationAction.splice(k, 1);
        props.changeCombinationAction(combinationAction)
    };

    const { combinationAction } = props;
    const combinationItems = combinationAction.map((actions, index) => (
        <div className="combination-item">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                 key={index}>
                { actions.map((action) => (action.list())) }
            </svg>
            <div style={{ width: "13%", height: "100%", display: "inline-block",
                textAlign: "center" }}>
                <Icon type="minus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                      onClick={() => removeCombinationAction(index)}/>
            </div>
        </div>
    ));
    return (
        <div id="action-combination" style={{ display: props.combinationState ? null : "none" }}>
            <div id="combination-title">Action Combinator</div>
            <div id="combination-items">
                { combinationItems }
            </div>
            <div id="combination-button">
                <Button type="primary" onClick={combination}>组合</Button>
                <Button type="primary" style={{ marginLeft: "25px" }}
                        onClick={cancelCombination}>取消</Button>
            </div>
        </div>
    )
}

export default Combinator;
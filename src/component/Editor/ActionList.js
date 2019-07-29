import React from 'react';
import { Icon } from 'antd';
import './ActionList.css';

function ActionList(props) {
    const { actionList } = props;
    const actionItems = actionList.map((actions, index) => (
        <div className="action_item">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                 key={index}
                 onClick={() => props.handleActionChange(index)}
                 >
                { actions.map((action) => (action.list())) }
            </svg>
            <div style={{ width: "13%", height: "100%", display: "inline-block",
                     marginLeft: "3%", position: "relative", bottom: "30%"}}>
                <Icon type="plus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                onClick={() => props.addSame(index)}/>
                <br/>
                <Icon type="minus-circle" style={{ fontSize: "120%", color: "#E7EAED" }}
                onClick={() => props.remove(index)}/>
            </div>
        </div>
        )
    );
    return (
        <div style={{ width: "100%", height: "100%", overflowY: "scroll", overflowX: "hidden" }}>
            { actionItems }
            <div id="new_plus">
                <svg t="1563954469672" className="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="9208" width="100%" height="100%"
                     onClick={props.addNew}>
                    <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
                          p-id="9209"/>
                    <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
                          p-id="9210"/>
                </svg>
            </div>
        </div>
    )
}

export default ActionList;
import {Icon} from "antd";
import React from "react";

function Selector(props) {
    // if (props.child !== undefined) {
    const selectorItem = props.child.map((shape, index) => (
        <div className="selector_item" key={index}>
            <div className="item_id" onClick={() => props.select(shape)}>{ shape.shape }</div>
            <div className="item_button">
                <Icon type="plus-square" style={{ marginRight: "3px" }}
                      onClick={() => props.addSameElement(shape)}/>
                <Icon type="minus-square"
                      onClick={() => props.removeElement(shape)}/>
            </div>
        </div>
    ));
    return (
        <div className="selector">
            <div className="selector_title">
                { props.title }
                <Icon type="plus"
                      style={{ color: "#E7EAED", float: "right", marginRight: "10px", marginTop: "3px" }}
                      onClick={() => props.addNewElement(props.title)}/>
            </div>
            <div className="selector_items">
                { selectorItem }
            </div>
        </div>
    )
    // }
    // else {
    //     return (
    //         <div className="selector">
    //             <div className="selector_title">{props.title}</div>
    //             <div className="selector_items">
    //             </div>
    //         </div>
    //     )
    // }
}


function GroupSelector(props) {
    const groupItem = props.groupElement.map((element, index) => (
        <div className="group_item">
            <div className="group_item_id">
                { element.shape }
            </div>
            <div className="group_item_button">
                <Icon type="minus-square"
                      onClick={() => props.removeGroupElement(index)}/>
            </div>
        </div>
    ));
    const selectorItem = props.child.map((shape) => (
        <div className="selector_item">
            <div className="item_id" onClick={() => props.select(shape)}>{ shape.shape }</div>
            <div className="item_button">
                <Icon type="plus-square" style={{ marginRight: "3px" }}
                      onClick={() => props.addSameElement(shape)}/>
                <Icon type="minus-square"
                      onClick={() => props.ungroup(shape)}/>
            </div>
        </div>
    ));
    return (
        <div className="selector">
            <div className="selector_title">
                Group
                <Icon type="plus"
                      style={{ color: "#E7EAED", float: "right", marginRight: "10px", marginTop: "3px" }}
                      onClick={() => props.addGroup()}/>
                { props.groupState ? (
                    <div className="combiner">
                        <div className="combiner_title">
                            Combiner
                        </div>
                        <div className="group_items">
                            { groupItem }
                        </div>
                        <div className="group_button">
                            <button onClick={() => props.group()} id="group_button">组合</button>
                            <button onClick={() => props.cancelGroup()} id="cancel_button">取消</button>
                        </div>
                    </div>) : null }
            </div>
            <div className="selector_items">
                { selectorItem }
            </div>
        </div>
    )
}

export { Selector, GroupSelector };
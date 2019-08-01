import React from "react";
import { Icon } from "antd";
import '../../css/Operationbar.css';

function Separator() {
    return <div style={{ borderTop: "solid #C0C0C0 1px", margin: "10px 2px" }}> </div>
}

function Selector(props) {
    // if (props.child !== undefined) {
        const selectorItem = props.child.map((shape) => (
            <div className="selector_item">
                <div className="item_id" onClick={() => props.select(shape)}>{shape.shape}</div>
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
                    {props.title}
                    <Icon type="plus"
                          style={{ color: "#E7EAED", float: "right", marginRight: "10px" }}
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
            <div className="item_id" onClick={() => props.select(shape)}>{shape.shape}</div>
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
                      style={{ color: "#E7EAED", float: "right", marginRight: "10px" }}
                      onClick={() => props.addGroup()}/>
                { props.groupState ? (<div className="combiner">
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

function Regulator(props) {
    const { Selected } = props;
    let result = [];
    let j = 0;
    for (let i in Selected) {
        if (i !== "shape" && i !== "elements") {
            result[j++] = (
                <div className="regulator">
                    <div className="regulator_title">{i}</div>
                    <div className="regulator_window">
                        <input className="regulator_input" value={Selected[i]}
                               onChange={(event) => props.readjust(event, i)}/>
                    </div>
                </div>
            );
        }
    }
    return (result)
}

class Operationbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openKey: "Regulator"
        }
    }

    choose = (condition) => {
        let result = [];
        let j = 0;
        for (let i in this.props.element) {
            if (this.props.element[i].shape === condition) {
                result[j++] = this.props.element[i]
            }
        }
        return result
    };

    onOpenChange = () => {
        if (this.state.openKey === "Regulator") {
            this.setState({
                openKey: "Selector"
            })
        }
        else {
            this.setState({
                openKey: "Regulator"
            })
        }
    };

    render() {
        const shapes = ["Circle", "Rect", "Ellipse", "Line", "Text"];
        const selectors = shapes.map((shape) => (
            <Selector title={shape}
                      child={this.choose(shape)}
                      select={this.props.select}
                      addNewElement={this.props.addNewElement}
                      addSameElement={this.props.addSameElement}
                      removeElement={this.props.removeElement}/>
        ));
        return (
            <div id="operation">
                <div style={{ fontSize: "15px", marginLeft: "15px", color: "#E7EAED",
                    width: "100%", height: "30px", lineHeight: "30px" }}
                     onClick={this.onOpenChange}>Selector</div>
                <div id="selectors" style={{ display: this.state.openKey === "Selector" ? null : "none" }}>
                    { selectors }
                    <GroupSelector title="Group"
                                   child={this.choose("Group")}
                                   select={this.props.select}
                                   groupElement={this.props.groupElement}
                                   groupState={this.props.groupState}
                                   group={this.props.group}
                                   addGroup={this.props.addGroup}
                                   ungroup={this.props.ungroup}
                                   cancelGroup={this.props.cancelGroup}
                                   removeGroupElement={this.props.removeGroupElement}
                                   addSameElement={this.props.addSameElement}
                                   removeElement={this.props.removeElement}/>
                </div>
                <Separator/>
                <div id="regulators">
                    <div style={{ fontSize: "15px", marginLeft: "15px", color: "#E7EAED",
                        width: "100%", height: "30px", lineHeight: "30px" }}
                         onClick={this.onOpenChange}>Regulator</div>
                    <Regulator readjust={this.props.readjust} Selected={this.props.Selected}/>
                </div>
            </div>
        )
    }
}

export default Operationbar;

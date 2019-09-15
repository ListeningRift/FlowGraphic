import React from "react";
import 'antd/dist/antd.css';
import '../../../css/Editor/Operationbar.css';
import { Circle, Ellipse, Line, Rect, Text } from "../../../function/Element/BasicElement";
import { NewAction } from "../../../function/Element/SpecialAction";
import Group from "../../../function/Element/Group";
import { Selector, GroupSelector } from "./Selector";
import Regulator from "./Regulator";
import Animator from "./Animator";

function Separator() {
    return <div style={{ borderTop: "solid #C0C0C0 1px", margin: "10px 2px" }}> </div>
}

class OperationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openKey: "Selector"
        }
    }

    choose = (condition) => {
        let result = [];
        let j = 0;
        for (let i in this.props.preview) {
            if (this.props.preview[i].shape === condition) {
                result[j++] = this.props.preview[i]
            }
        }
        return result
    };

    onOpenChange = key => {
        if (this.state.openKey === key) {
            this.setState({
                openKey: undefined
            })
        }
        else {
            this.setState({
                openKey: key
            })
        }
    };

    // 选中编辑栏内某元素
    select = element => {
        if (!this.props.groupState) {
            console.log("1");
            this.props.changeSelected(element)
        } else {
            let { groupElement } = this.props;
            groupElement.push(element);
            this.props.changeGroupElement(groupElement)
        }
    };

    // 调整元素属性
    readjust = (e, i) => {
        let { actionList, preview, selected } = this.props;
        const preIndex = actionList.indexOf(preview);
        const selIndex = preview.indexOf(selected);
        actionList[preIndex][selIndex][i] = e.target.value;
        this.props.changeActionList(actionList)
    };

    // 添加新元素
    addNewElement = (shape) => {
        let { actionList, preview } = this.props;
        const preIndex = actionList.indexOf(preview);
        let newElement;
        switch (shape) {
            case "Circle":newElement = new Circle({cx:0, cy:0, r:0}, this.props.changeSelected);
                this.props.changeMaking("Circle");
                break;
            case "Rect":newElement = new Rect({x:0, y:0, width:0, height:0}, this.props.changeSelected);
                this.props.changeMaking("Rect");
                break;
            case "Ellipse":newElement = new Ellipse({cx:0, cy:0, rx:0, ry:0}, this.props.changeSelected);
                this.props.changeMaking("Ellipse");
                break;
            case "Line":newElement = new Line({x1:0, y1:0, x2:0, y2:0, stroke:"black"}, this.props.changeSelected);
                this.props.changeMaking("Line");
                break;
            case "Text":newElement = new Text({x:0, y:0, content: "New"}, this.props.changeSelected);
                this.props.changeMaking("Text");
                break;
        }
        if (preview[0] !== NewAction) {
            preview.push(newElement);
        } else {
            preview[0] = newElement
        }
        actionList[preIndex] = preview;
        this.props.changeActionList(actionList)
    };

    // 添加与某元素相同的元素
    addSameElement = element => {
        let { actionList, preview } = this.props;
        const preIndex = actionList.indexOf(preview);
        let newElement;
        switch (element.shape) {
            case "Circle":newElement = new Circle({...element}, this.props.changeSelected);
                break;
            case "Rect":newElement = new Rect({...element}, this.props.changeSelected);
                break;
            case "Ellipse":newElement = new Ellipse({...element}, this.props.changeSelected);
                break;
            case "Line":newElement = new Line({...element}, this.props.changeSelected);
                break;
            case "Text":newElement = new Text({...element}, this.props.changeSelected);
                break;
        }
        preview.push(newElement);
        actionList[preIndex] = preview;
        this.props.changeActionList(actionList)
    };

    // 删除某元素
    removeElement = element => {
        let { actionList, preview } = this.props;
        const preIndex = actionList.indexOf(preview);
        const eleIndex = preview.indexOf(element);
        preview.splice(eleIndex, 1);
        actionList[preIndex] = preview;
        this.props.changeActionList(actionList)
    };

    // 更改组合状态，开始组合
    addGroup = () => {
        this.props.changeGroupState(true)
    };

    // 更改组合状态，取消组合
    cancelGroup = () => {
        this.props.changeGroupState(false);
        this.props.changeGroupElement([])
    };

    // 拆开组合元素
    ungroup = (group) => {
        let { actionList, preview } = this.props;
        const groupIndex = preview.indexOf(group);
        const preIndex = actionList.indexOf(preview);
        preview.splice(groupIndex, 1);
        group.elements.forEach((element) => {
            preview.push(element)
        });
        actionList[preIndex] = preview;
        this.props.changeActionList(actionList)
    };

    // 删除组合元素
    removeGroupElement = k => {
        let { groupElement } = this.props;
        groupElement.splice(k, 1);
        this.props.changeGroupElement(groupElement)
    };

    // 将列表中准备组合的元素组合起来
    group = () => {
        let { actionList, preview, groupElement } = this.props;
        groupElement.forEach((element) => {
            const index = preview.indexOf(element);
            preview.splice(index, 1);
        });
        const group = new Group(groupElement);
        const preIndex = actionList.indexOf(preview);
        preview.push(group);
        actionList[preIndex] = preview;
        this.props.changeActionList(actionList);
        this.props.changeGroupElement([]);
        this.props.changeGroupState(false);
    };

    render() {
        const shapes = ["Circle", "Rect", "Ellipse", "Line", "Text"];
        const selectors = shapes.map((shape, index) => (
            <Selector title={shape}
                      child={this.choose(shape)}
                      select={this.select}
                      addNewElement={this.addNewElement}
                      addSameElement={this.addSameElement}
                      removeElement={this.removeElement}
                      key={index}/>
        ));
        return (
            <div id="operation">
                <div id="selectors">
                    <div style={{ fontSize: "15px", marginLeft: "15px", color: "#E7EAED",
                        width: "100%", height: "30px", lineHeight: "30px" }}
                         onClick={() => this.onOpenChange("Selector")}>
                        Selector
                    </div>
                    { this.state.openKey === "Selector" ? (
                        <div style={{ width: "100%", marginTop: "5px" }}>
                        { selectors }
                        <GroupSelector title="Group"
                                       groupElement={this.props.groupElement}
                                       groupState={this.props.groupState}
                                       child={this.choose("Group")}
                                       select={this.select}
                                       group={this.group}
                                       addGroup={this.addGroup}
                                       ungroup={this.ungroup}
                                       cancelGroup={this.cancelGroup}
                                       removeGroupElement={this.removeGroupElement}
                                       addSameElement={this.addSameElement}
                                       removeElement={this.removeElement}/>
                    </div>) : null }
                </div>
                <Separator/>
                <div id="regulators">
                    <div style={{ fontSize: "15px", marginLeft: "15px", color: "#E7EAED",
                        width: "100%", height: "30px", lineHeight: "30px" }}
                         onClick={() => this.onOpenChange("Regulator")}>
                        Regulator
                    </div>
                    { this.state.openKey === "Regulator" ? (
                        <div className="regulator-list">
                        <Regulator readjust={this.readjust} selected={this.props.selected}/>
                    </div>) : null }
                </div>
                <Separator/>
                <div id="animator">
                    <div style={{ fontSize: "15px", marginLeft: "15px", color: "#E7EAED",
                        width: "100%", height: "30px", lineHeight: "30px" }}
                         onClick={() => this.onOpenChange("Animator")}>
                        Animator
                    </div>
                    { this.state.openKey === "Animator" ? (
                        <div
                            style={{ width: "100%" }}>
                            <Animator selected={this.props.selected} changeElement={this.props.changeElement}/>
                        </div>) : null }
                </div>
            </div>
        )
    }
}

export default OperationBar;

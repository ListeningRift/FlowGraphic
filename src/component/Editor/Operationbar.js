import React from "react";
import { Icon, Tabs, Tag, Button } from "antd";
import 'antd/dist/antd.css';
import '../../css/Operationbar.css';
import {Circle, Ellipse, Line, Rect, Text} from "../../function/Shape/Shape";
import {NewAction} from "../../function/PromptAction";
import Group from "../../function/Shape/Group";

const { TabPane } = Tabs;
const { CheckableTag } = Tag;

function Separator() {
    return <div style={{ borderTop: "solid #C0C0C0 1px", margin: "10px 2px" }}> </div>
}

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

function Regulator(props) {
    const { selected } = props;
    let [result, j] = [[], 0];
    const undisplayed = ["shape", "elements", "allAnimate", "previewAnimate"];
    for (let i in selected) {
        if (undisplayed.indexOf(i) < 0) {
            result[j++] = (
                <div className="regulator">
                    <div className="regulator_title">{ i }</div>
                    <div className="regulator_window">
                        <input className="regulator_input" value={selected[i]}
                               onChange={(event) => props.readjust(event, i)}/>
                    </div>
                </div>
            );
        }
    }
    return (result)
}

class Animator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAnimation: []
        }
    }

    handleChange = (checked, tag) => {
        const { selectedAnimation } = this.state;
        const nextSelectedAnimation = checked ? [...selectedAnimation, tag] : selectedAnimation.filter(t => t !== tag);
        this.setState({
            selectedAnimation: nextSelectedAnimation
        })
    };

    delete = () => {
        const { selectedAnimation } = this.state;
        let { selected } = this.props;
        selected.allAnimate = selected.allAnimate.filter(t => selectedAnimation.indexOf(t) < 0);
        this.props.changeElement(selected);
        this.setState({
            selectedAnimation: []
        })
    };

    preview = () => {
        const { selectedAnimation } = this.state;
        let { selected } = this.props;
        selected.previewAnimate = [...selected.previewAnimate, selectedAnimation];
        this.props.changeElement(selected);
    };

    render() {
        const { selected } = this.props;
        const { selectedAnimation } = this.state;
        const allAnimationTag = selected ? selected.allAnimate.map(animation => (
            <CheckableTag
                checked={selectedAnimation.indexOf(animation) > -1}
                onChange={checked => this.handleChange(checked, animation)}>
                { animation.name }
            </CheckableTag>
        )) : null;
        return (
            <div id="animation">
                <Tabs defaultActiveKey="1" size="small">
                    <TabPane tab="Preview" key="1">
                        <div id="tags">
                            { allAnimationTag }
                        </div>
                        <div id="tags_operation">
                            <Button type="primary" onClick={() => this.preview()}>预览</Button>
                            <Button type="primary" style={{ marginLeft: "50px" }}
                            onClick={() => this.delete()}>删除</Button>
                        </div>
                    </TabPane>
                    <TabPane tab="Add" key="2">

                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

class Operationbar extends React.Component {
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
            case "Circle":newElement = new Circle({cx:0, cy:0, r:0});
                break;
            case "Rect":newElement = new Rect({x:0, y:0, width:0, height:0});
                break;
            case "Ellipse":newElement = new Ellipse({cx:0, cy:0, rx:0, ry:0});
                break;
            case "Line":newElement = new Line({x1:0, y1:0, x2:0, y2:0, stroke:"black"});
                break;
            case "Text":newElement = new Text({x:0, y:0, content: "New"});
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
            case "Circle":newElement = new Circle({...element});
                break;
            case "Rect":newElement = new Rect({...element});
                break;
            case "Ellipse":newElement = new Ellipse({...element});
                break;
            case "Line":newElement = new Line({...element});
                break;
            case "Text":newElement = new Text({...element});
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
                        <div
                        style={{ overflowY: "scroll", overflowX: "hidden", width: "100%", flex: "auto", webkitFlex: "auto" }}>
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

export default Operationbar;

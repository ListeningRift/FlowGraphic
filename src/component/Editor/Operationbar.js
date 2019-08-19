import React from "react";
import { Icon, Tabs, Tag, Button } from "antd";
import 'antd/dist/antd.css';
import '../../css/Operationbar.css';

const { TabPane } = Tabs;
const { CheckableTag } = Tag;

function Separator() {
    return <div style={{ borderTop: "solid #C0C0C0 1px", margin: "10px 2px" }}> </div>
}

function Selector(props) {
    // if (props.child !== undefined) {
        const selectorItem = props.child.map((shape) => (
            <div className="selector_item">
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
                      style={{ color: "#E7EAED", float: "right", marginRight: "10px" }}
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
    const { Selected } = props;
    let [result, j] = [[], 0];
    const undisplayed = ["shape", "elements", "allAnimate", "previewAnimate"];
    for (let i in Selected) {
        if (undisplayed.indexOf(i) < 0) {
            result[j++] = (
                <div className="regulator">
                    <div className="regulator_title">{ i }</div>
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
        let { Selected } = this.props;
        Selected.allAnimate = Selected.allAnimate.filter(t => selectedAnimation.indexOf(t) < 0);
        this.props.changeElement(Selected);
        this.setState({
            selectedAnimation: []
        })
    };

    preview = () => {
        const { selectedAnimation } = this.state;
        let { Selected } = this.props;
        Selected.previewAnimate = [...Selected.previewAnimate, selectedAnimation];
        this.props.changeElement(Selected);
    };

    render() {
        const { Selected } = this.props;
        const { selectedAnimation } = this.state;
        const allAnimationTag = Selected ? Selected.allAnimate.map(animation => (
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
        for (let i in this.props.element) {
            if (this.props.element[i].shape === condition) {
                result[j++] = this.props.element[i]
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
                        <Regulator readjust={this.props.readjust} Selected={this.props.Selected}/>
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
                            <Animator Selected={this.props.Selected} changeElement={this.props.changeElement}/>
                        </div>) : null }
                </div>
            </div>
        )
    }
}

export default Operationbar;

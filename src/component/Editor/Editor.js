import React from 'react';
import '../../css/Editor.css';
import Menubar from './Menubar';
import ActionList from './ActionList';
import Operationbar from "./Operationbar";
import { NewAction } from "../../function/PromptAction";
import { Circle, Rect, Line, Ellipse, Text } from "../../function/ShapeStructure/Shape";
import Group from '../../function/ShapeStructure/Group';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        const a = new Circle({cx: 500, cy: 500, r: 300});
        const b = new Rect({x: 300, y: 300, width: 100, height: 100});
        const c = new Line({x1: 50, y1: 30,x2: 500, y2: 300, stroke: "black"});
        this.state = {
            // actionList为所有动作的列表
            actionList: [[a, c], [b]],
            // finishedActionList已完成的动作，组合后的列表
            finishedActionList: [[c], [a], [b]],
            // preview为当前编辑栏中的动作
            preview: undefined,
            // selected编辑栏中动作被选中元素
            selected: undefined,

            // 元素组合状态，true时为元素组合状态，false时正常状态
            groupState: false,
            // 元素组合数组，准备组合的元素的数组
            groupElement: [],

            // 动作组合状态，true时为动作组合状态，false时正常状态
            combinationState: false,
            // 动作组合数组，准备组合的动作的数组
            combinationAction: []
        }
    }

    // 处理点击动作事件
    handleActionClick = (k, from) => {
        if (this.state.combinationState) {
            if (from === "actionList") {
                const { actionList, combinationAction } = this.state;
                combinationAction.push(actionList[k]);
                this.setState({
                    combinationAction: combinationAction
                })
            }
            else {
                const { finishedActionList, combinationAction } = this.state;
                combinationAction.push(finishedActionList[k]);
                this.setState({
                    combinationAction: combinationAction
                })
            }
        }
        else {
            const actionList = this.state.actionList;
            this.setState({
                preview: actionList[k]
            })
        }
    };


    // 删除某动作
    removeAction = k => {
        let { actionList } = this.state;
        actionList.splice(k, 1);
        this.setState({
            actionList: actionList
        })
    };

    // 添加新空动作
    addNewAction = () => {
        const { actionList } = this.state;
        const newActionList = actionList.concat([[NewAction]]);
        this.setState({
            actionList: newActionList
        })
    };

    // 添加与某动作相同的动作
    addSameAction = k => {
        let { actionList } = this.state;
        actionList.splice(k+1, 0, actionList[k]);
        this.setState({
            actionList: actionList
        })
    };


    // 选中编辑栏内某元素
    select = element => {
        if (!this.state.groupState) {
            this.setState({
                selected: element
            })
        } else {
            let { groupElement } = this.state;
            groupElement.push(element);
            this.setState({
                groupElement: groupElement
            })
        }
    };

    // 取消选中
    unselect = () => {
        this.setState({
            selected: undefined
        })
    };


    // 调整元素属性
    readjust = (e, i) => {
        let { actionList, preview, selected } = this.state;
        const preIndex = actionList.indexOf(preview);
        const selIndex = preview.indexOf(selected);
        actionList[preIndex][selIndex][i] = e.target.value;
        this.setState({
            actionList: actionList
        })
    };

    // 添加新元素
    addNewElement = (shape) => {
        let { actionList, preview } = this.state;
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
        }
        if (preview[0] !== NewAction) {
            preview.push(newElement);
        } else {
            preview[0] = newElement
        }
        actionList[preIndex] = preview;
        this.setState({
            actionList: actionList
        })
    };

    // 添加与某元素相同的元素
    addSameElement = (element) => {
        let { actionList, preview } = this.state;
        const preIndex = actionList.indexOf(preview);
        preview.push(element);
        actionList[preIndex] = preview;
        this.setState({
            actionList: actionList
        })
    };

    // 删除某元素
    removeElement = (element) => {
        let { actionList, preview } = this.state;
        const preIndex = actionList.indexOf(preview);
        const eleIndex = preview.indexOf(element);
        preview.splice(eleIndex, 1);
        actionList[preIndex] = preview;
        this.setState({
            actionList: actionList
        })
    };


    // 将列表中准备组合的元素组合起来
    group = () => {
        let { actionList, preview, groupElement } = this.state;
        groupElement.forEach((element) => {
            const index = preview.indexOf(element);
            preview.splice(index, 1);
        });
        const group = new Group(groupElement);
        const preIndex = actionList.indexOf(preview);
        preview.push(group);
        actionList[preIndex] = preview;
        this.setState({
            actionList: actionList,
            groupElement: [],
            groupState: false
        })
    };

    // 拆开组合元素
    ungroup = (group) => {
        let { actionList, preview } = this.state;
        const groupIndex = preview.indexOf(group);
        const preIndex = actionList.indexOf(preview);
        preview.splice(groupIndex, 1);
        group.elements.forEach((element) => {
            preview.push(element)
        });
        actionList[preIndex] = preview;
        this.setState({
            actionList: actionList
        })
    };

    // 更改组合状态，开始组合
    addGroup = () => {
        this.setState({
            groupState: true
        })
    };

    // 更改组合状态，取消组合
    cancelGroup = () => {
        this.setState({
            groupState: false,
            groupElement: []
        })
    };

    // 删除组合元素
    removeGroupElement = k => {
        let { groupElement } = this.state;
        groupElement.splice(k, 1);
        this.setState({
            groupElement: groupElement
        })
    };


    // 更改组合状态，开始组合动作
    ChangeCombination = () => {
        this.setState({
            combinationState: !this.state.combinationState
        })
    };

    // 将数组内动作组合起来
    combination = () => {
        let { actionList, finishedActionList, combinationAction } = this.state;
        let actions = [];
        combinationAction.forEach((action) => {
            actions = actions.concat(action);
            const i = actionList.indexOf(action);
            actionList.splice(i, 1);
        });
        finishedActionList.push(actions);
        this.setState({
            actionList: actionList,
            finishedActionList: finishedActionList,
            combinationAction: [],
            combinationState: false
        })
    };

    // 拆开组合动作，暂不支持
    // dissolve = (combination) => {
    //     let { actionList, finishedActionList } = this.state;
    //     const comIndex = finishedActionList.indexOf(combination);
    //     finishedActionList.splice(comIndex, 1);
    //     actionList.concat(combination);
    //     this.setState({
    //         actionList: actionList,
    //         finishedActionList: finishedActionList
    //     })
    // };

    // 添加与某组合动作相同的动作
    addSameCombination = k => {
        const { finishedActionList } = this.state;
        finishedActionList.splice(k+1, 0, finishedActionList[k]);
        this.setState({
            finishedActionList: finishedActionList
        })
    };

    // 删除组合动作
    removeCombination = k => {
        let { finishedActionList } = this.state;
        finishedActionList.splice(k, 1);
        this.setState({
            finishedActionList: finishedActionList
        })
    };

    removeCombinationAction = k => {
        let { combinationAction } = this.state;
        combinationAction.splice(k, 1);
        this.setState({
            combinationAction: combinationAction
        })
    };

    render() {
        const { preview, selected } = this.state;
        if (preview !== undefined) {
            var editor = preview.map((preview) => {
                if (preview === selected) {
                    return preview.selected()
                } else {
                    return preview.editor()
                }
            })
        }
        return (
            <div id="canvas"
                 style={{ background: "#3F3F3F",
                     width: "100%", height: "100%" }}>
                <div id="menubar">
                    <Menubar/>
                </div>
                <div id="editor" onClick={this.unselect}>
                    <svg width="100%" height="100%">
                        {editor}
                    </svg>
                </div>
                <div id="action_list">
                    <ActionList
                        actionList={this.state.actionList}
                        finishedActionList={this.state.finishedActionList}
                        combinationState={this.state.combinationState}
                        combinationAction={this.state.combinationAction}
                        handleActionClick={this.handleActionClick}
                        addNewAction={this.addNewAction}
                        addSameAction={this.addSameAction}
                        removeAction={this.removeAction}
                        combination={this.combination}
                        ChangeCombination={this.ChangeCombination}
                        addSameCombination={this.addSameCombination}
                        removeCombination={this.removeCombination}
                        removeCombinationAction={this.removeCombinationAction}
                    />
                </div>
                <div id="operation_bar">
                    <Operationbar
                        element={this.state.preview} Selected={this.state.selected}
                        groupState={this.state.groupState} groupElement={this.state.groupElement}
                        select={this.select} readjust={this.readjust}
                        addNewElement={this.addNewElement}
                        addSameElement={this.addSameElement}
                        removeElement={this.removeElement}
                        addGroup={this.addGroup}
                        ungroup={this.ungroup}
                        cancelGroup={this.cancelGroup}
                        removeGroupElement={this.removeGroupElement}
                        group={this.group}/>
                </div>
            </div>
        )
    }
}

export default Editor;
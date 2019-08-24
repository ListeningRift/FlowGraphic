import React from 'react';
import '../../css/Editor/Editor.css';
import MenuBar from './MenuBar/MenuBar';
import ActionList from './ActionList/ActionList';
import OperationBar from "./OperationBar/OperationBar";
import { Circle, Rect, Line, Ellipse, Text } from "../../function/Element/Shape";
import { AnimateTransform } from "../../function/Animation/AnimateTag";


class Editor extends React.Component {
    constructor(props) {
        super(props);
        let a = new Circle({cx: 500, cy: 500, r: 300});
        const b = new Rect({x: 300, y: 300, width: 100, height: 100});
        const c = new Line({x1: 50, y1: 30,x2: 500, y2: 300, stroke: "black"});
        const animation = new AnimateTransform({name:"放大", begin:"0s", dur:"3s", type:"scale", from:"1", to:"1.5", repeatCount:"indefinite"});
        a.addAnimate(animation);
        console.log(animation);
        console.log(a);
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

    // actionList更改
    changeActionList = newActionList => {
        this.setState({
            actionList: newActionList
        })
    };

    // finishedActionList更改
    changeFinishedActionList = newFinishedActionList => {
        this.setState({
            finishedActionList: newFinishedActionList
        })
    };

    // preview更改
    changePreview = newPreview => {
        this.setState({
            preview: newPreview
        })
    };

    // selected更改
    changeSelected = newSelected => {
        this.setState({
            selected: newSelected
        })
    };

    // groupState更改
    changeGroupState = newGroupState => {
        this.setState({
            groupState: newGroupState
        })
    };

    // groupElement更改
    changeGroupElement = newGroupElement => {
        this.setState({
            groupElement: newGroupElement
        })
    };

    // combinationState更改
    changeCombinationState = newCombinationState => {
        this.setState({
            combinationState: newCombinationState
        })
    };

    // combinationAction更改
    changeCombinationAction = newCombinationAction => {
        this.setState({
            combinationAction: newCombinationAction
        })
    };

    // 取消元素选中
    unselect = () => {
        this.setState({
            selected: undefined
        })
    };

    //对元素进行更改
    changeElement = element => {
        const { actionList, preview, selected } = this.state;
        const [preIndex, selectedIndex] = [actionList.indexOf(preview), preview.indexOf(selected)];
        actionList[preIndex][selectedIndex] = element;
        this.changeActionList(actionList);
    };

    render() {
        const { preview, selected } = this.state;
        let editor;
        if (preview !== undefined) {
            editor = preview.map((preview) => {
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
                    <MenuBar/>
                </div>
                <div id="editor" onClick={this.unselect}>
                    <svg width="100%" height="100%">
                        { editor }
                    </svg>
                </div>
                <div id="action_list">
                    <ActionList
                        actionList={this.state.actionList}
                        finishedActionList={this.state.finishedActionList}
                        combinationState={this.state.combinationState}
                        combinationAction={this.state.combinationAction}

                        changeActionList={this.changeActionList}
                        changeFinishedActionList={this.changeFinishedActionList}
                        changePreview={this.changePreview}
                        changeGroupState={this.changeGroupState}
                        changeCombinationState={this.changeCombinationState}
                        changeCombinationAction={this.changeCombinationAction}
                    />
                </div>
                <div id="operation_bar">
                    <OperationBar
                        actionList={this.state.actionList}
                        preview={this.state.preview}
                        selected={this.state.selected}
                        groupState={this.state.groupState}
                        groupElement={this.state.groupElement}

                        changeElement={this.changeElement}
                        changeActionList={this.changeActionList}
                        changeSelected={this.changeSelected}
                        changeGroupState={this.changeGroupState}
                        changeGroupElement={this.changeGroupElement}/>
                </div>
                {/*<div id="animation_bar">*/}
                {/*    <AnimationEditor/>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Editor;
import React from 'react';
import '../css/Editor/Editor.css';
import Canvas from "../component/Editor/Canvas/Canvas";
import MenuBar from '../component/Editor/MenuBar/MenuBar';
import ActionList from '../component/Editor/ActionList/ActionList';
import OperationBar from "../component/Editor/OperationBar/OperationBar";
import { Circle, Rect, Line } from "../function/Element/BasicElement";
import { AnimateTransform } from "../function/Animation/BasicAnimate";

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // actionList为所有动作的列表
            actionList: [],

            // preview为当前编辑栏中的动作
            preview: [],
            // select编辑栏中动作被选中元素
            selected: undefined,

            // 元素构造状态
            making: "",

            // 元素组合状态，true时为元素组合状态，false时正常状态
            groupState: false,
            // 元素组合数组，准备组合的元素的数组
            groupElement: [],

            // 动作组合状态，true时为动作组合状态，false时正常状态
            combinationState: false,
            // 动作组合数组，准备组合的动作的数组
            combinationAction: []
        };
    }

    componentDidMount() {
        let a = new Circle({cx: 500, cy: 500, r: 300}, this.changeSelected);
        const b = new Rect({x: 300, y: 300, width: 100, height: 100}, this.changeSelected);
        const c = new Line({x1: 50, y1: 30,x2: 500, y2: 300, stroke: "black"}, this.changeSelected);
        const animation = new AnimateTransform({name:"放大", begin:"0s", dur:"3s", type:"scale", from:"1", to:"1.5", repeatCount:"indefinite"});
        a.addAnimate(animation);
        this.setState({
            actionList: [[a, c], [b]]
        })
    }

    // actionList更改
    changeActionList = newActionList => {
        this.setState({
            actionList: newActionList
        })
    };

    // preview更改
    changePreview = newPreview => {
        this.setState({
            preview: newPreview
        })
    };

    // select更改
    changeSelected = newSelected => {
        this.setState({
            selected: newSelected
        });
    };

    // making更改
    changeMaking = makingElement => {
        this.setState({
            making: makingElement
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

    //对元素进行更改
    changeElement = element => {
        const { actionList, preview, selected } = this.state;
        const [preIndex, selectedIndex] = [actionList.indexOf(preview), preview.indexOf(selected)];
        actionList[preIndex][selectedIndex] = element;
        this.changeActionList(actionList);
    };

    render() {

        return (
            <div id="editor"
                 style={{ background: "#3F3F3F",
                     width: "100%", height: "100%" }}>
                <div id="menubar">
                    <MenuBar/>
                </div>
                <div id="canvas">
                    <Canvas
                        actionList={this.state.actionList}
                        preview={this.state.preview}
                        selected={this.state.selected}
                        making={this.state.making}

                        changeSelected={this.changeSelected}
                        changeMaking={this.changeMaking}
                        changeActionList={this.changeActionList}/>
                </div>
                <div id="action-list">
                    <ActionList
                        actionList={this.state.actionList}
                        combinationState={this.state.combinationState}
                        combinationAction={this.state.combinationAction}

                        changeActionList={this.changeActionList}
                        changePreview={this.changePreview}
                        changeGroupState={this.changeGroupState}
                        changeCombinationState={this.changeCombinationState}
                        changeCombinationAction={this.changeCombinationAction}
                    />
                </div>
                <div id="operation-bar">
                    <OperationBar
                        actionList={this.state.actionList}
                        preview={this.state.preview}
                        selected={this.state.selected}
                        making={this.state.making}
                        groupState={this.state.groupState}
                        groupElement={this.state.groupElement}

                        changeElement={this.changeElement}
                        changeActionList={this.changeActionList}
                        changeSelected={this.changeSelected}
                        changeMaking={this.changeMaking}
                        changeGroupState={this.changeGroupState}
                        changeGroupElement={this.changeGroupElement}/>
                </div>
            </div>
        )
    }
}

export default Editor;
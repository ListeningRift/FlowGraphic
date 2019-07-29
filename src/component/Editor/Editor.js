import React from 'react';
import './Previewer.css';
import Menubar from './Menubar';
import ActionList from './ActionList';
import Operationbar from "./Operationbar";
import { NewAction } from "../../function/PromptAction";
import { Circle, Rect, Line, Ellipse } from "../../function/Structure/Shape";

let id = 0;

class Previewer extends React.Component {
    constructor(props) {
        super(props);
        const a = new Circle({cx: 500, cy: 500, r: 300});
        const b = new Rect({x: 300, y: 300, width: 100, height: 100});
        const c = new Line({x1: 50, y1: 30,x2: 500, y2: 300, stroke: "black"});
        this.state = {
            actionList: [[a, c], [b]],
            preview: undefined,
            selected: undefined,
        }
    }

    handleActionChange = k => {
      const actionList = this.state.actionList;
      this.setState({
          preview: actionList[k]
      })
    };

    remove = k => {
      let actionList = this.state.actionList;
      actionList.splice(k, 1);
      this.setState({
          actionList: actionList
      })
    };

    addNew = () => {
        const actionList = this.state.actionList;
        const newactionList = actionList.concat([[NewAction]]);
        this.setState({
            actionList: newactionList
        })
    };

    addSame = k => {
      let actionList = this.state.actionList;
      actionList.splice(k+1, 0, actionList[k]);
      this.setState({
          actionList: actionList
      })
    };

    select = element => {
        this.setState({
            selected: element
        })
    };

    unselect = () => {
        this.setState({
            selected: undefined
        })
    };

    readjust = (e, i) => {
        let { actionList, preview, selected } = this.state;
        const preIndex = actionList.indexOf(preview);
        const selIndex = preview.indexOf(selected);
        actionList[preIndex][selIndex][i] = e.target.value;
        this.setState({
            actionList: actionList
        })
    };

    addNewElement = (shape) => {
        let { actionList, preview } = this.state;
        const preIndex = actionList.indexOf(preview);
        let newelement;
        switch (shape) {
            case "Circle":newelement = new Circle({cx:0, cy:0, r:0});
            break;
            case "Rect":newelement = new Rect({x:0, y:0, width:0, height:0});
            break;
            case "Ellipse":newelement = new Ellipse({x:0, y:0, rx:0, ry:0});
            break;
            case "Line":newelement = new Line({x1:0, y1:0, x2:0, y2:0});
            break;
        }
        if (preview[0] !== NewAction) {
            preview.push(newelement);
        } else {
            preview[0] = newelement
        }
        actionList[preIndex] = preview;
        this.setState({
            actionList: actionList
        })
    };

    addSameElement = (element) => {
        let { actionList, preview } = this.state;
        const preIndex = actionList.indexOf(preview);
        preview.push(element);
        actionList[preIndex] = preview;
        this.setState({
            actionList: actionList
        })
    };

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
                        handleActionChange={this.handleActionChange}
                        addNew={this.addNew}
                        addSame={this.addSame}
                        remove={this.remove}
                    />
                </div>
                <div id="operation_bar">
                    <Operationbar element={this.state.preview} Selected={this.state.selected}
                    select={this.select} readjust={this.readjust}
                    addNewElement={this.addNewElement}
                    addSameElement={this.addSameElement}
                    removeElement={this.removeElement}/>
                </div>
            </div>
        )
    }
}

export default Previewer;
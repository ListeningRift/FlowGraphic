import React from "react";
import {Circle, Ellipse, Line, Rect, Text} from "../../../function/Element/BasicElement";

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // 画图时辅助作图的坐标
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,

            // 正在预览的动作
            preview: this.props.preview,

            // 是否开始绘制
            makeState: false
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            preview: nextProps.preview
        })
    }

    unselected = () => {
        if (this.props.making === "") {
            this.props.changeSelected(undefined)
        }
    };

    makeStart = e => {
        const { making } = this.props;
        if (making !== "") {
            const [x1, y1] = [e.nativeEvent.offsetX * 2, e.nativeEvent.offsetY * 2];
            console.log("Start:", x1, y1);

            let newElement;
            switch (this.props.making) {
                case "Circle":newElement = new Circle({cx:0, cy:0, r:0}, this.props.changeSelected);
                    break;
                case "Rect":newElement = new Rect({x:x1, y:y1, width:0, height:0}, this.props.changeSelected);
                    break;
                case "Ellipse":newElement = new Ellipse({cx:0, cy:0, rx:0, ry:0}, this.props.changeSelected);
                    break;
                case "Line":newElement = new Line({x1:x1, y1:y1, x2:x1, y2:y1, stroke:"black"}, this.props.changeSelected);
                    break;
                case "Text":newElement = new Text({x:x1, y:y1, content: "New"}, this.props.changeSelected);
                    break;
            }
            let { preview } = this.state;
            preview.push(newElement);
            this.props.changeSelected(newElement);
            this.setState({
                x1: x1,
                y1: y1,
                preview: preview,
                makeState: true
            })
        }
    };

    makeProcess = e => {
        const { makeState } = this.state;
        if (makeState) {
            const [x2, y2] = [e.nativeEvent.offsetX * 2, e.nativeEvent.offsetY * 2];

            let { preview } = this.state;
            const { x1, y1 } = this.state;
            const ind = preview.length - 1;

            const { making } = this.props;
            switch (making) {
                case "Circle":
                    const r = (x2 - x1) / 2 > (y2 - y1) / 2 ? (y2 - y1) / 2 : (x2 - x1) / 2;
                    preview[ind].draw(x1 + r, y1 + r, r);
                    break;
                case "Rect":
                    preview[ind].draw(x1, y1, x2 - x1, y2 - y1);
                    break;
                case "Ellipse":
                    const ry = (y2 - y1) / 2;
                    const rx = (x2 - x1) / 2;
                    preview[ind].draw(x1 + rx, y1 + rx, rx, ry);
                    break;
                case "Line":
                    preview[ind].draw(x1, y1, x2, y2);
                    break;
            }
            this.setState({
                x2: x2,
                y2: y2,
                preview: preview
            })
        }
    };

    makeEnd = e => {
        if (this.state.makeState) {
            this.props.changeMaking("");
            this.setState({
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                makeState: false
            })
        }
    };

    render() {
        const { selected } = this.props;
        const { preview } = this.state;
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
            <svg
                style={{ width: "100%", height: "100%" }}
                onClick={this.unselected}
                onMouseDown={(e) => this.makeStart(e)}
                onMouseMove={e => this.makeProcess(e)}
                onMouseUp={e => this.makeEnd(e)}>
                { editor }
            </svg>
        )
    }
}

export default Canvas;
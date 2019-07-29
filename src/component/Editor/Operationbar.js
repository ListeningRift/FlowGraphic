import React from "react";
import './Actionbar.css';

function Selector(props) {
    const selectorItem = props.child.map((shape) => (
        <div className="selector_item">{shape}</div>
    ));
    return (
        <div className="selector">
            <div className="selector_title">{props.title}</div>
            <div className="selector_items">
                { selectorItem }
            </div>
        </div>
    )
}

class Actionbar extends React.Component {
    constructor(props) {
        super(props)
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

    render() {
        return (
            <div id="operation">
                <div id="selectors">
                    <Selector title="Circle" child={this.choose("Circle")}/>
                    <Selector title="Rect" child={this.choose("Rect")}/>
                    <Selector title="Ellipse" child={this.choose("Ellipse")}/>
                    <Selector title="Line" child={this.choose("Line")}/>
                    <Selector title="Group" child={this.choose("Group")}/>
                </div>
                <div id="regulators">

                </div>
            </div>
        )
    }
}

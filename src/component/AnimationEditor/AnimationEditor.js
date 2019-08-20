import React from "react";
import { Tabs, Input, Select } from "antd";
import 'antd/dist/antd.css';
import '../../css/AnimationEditor/AnimationEditor.css';

const { TabPane } = Tabs;
const { Option } = Select;

function AttrInput(props) {
    return (
        <div className="attr_input">
            <div style={{ color: "#E7EAED" }}>{props.attr}</div>
            <Input onChange={props.setAnimation} allowClear size="default" />
        </div>)
}

function AttrSelect(props) {
    const { attributeNames } = props;
    const options = attributeNames.map(attributeName => (
        <Option value={attributeName}>{attributeName}</Option>
    ));
    return (
        <div id="attr_input">
            <div style={{ color: "#E7EAED" }}>{props.attr}</div>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={props.setAnimation}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
               { options }
            </Select>
        </div>
    )
}

function AttrInputs(props) {
    const { animation, title, attributeNames } = props;
    let attr;
    let items = [];
    for (attr in animation) {
        if (attr in title) {
            if (attr !== "attributeName") {
                items.push(<AttrInput attr={title[attr]} setAnimation={props.setAnimation}/>)
            }
            else {
                items.push(<AttrSelect attr={title[attr]} attributeNames={attributeNames} setAnimation={props.setAnimation}/>)
            }
        }
    }
    return (
        <div id="scale_animator">
            { items }
        </div>
    )
}

function ScaleAnimator(props) {
    const scaleTitle = {
        name: "动画名称",
        attributeName: "操作属性名",
        from: "From",
        to: "To",
        by: "By",
        values: "Values",
        begin: "起始",
        end: "终止",
        dur: "历经",
        keyTimes: "关键时间点",
        repeatCount: "重复次数",
        repeatDur: "重复时长",
        accumulate: "单一动画累加",
        additive: "多动画附加",
        restart: "重启方式"};
    const { selected } = props;
    let attributeNames;
    switch (selected.shape) {
        case "Circle": attributeNames = ["r"];
        break;
        case "Rect": attributeNames = ["width", "height"];
        break;
        case "Ellipse": attributeNames = ["rx", "ry"];
        break;
        case "Line": attributeNames = ["width", "length"];
        break;
        case "Text": attributeNames = ["font-size"];
        break;
    }
    return <AttrInputs setAnimation={props.setAnimation} title={scaleTitle} attributeNames={attributeNames}/>
}

class AnimationEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    setAnimation = value => {

    };

    render() {
        return (
            <div id="animation_editor">
                <div id="animation_operation">
                    <Tabs type="card">
                        <TabPane key="1" tab="缩放动画" style={{ color: "#E7EAED" }}>
                            <ScaleAnimator setAnimation={this.setAnimation}/>
                        </TabPane>
                        <TabPane key="2" tab="旋转动画" style={{ color: "#E7EAED" }}>
                            <p>Content of Tab Pane 2</p>
                            <p>Content of Tab Pane 2</p>
                            <p>Content of Tab Pane 2</p>
                        </TabPane>
                        <TabPane key="3" tab="位移动画" style={{ color: "#E7EAED" }}>
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                        </TabPane>
                        <TabPane key="4" tab="倾斜动画" style={{ color: "#E7EAED" }}>
                            <p>Content of Tab Pane 4</p>
                            <p>Content of Tab Pane 4</p>
                            <p>Content of Tab Pane 4</p>
                        </TabPane>
                        <TabPane key="5" tab="颜色动画" style={{ color: "#E7EAED" }}>
                            <p>Content of Tab Pane 5</p>
                            <p>Content of Tab Pane 5</p>
                            <p>Content of Tab Pane 5</p>
                        </TabPane>
                    </Tabs>
                </div>
                <div id="animation_preview">

                </div>
            </div>
        )
    }
}

export default AnimationEditor;
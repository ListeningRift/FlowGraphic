import React from "react";
import { Button, Tabs, Tag } from "antd";

const { TabPane } = Tabs;
const { CheckableTag } = Tag;

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
        selected.previewAnimate = selected.previewAnimate.concat(selectedAnimation);
        this.props.changeElement(selected);
    };

    stop = () => {
        let { selected } = this.props;
        selected.previewAnimate = [];
        this.props.changeElement(selected);
    };

    render() {
        const { selected } = this.props;
        const { selectedAnimation } = this.state;
        const allAnimationTag = selected && selected.allAnimate ? selected.allAnimate.map(animation => (
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
                                    onClick={() => this.stop()}>停止</Button>
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

export default Animator;
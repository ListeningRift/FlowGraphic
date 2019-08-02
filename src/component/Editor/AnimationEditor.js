import React from "react";
import { Tabs } from "antd";
import '../../css/AnimationEditor.css';

const { TabPane } = Tabs;

class AnimationEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="animation_editor">
                <div id="animation_operation">

                </div>
                <div id="animation_preview">

                </div>
            </div>
        )
    }
}
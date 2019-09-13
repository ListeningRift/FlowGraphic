import React from "react";
import { Icon } from "antd";
import '../css/ElementEditor/ElementEditor.css';

class ElementEditor extends React.Component {
    state = {
        workState: true
    };

    changeWorkStation = () => {
        this.setState({
            workState: !this.state.workState
        })
    };

    render() {
        const { workState } = this.state;
        return (
            <div style={{ width: "100%", height: "100%", backgroundColor: "#3F3F3F" }}>
                <div id="work-station-switch" onClick={this.changeWorkStation}
                     style={{ right: workState ? "35%" : 0 }}>
                    {
                        workState ?
                            <Icon type="menu-unfold" style={{ color: "#E7EAED", fontSize: 25 }}/> :
                            <Icon type="menu-fold"  style={{ color: "#E7EAED", fontSize: 25 }}/>
                    }
                </div>
                <div id="work-station" style={{ width: workState ? "35%" : 0 }}>

                </div>
                div#previewer
            </div>
        )
    }
}

export default ElementEditor;

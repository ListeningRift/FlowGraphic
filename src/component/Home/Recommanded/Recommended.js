import React from "react";
import CardField from "./CardField";
import '../../../css/Home/Recommanded.css';

class Recommended extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CardField title="推荐"/>
                <CardField title="我的"/>
            </div>
        )
    }
}

export default Recommended;
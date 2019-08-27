import React from "react";
import CardField from "../CardField/CardField";
import '../../../css/Home/CardField.css';

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
import React from "react";

function Regulator(props) {
    const { selected } = props;
    let [result, j] = [[], 0];
    const undisplayed = ["shape", "elements", "allAnimate", "previewAnimate", "onclick", "onClick"];
    for (let attribute in selected) {
        if (undisplayed.indexOf(attribute) < 0) {
            result[j++] = (
                <div className="regulator">
                    <div className="regulator_title">{ attribute }</div>
                    <div className="regulator_window">
                        <input className="regulator_input" value={selected[attribute]}
                               onChange={(event) => props.readjust(event, attribute)}/>
                    </div>
                </div>
            );
        }
    }
    return result
}

export default Regulator;
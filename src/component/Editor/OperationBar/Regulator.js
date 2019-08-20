import React from "react";

function Regulator(props) {
    const { selected } = props;
    let [result, j] = [[], 0];
    const undisplayed = ["shape", "elements", "allAnimate", "previewAnimate"];
    for (let i in selected) {
        if (undisplayed.indexOf(i) < 0) {
            result[j++] = (
                <div className="regulator">
                    <div className="regulator_title">{ i }</div>
                    <div className="regulator_window">
                        <input className="regulator_input" value={selected[i]}
                               onChange={(event) => props.readjust(event, i)}/>
                    </div>
                </div>
            );
        }
    }
    return result
}

export default Regulator;
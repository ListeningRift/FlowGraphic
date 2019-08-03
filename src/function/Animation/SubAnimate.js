import React from "react";
import {Animate} from './AnimateTag';

function getID() {
    const x = new Date().getTime();
    let id = String(x).replace(/0/g, "a");
    id = id.replace(/1/g, "b");
    id = id.replace(/2/g, "c");
    id = id.replace(/3/g, "d");
    id = id.replace(/4/g, "e");
    id = id.replace(/5/g, "f");
    id = id.replace(/6/g, "g");
    id = id.replace(/7/g, "h");
    id = id.replace(/8/g, "i");
    id = id.replace(/9/g, "j");
    return id
}

function ScaleTransform(shape, category,
                        {name, attributeName,
                            from, to, values, by,
                            begin, end, dur,
                            calcMode, keyTimes, keySplines,
                            repeatCount, repeatDur, fill,
                            accumulate, additive, restart}) {
    if (shape === "Circle") {
        return new Animate({
            name, id: getID(), attributeName: "r",
            from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
            repeatCount, repeatDur, fill, accumulate, additive, restart
        })
    }
    else if (shape === "Text") {
        return new Animate({
            name, id: getID(), attributeName: "font-size",
            from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
            repeatCount, repeatDur, fill, accumulate, additive, restart
        })
    }
    else if (shape === "Rect") {
        if (category === "single") {
            return new Animate({
                name, id: getID(), attributeName,
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            })
        }
        else {
            return [new Animate({
                name, id: getID(), attributeName: "width",
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            }), new Animate({
                    name, id: getID(), attributeName: "height",
                    from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                    repeatCount, repeatDur, fill, accumulate, additive, restart
                })]
        }
    }
    else if (shape === "Ellipse") {
        if (category === "single") {
            return new Animate({
                name, id: getID(), attributeName,
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            })
        }
        else {
            return [new Animate({
                name, id: getID(), attributeName: "rx",
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            }), new Animate({
                name, id: getID(), attributeName: "ry",
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            })]
        }
    }
    else if (shape === "Line") {
        if (category === "single") {
            return new Animate({
                name, id: getID(), attributeName,
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            })
        }
        else {
            return [new Animate({
                name, id: getID(), attributeName: "width",
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            }), new Animate({
                name, id: getID(), attributeName: "height",
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            })]
        }
    }
}
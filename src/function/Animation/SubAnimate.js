import React from "react";
import {Animate, AnimateMotion, AnimateTransform} from './AnimateTag';

function ScaleAnimation(shape, category,
                        {name, attributeName,
                            from, to, values, by,
                            begin, end, dur,
                            calcMode, keyTimes, keySplines,
                            repeatCount, repeatDur, fill,
                            accumulate, additive, restart}) {
    const id = getID();
    if (shape === "Circle") {
        return [new Animate({
            name, id, attributeName: "r",
            from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
            repeatCount, repeatDur, fill, accumulate, additive, restart
        })]
    }
    else if (shape === "Text") {
        return [new Animate({
            name, id, attributeName: "font-size",
            from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
            repeatCount, repeatDur, fill, accumulate, additive, restart
        })]
    }
    else if (shape === "Rect") {
        if (category === "single") {
            return [new Animate({
                name, id, attributeName,
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            })]
        }
        else {
            return [new Animate({
                name, id, attributeName: "width",
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            }), new Animate({
                    name, id, attributeName: "height",
                    from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                    repeatCount, repeatDur, fill, accumulate, additive, restart
                })]
        }
    }
    else if (shape === "Ellipse") {
        if (category === "single") {
            return [new Animate({
                name, id, attributeName,
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            })]
        }
        else {
            return [new Animate({
                name, id, attributeName: "rx",
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            }), new Animate({
                name, id, attributeName: "ry",
                from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
                repeatCount, repeatDur, fill, accumulate, additive, restart
            })]
        }
    }
    else if (shape === "Line") {
        return [new Animate({
            name, id, attributeName,
            from, to, values, by, begin, end, dur, calcMode, keyTimes, keySplines,
            repeatCount, repeatDur, fill, accumulate, additive, restart
        })]
    }
}

function TranslateAnimation({name,
                                path, rotate,
                                begin, end, dur,
                                calcMode, keyTimes, keyPoints,
                                repeatCount, repeatDur, fill,
                                accumulate, additive, restart}) {
    return [new AnimateMotion({name, id: getID(),
        path, rotate,
        begin, end, dur,
        calcMode, keyTimes, keyPoints,
        repeatCount, repeatDur, fill,
        accumulate, additive, restart})]
}

function RotateAnimation({name,
                             from, to, values, by,
                             begin, end, dur,
                             calcMode, keyTimes, keySplines,
                             repeatCount, repeatDur, fill,
                             accumulate, additive, restart}) {
    return [new AnimateTransform({name, id: getID(), type: "rotate",
        from, to, values, by,
        begin, end, dur,
        calcMode, keyTimes, keySplines,
        repeatCount, repeatDur, fill,
        accumulate, additive, restart})]
}

function SkewAnimation(category, {name,
                                from, to, values, by,
                                begin, end, dur,
                                keyTimes, keySplines,
                                repeatCount, repeatDur, fill,
                                accumulate, additive, restart}) {
    let type;
    if (category === "X") {
        type = "skewX";
    }
    else {
        type = "skewY";
    }
    return [new AnimateTransform({
        name, id: getID(), type,
        from, to, values, by,
        begin, end, dur,
        keyTimes, keySplines,
        repeatCount, repeatDur, fill,
        accumulate, additive, restart
    })]
}
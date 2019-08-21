import React from 'react';

class Animate {
    constructor({name, id, attributeName,
        from, to, values, by, 
        begin, end, dur,
        keyTimes, keySplines,
        repeatCount, repeatDur, fill, 
        accumulate, additive, restart}) {
        this.name = name;
        this.id = id;

        this.attributeName = attributeName;
        this.attributeType = "auto";

        this.from = from;
        this.to = to;
        this.values = values;
        this.by = by;

        this.begin = begin;
        this.end = end;
        this.dur = dur;

        this.keyTimes = keyTimes;
        this.keySplines = keySplines;

        this.repeatCount = repeatCount;
        this.repeatDur = repeatDur;
        this.fill = fill;

        this.accumulate = accumulate;
        this.additive = additive;
        this.restart = restart;
    }

    result() {
        return <animate id={this.id} 
        attributeName={this.attributeName} attributeType={this.attributeType}
        from={this.from} to={this.to} values={this.values} by={this.by}
        begin={this.begin} end={this.end} dur={this.dur}
        keyTimes={this.keyTimes} keySplines={this.keySplines}
        repeatCount={this.repeatCount} repeatDur={this.repeatDur} fill={this.fill}
        accumulate={this.accumulate} additive={this.additive} restart={this.restart}/>
    }

    editor() {
        const values = this.values ? this.values.map((value) => {
            return value * 0.5
        }).join("; ") : null;
        return <animate id={this.id} 
        attributeName={this.attributeName} attributeType={this.attributeType}
        from={this.from * 0.5} to={this.to * 0.5} values={values} by={this.by * 0.5}
        begin={this.begin} end={this.end} dur={this.dur} 
        keyTimes={this.keyTimes} keySplines={this.keySplines}
        repeatCount={this.repeatCount} repeatDur={this.repeatDur} fill={this.fill}
        accumulate={this.accumulate} additive={this.additive} restart={this.restart}/>
    }
}

class AnimateTransform {
    constructor({name, id, type,
        from, to, values, by,
        begin, end, dur,
        keyTimes, keySplines,
        repeatCount, repeatDur, fill,
        accumulate, additive, restart}) {
        this.name = name;
        this.id = id;

        this.attributeName = "transform";
        this.attributeType = "XML";
        this.type = type;

        this.from = from;
        this.to = to;
        this.values = values;
        this.by = by;

        this.begin = begin;
        this.end = end;
        this.dur = dur;

        this.keyTimes = keyTimes;
        this.keySplines = keySplines;

        this.repeatCount = repeatCount;
        this.repeatDur = repeatDur;
        this.fill = fill;

        this.accumulate = accumulate;
        this.additive = additive;
        this.restart = restart;
    }

    result() {
        return <animateTransform id={this.id}
                        attributeName={this.attributeName} attributeType={this.attributeType} type={this.type}
                        from={this.from} to={this.to} values={this.values} by={this.by}
                        begin={this.begin} end={this.end} dur={this.dur}
                        keyTimes={this.keyTimes} keySplines={this.keySplines}
                        repeatCount={this.repeatCount} repeatDur={this.repeatDur} fill={this.fill}
                        accumulate={this.accumulate} additive={this.additive} restart={this.restart}/>
    }

    editor() {
        const values = this.values ? this.values.map((value) => {
            return value * 0.5
        }).join("; ") : null;
        return <animateTransform id={this.id}
                        attributeName={this.attributeName} attributeType={this.attributeType} type={this.type}
                        from={this.from * 0.5} to={this.to * 0.5} values={values} by={this.by * 0.5}
                        begin={this.begin} end={this.end} dur={this.dur}
                        keyTimes={this.keyTimes} keySplines={this.keySplines}
                        repeatCount={this.repeatCount} repeatDur={this.repeatDur} fill={this.fill}
                        accumulate={this.accumulate} additive={this.additive} restart={this.restart}/>
    }
}

class AnimateMotion {
    constructor({name, id,
        path, rotate,
        begin, end, dur,
        calcMode, keyTimes, keyPoints,
        repeatCount, repeatDur, fill,
        accumulate, additive, restart}) {
        this.name = name;
        this.id = id;

        this.path = path;
        this.rotate = rotate;

        this.begin = begin;
        this.end = end;
        this.dur = dur;

        this.calcMode = calcMode;
        this.keyTimes = keyTimes;
        this.keyPoints = keyPoints;

        this.repeatCount = repeatCount;
        this.repeatDur = repeatDur;
        this.fill = fill;

        this.accumulate = accumulate;
        this.additive = additive;
        this.restart = restart;
    }

    result() {
        return <animateMotion id={this.id}
                        path={this.path} rotate={this.rotate}
                        begin={this.begin} end={this.end} dur={this.dur}
                        calcMode={this.calcMode} keyTimes={this.keyTimes} keySplines={this.keyPoints}
                        repeatCount={this.repeatCount} repeatDur={this.repeatDur} fill={this.fill}
                        accumulate={this.accumulate} additive={this.additive} restart={this.restart}/>
    }

    editor() {
        return <animateMotion id={this.id}
                        path={this.path} rotate={this.rotate}
                        begin={this.begin} end={this.end} dur={this.dur}
                        calcMode={this.calcMode} keyTimes={this.keyTimes} keySplines={this.keyPoints}
                        repeatCount={this.repeatCount} repeatDur={this.repeatDur} fill={this.fill}
                        accumulate={this.accumulate} additive={this.additive} restart={this.restart}/>
    }
}

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

export { Animate, AnimateMotion, AnimateTransform, getID };
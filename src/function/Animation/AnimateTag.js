import React from 'react';

class Animate {
    constructor({name, id, attributeName,
        from, to, values, by, 
        begin, end, dur, 
        calcMode, keyTimes, keySplines,
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

        this.calcMode = calcMode;
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
        calcMode={this.calcMode} keyTimes={this.keyTimes} keySplines={this.keySplines}
        repeatCount={this.repeatCount} repeatDur={this.repeatDur} fill={this.fill}
        accumulate={this.accumulate} additive={this.additive} restart={this.restart}/>
    }

    editor() {
        const values = this.values.map((value) => {
            return value * 0.5
        });
        return <animate id={this.id} 
        attributeName={this.attributeName} attributeType={this.attributeType}
        from={this.from * 0.5} to={this.to * 0.5} values={values} by={this.by * 0.5}
        begin={this.begin} end={this.end} dur={this.dur} 
        calcMode={this.calcMode} keyTimes={this.keyTimes} keySplines={this.keySplines}
        repeatCount={this.repeatCount} repeatDur={this.repeatDur} fill={this.fill}
        accumulate={this.accumulate} additive={this.additive} restart={this.restart}/>
    }
}

class AnimateTransform {
    constructor({name, id, type,
        from, to, values, by,
        begin, end, dur,
        calcMode, keyTimes, keySplines,
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

        this.calcMode = calcMode;
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
                        calcMode={this.calcMode} keyTimes={this.keyTimes} keySplines={this.keySplines}
                        repeatCount={this.repeatCount} repeatDur={this.repeatDur} fill={this.fill}
                        accumulate={this.accumulate} additive={this.additive} restart={this.restart}/>
    }

    editor() {
        const values = this.values.map((value) => {
            return value * 0.5
        });
        return <animateTransform id={this.id}
                        attributeName={this.attributeName} attributeType={this.attributeType} type={this.type}
                        from={this.from * 0.5} to={this.to * 0.5} values={values} by={this.by * 0.5}
                        begin={this.begin} end={this.end} dur={this.dur}
                        calcMode={this.calcMode} keyTimes={this.keyTimes} keySplines={this.keySplines}
                        repeatCount={this.repeatCount} repeatDur={this.repeatDur} fill={this.fill}
                        accumulate={this.accumulate} additive={this.additive} restart={this.restart}/>
    }
}

class AnimateMotion {
    constructor({name, id,
        path, rotate,
        from, to, values, by,
        begin, end, dur,
        calcMode, keyTimes, keySplines,
        repeatCount, repeatDur, fill,
        accumulate, additive, restart}) {
        this.name = name;
        this.id = id;

        this.path = path;
        this.rotate = rotate;

        this.from = from;
        this.to = to;
        this.values = values;
        this.by = by;

        this.begin = begin;
        this.end = end;
        this.dur = dur;

        this.calcMode = calcMode;
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
        return <animateMotion id={this.id}
                        path={this.path} rotate={this.rotate}
                        from={this.from} to={this.to} values={this.values} by={this.by}
                        begin={this.begin} end={this.end} dur={this.dur}
                        calcMode={this.calcMode} keyTimes={this.keyTimes} keySplines={this.keySplines}
                        repeatCount={this.repeatCount} repeatDur={this.repeatDur} fill={this.fill}
                        accumulate={this.accumulate} additive={this.additive} restart={this.restart}/>
    }

    editor() {
        const values = this.values.map((value) => {
            return value * 0.5
        });
        return <animateMotion id={this.id}
                        path={this.path} rotate={this.rotate}
                        from={this.from * 0.5} to={this.to * 0.5} values={values} by={this.by * 0.5}
                        begin={this.begin} end={this.end} dur={this.dur}
                        calcMode={this.calcMode} keyTimes={this.keyTimes} keySplines={this.keySplines}
                        repeatCount={this.repeatCount} repeatDur={this.repeatDur} fill={this.fill}
                        accumulate={this.accumulate} additive={this.additive} restart={this.restart}/>
    }
}

export { Animate, AnimateMotion, AnimateTransform };
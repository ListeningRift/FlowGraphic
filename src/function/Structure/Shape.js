// 构造各种形状元素
import React from 'react';
import Selectbox from "./Selectedbox";

class Circle {
    constructor({cx, cy, r, stroke, strokewidth, strokeopacity, fill, fillopacity}) {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.stroke = stroke;
        this.strokewidth = strokewidth;
        this.strokeopacity = strokeopacity;
        this.fill = fill;
        this.fillopacity = fillopacity;
        this.shape = "Circle";
    }

    result() {
        return <circle cx={this.cx} cy={this.cy} r={this.r}
                       stroke={this.stroke} strokeWidth={this.strokewidth} strokeOpacity={this.strokeopacity}
                       fill={this.fill} fillOpacity={this.fillopacity}/>
    }

    editor() {
        return <circle cx={this.cx * 0.5} cy={this.cy * 0.5} r={this.r * 0.5}
                       stroke={this.stroke} strokeWidth={this.strokewidth * 0.5} strokeOpacity={this.strokeopacity}
                       fill={this.fill} fillOpacity={this.fillopacity}/>
    }

    list() {
        return <circle cx={this.cx * 0.12} cy={this.cy * 0.12} r={this.r * 0.12}
                       stroke={this.stroke} strokeWidth={this.strokewidth * 0.12} strokeOpacity={this.strokeopacity}
                       fill={this.fill} fillOpacity={this.fillopacity}/>
    }

    selected() {
        return (
            <g>
                {this.editor()}
                <Selectbox x={(this.cx - this.r) * 0.5} y={(this.cy - this.r) * 0.5}
                           width={this.r} height={this.r}/>
            </g>
        )
    }
}

class Rect {
    constructor({x, y, width, height, stroke, strokewidth, strokeopacity, fill, fillopacity}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.stroke = stroke;
        this.strokewidth = strokewidth;
        this.strokeopacity = strokeopacity;
        this.fill = fill;
        this.fillopacity = fillopacity;
        this.shape = "Rect";
    }

    result() {
        return <rect x={this.x} y={this.y} width={this.width} height={this.height}
                     stroke={this.stroke} strokeWidth={this.strokewidth} strokeOpacity={this.strokeopacity}
                     fill={this.fill} fillOpacity={this.fillopacity}/>
    }
    
    editor() {
        return <rect x={this.x * 0.5} y={this.y * 0.5} width={this.width * 0.5} height={this.height * 0.5}
                     stroke={this.stroke} strokeWidth={this.strokewidth * 0.5} strokeOpacity={this.strokeopacity}
                     fill={this.fill} fillOpacity={this.fillopacity}/>
    }
    
    list() {
        return <rect x={this.x * 0.12} y={this.y * 0.12} width={this.width * 0.12} height={this.height * 0.12}
                     stroke={this.stroke} strokeWidth={this.strokewidth * 0.12} strokeOpacity={this.strokeopacity}
                     fill={this.fill} fillOpacity={this.fillopacity}/>
    }

    selected() {
        return (
            <g>
                {this.editor()}
                <Selectbox x={this.x * 0.5} y={this.y * 0.5}
                           width={this.width * 0.5} height={this.height * 0.5}/>
            </g>
        )
    }
}

class Ellipse {
    constructor({cx, cy, rx, ry, stroke, strokewidth, strokeopacity, fill, fillopacity}) {
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
        this.stroke = stroke;
        this.strokewidth = strokewidth;
        this.strokeopacity = strokeopacity;
        this.fill = fill;
        this.fillopacity = fillopacity;
        this.shape = "Ellipse";
    }

    result() {
        return <ellipse cx={this.cx} cy={this.cy} rx={this.rx} ry={this.ry}
                     stroke={this.stroke} strokeWidth={this.strokewidth} strokeOpacity={this.strokeopacity}
                     fill={this.fill} fillOpacity={this.fillopacity}/>
    }

    editor() {
        return <ellipse cx={this.cx * 0.5} cy={this.cy * 0.5} rx={this.rx * 0.5} ry={this.ry * 0.5}
                     stroke={this.stroke} strokeWidth={this.strokewidth * 0.5} strokeOpacity={this.strokeopacity}
                     fill={this.fill} fillOpacity={this.fillopacity}/>
    }

    list() {
        return <ellipse cx={this.cx * 0.12} cy={this.cy * 0.12} rx={this.rx * 0.12} ry={this.ry * 0.12}
                     stroke={this.stroke} strokeWidth={this.strokewidth * 0.12} strokeOpacity={this.strokeopacity}
                     fill={this.fill} fillOpacity={this.fillopacity}/>
    }

    selected() {
        return (
            <g>
                {this.editor()}
                <Selectbox x={(this.cx - this.rx) * 0.5} y={(this.cy - this.ry) * 0.5}
                           width={this.rx} height={this.ry}/>
            </g>
        )
    }
}

class Line {
    constructor({x1, y1, x2, y2, stroke, strokewidth, strokeopacity}) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.stroke = stroke;
        this.strokewidth = strokewidth;
        this.strokeopacity = strokeopacity;
        this.shape = "Line";
    }

    result() {
        return <line x1={this.x1} y1={this.y1} x2={this.x2} y2={this.y2}
                     stroke={this.stroke} strokeWidth={this.strokewidth} strokeOpacity={this.strokeopacity}/>
    }

    editor() {
        return <line x1={this.x1 * 0.5} y1={this.y1 * 0.5} x2={this.x2 * 0.5} y2={this.y2 * 0.5}
                     stroke={this.stroke} strokeWidth={this.strokewidth * 0.5} strokeOpacity={this.strokeopacity}/>
    }

    list() {
        return <line x1={this.x1 * 0.12} y1={this.y1 * 0.12} x2={this.x2 * 0.12} y2={this.y2 * 0.12}
                     stroke={this.stroke} strokeWidth={this.strokewidth * 0.12} strokeOpacity={this.strokeopacity}/>
    }

    selected() {
        return (
            <g>
                {this.editor()}
                <Selectbox x={Math.min(this.x1, this.x2) * 0.5} y={Math.min(this.y1, this.y2) * 0.5}
                           width={Math.abs(this.x1 - this.x2) * 0.5} height={Math.abs(this.y1 - this.y2) * 0.5}/>
            </g>
        )
    }
}

export { Circle, Rect, Ellipse, Line };
// 构造各种形状元素
import React from 'react';
import SelectBox from "./SelectedBox";

class Circle {
    constructor({cx, cy, r, stroke, strokeWidth, strokeOpacity, fill, fillOpacity}) {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.strokeOpacity = strokeOpacity;
        this.fill = fill;
        this.fillOpacity = fillOpacity;
        this.shape = "Circle";
    }

    result(animate) {
        return <circle cx={this.cx} cy={this.cy} r={this.r}
                       stroke={this.stroke} strokeWidth={this.strokeWidth} strokeOpacity={this.strokeOpacity}
                       fill={this.fill} fillOpacity={this.fillOpacity}>
                        {
                            animate !== undefined ? (animate.map(animate => animate.result())) : null
                        }
                       </circle>
    }

    editor(animate) {
        return <circle cx={this.cx * 0.5} cy={this.cy * 0.5} r={this.r * 0.5}
                       stroke={this.stroke} strokeWidth={this.strokeWidth * 0.5} strokeOpacity={this.strokeOpacity}
                       fill={this.fill} fillOpacity={this.fillOpacity}>
                        {
                            animate !== undefined ? (animate.map(animate => animate.editor())) : null
                        }
                       </circle>
    }

    list() {
        return <circle cx={this.cx * 0.128} cy={this.cy * 0.128} r={this.r * 0.128}
                       stroke={this.stroke} strokeWidth={this.strokeWidth * 0.128} strokeOpacity={this.strokeOpacity}
                       fill={this.fill} fillOpacity={this.fillOpacity}/>
    }

    selected() {
        return (
            <g>
                {this.editor()}
                <SelectBox x={(this.cx - this.r) * 0.5} y={(this.cy - this.r) * 0.5}
                           width={this.r} height={this.r}/>
            </g>
        )
    }
}

class Rect {
    constructor({x, y, width, height, stroke, strokeWidth, strokeOpacity, fill, fillOpacity}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.strokeOpacity = strokeOpacity;
        this.fill = fill;
        this.fillOpacity = fillOpacity;
        this.shape = "Rect";
    }

    result(animate) {
        return <rect x={this.x} y={this.y} width={this.width} height={this.height}
                     stroke={this.stroke} strokeWidth={this.strokeWidth} strokeOpacity={this.strokeOpacity}
                     fill={this.fill} fillOpacity={this.fillOpacity}>
                    {
                        animate !== undefined ? (animate.map(animate => animate.result())) : null
                    }
                     </rect>
    }
    
    editor(animate) {
        return <rect x={this.x * 0.5} y={this.y * 0.5} width={this.width * 0.5} height={this.height * 0.5}
                     stroke={this.stroke} strokeWidth={this.strokeWidth * 0.5} strokeOpacity={this.strokeOpacity}
                     fill={this.fill} fillOpacity={this.fillOpacity}>
                    {
                        animate !== undefined ? (animate.map(animate => animate.editor())) : null
                    }
                     </rect>
    }
    
    list() {
        return <rect x={this.x * 0.128} y={this.y * 0.128} width={this.width * 0.128} height={this.height * 0.128}
                     stroke={this.stroke} strokeWidth={this.strokeWidth * 0.128} strokeOpacity={this.strokeOpacity}
                     fill={this.fill} fillOpacity={this.fillOpacity}/>
    }

    selected() {
        return (
            <g>
                {this.editor()}
                <SelectBox x={this.x * 0.5} y={this.y * 0.5}
                           width={this.width * 0.5} height={this.height * 0.5}/>
            </g>
        )
    }
}

class Ellipse {
    constructor({cx, cy, rx, ry, stroke, strokeWidth, strokeOpacity, fill, fillOpacity}) {
        this.cx = cx;
        this.cy = cy;
        this.rx = rx;
        this.ry = ry;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.strokeOpacity = strokeOpacity;
        this.fill = fill;
        this.fillOpacity = fillOpacity;
        this.shape = "Ellipse";
    }

    result(animate) {
        return <ellipse cx={this.cx} cy={this.cy} rx={this.rx} ry={this.ry}
                     stroke={this.stroke} strokeWidth={this.strokeWidth} strokeOpacity={this.strokeOpacity}
                     fill={this.fill} fillOpacity={this.fillOpacity}>
                    {
                        animate !== undefined ? (animate.map(animate => animate.result())) : null
                    }
                     </ellipse>
    }

    editor(animate) {
        return <ellipse cx={this.cx * 0.5} cy={this.cy * 0.5} rx={this.rx * 0.5} ry={this.ry * 0.5}
                     stroke={this.stroke} strokeWidth={this.strokeWidth * 0.5} strokeOpacity={this.strokeOpacity}
                     fill={this.fill} fillOpacity={this.fillOpacity}>
                    {
                        animate !== undefined ? (animate.map(animate => animate.editor())) : null
                    }
                     </ellipse>
    }

    list() {
        return <ellipse cx={this.cx * 0.128} cy={this.cy * 0.128} rx={this.rx * 0.128} ry={this.ry * 0.128}
                     stroke={this.stroke} strokeWidth={this.strokeWidth * 0.12} strokeOpacity={this.strokeOpacity}
                     fill={this.fill} fillOpacity={this.fillOpacity}/>
    }

    selected() {
        return (
            <g>
                {this.editor()}
                <SelectBox x={(this.cx - this.rx) * 0.5} y={(this.cy - this.ry) * 0.5}
                           width={this.rx} height={this.ry}/>
            </g>
        )
    }
}

class Line {
    constructor({x1, y1, x2, y2, stroke, strokeWidth, strokeOpacity}) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.strokeOpacity = strokeOpacity;
        this.shape = "Line";
    }

    result(animate) {
        return <line x1={this.x1} y1={this.y1} x2={this.x2} y2={this.y2}
                     stroke={this.stroke} strokeWidth={this.strokeWidth} strokeOpacity={this.strokeOpacity}>
                    {
                        animate !== undefined ? (animate.map(animate => animate.result())) : null
                    }
                     </line>
    }

    editor() {
        return <line x1={this.x1 * 0.5} y1={this.y1 * 0.5} x2={this.x2 * 0.5} y2={this.y2 * 0.5}
                     stroke={this.stroke} strokeWidth={this.strokeWidth * 0.5} strokeOpacity={this.strokeOpacity}/>
    }

    list() {
        return <line x1={this.x1 * 0.128} y1={this.y1 * 0.128} x2={this.x2 * 0.128} y2={this.y2 * 0.128}
                     stroke={this.stroke} strokeWidth={this.strokeWidth * 0.12} strokeOpacity={this.strokeOpacity}/>
    }

    selected() {
        return (
            <g>
                {this.editor()}
                <SelectBox x={Math.min(this.x1, this.x2) * 0.5} y={Math.min(this.y1, this.y2) * 0.5}
                           width={Math.abs(this.x1 - this.x2) * 0.5} height={Math.abs(this.y1 - this.y2) * 0.5}/>
            </g>
        )
    }
}

class Text {
    constructor({x, y,
                fontSize,
                fill, fillOpacity,
                transform,
                stroke, strokeWidth, strokeOpacity}) {
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.fill = fill;
        this.fillOpacity = fillOpacity;
        this.transform = transform;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.strokeOpacity = strokeOpacity;
    }

    result(animate) {
        return <text x={this.x} y={this.y}
                     fontSize={this.fontSize}
                     fill={this.fill} fillOpacity={this.fillOpacity}
                     stroke={this.stroke} strokeWidth={this.strokeWidth} strokeOpacity={this.strokeOpacity}>
                    {
                        animate ? (animate.map(animate => animate.result())) : null
                    }
            </text>
    }

    editor(animate) {
        return <text x={this.x * 0.5} y={this.y * 0.5}
                     fontSize={this.fontSize * 0.5}
                     fill={this.fill} fillOpacity={this.fillOpacity}
                     stroke={this.stroke} strokeWidth={this.strokeWidth * 0.5} strokeOpacity={this.strokeOpacity}>
                    {
                        animate ? (animate.map(animate => animate.editor())) : null
                    }
        </text>
    }

    list() {
        return <text x={this.x * 0.128} y={this.y * 0.128}
                     fontSize={this.fontSize}
                     fill={this.fill} fillOpacity={this.fillOpacity}
                     stroke={this.stroke} strokeWidth={this.strokeWidth * 0.128} strokeOpacity={this.strokeOpacity}/>
    }

    selected() {
        return (
            <g>
                {this.editor()}
                <SelectBox x={this.x * 0.5} y={this.y * 0.5}
                           width={30} height={30}/>
            </g>
        )
    }
}

export { Circle, Rect, Ellipse, Line, Text };
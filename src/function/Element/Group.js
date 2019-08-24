import React from "react";

class Group {
    constructor(elements) {
        this.elements = elements;
        this.shape = "Group"
    }

    result() {
        return (
            <g>
                {this.elements.map(child => child.result())}
            </g>
        )
    }

    editor() {
        return (
            <g>
                {this.elements.map(child => child.editor())}
            </g>
        )
    }

    list() {
        return (
            <g>
                {this.elements.map(child => child.list())}
            </g>
        )
    }

    selected() {
        return (
            <g>
                {this.elements.map(child => child.selected())}
            </g>
        )
    }
}

export default Group;
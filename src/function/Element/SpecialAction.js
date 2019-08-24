import React from 'react';

class SpecialAction {
    constructor(prompt) {
        this.prompt = prompt;
    }

    result() {
        return <text textAnchor="middle" dominantBaseline="middle" x="50%" y="50%"
                     fontSize="800%" fill="#B3B3B3">{this.prompt}</text>
    }

    editor() {
        return <text textAnchor="middle" dominantBaseline="middle" x="50%" y="50%"
                     fontSize="400%" fill="#B3B3B3">{this.prompt}</text>
    }

    list() {
        return <text textAnchor="middle" dominantBaseline="middle" x="50%" y="50%"
                     fontSize="96%" fill="#B3B3B3">{this.prompt}</text>
    }
}

const NewAction = new SpecialAction("New");

export { NewAction, SpecialAction };
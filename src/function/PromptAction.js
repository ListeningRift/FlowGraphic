import React from 'react';

class PromptAction {
    constructor(prompt) {
        this.prompt = prompt;
    }

    result() {
        return <text text-anchor="middle" dominant-baseline="middle" x="50%" y="50%"
                     fontSize="800%" fill="#B3B3B3">{this.prompt}</text>
    }

    editor() {
        return <text text-anchor="middle" dominant-baseline="middle" x="50%" y="50%"
                     fontSize="400%" fill="#B3B3B3">{this.prompt}</text>
    }

    list() {
        return <text text-anchor="middle" dominant-baseline="middle" x="50%" y="50%"
                     fontSize="96%" fill="#B3B3B3">{this.prompt}</text>
    }
}

const NewAction = new PromptAction("New");

export { NewAction };
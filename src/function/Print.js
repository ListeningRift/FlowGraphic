
function PrintCover(actionList) {
    actionList.map(action => action.map(element => element.cover()))
}


function PrintResult(actionList) {
    actionList.map(action => action.map(element => element.cover()))
}


export { PrintCover, PrintResult }
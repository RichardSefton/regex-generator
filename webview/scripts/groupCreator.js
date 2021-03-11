const makeGroupContainer = () => {
    const group = document.createElement("div");
    group.className = "regexGroupArea";
    return group
}

const makeContainer = () => {
    const newGroupContainer = document.createElement("div");
    newGroupContainer.className = "group";
    newGroupContainer.appendChild(selectionsMaker());
    return newGroupContainer;
}

const selectionsMaker = () => {
    const selections = document.createElement("div");
    selections.className = "selections";
    return selections;
}

const makeGroup = (element) => {
    element.appendChild(makeGroupContainer());
}

const insertNewGroupContainer = (insertPoint, newElement) => {
    insertPoint.append(newElement);
}
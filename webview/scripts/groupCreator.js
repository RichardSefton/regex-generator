const makeGroupContainer = (index) => {
    const newGroupContainer = document.createElement("div");
    newGroupContainer.className = "group";
    newGroupContainer.setAttribute("index", `${index}`);
    newGroupContainer.append(makeSelectionsContainer(index));
    newGroupContainer.append(makeRegexGroupAreaContainer(index));
    newGroupContainer.append(makeOptionsContianer(index));
    return newGroupContainer;
}

const makeSelectionsContainer = (index) => {
    const container = document.createElement("div");
    container.className = "selections";
    container.setAttribute("index", `${index}`);
    return container;
}

const makeRegexGroupAreaContainer = (index) => {
    const container = document.createElement("div");
    container.className = "regexGroupArea";
    container.setAttribute("index", `${index}`)
    return container;
}

const makeOptionsContianer = (index) => {
    const container = document.createElement("div");
    container.classList.add("options");
    container.setAttribute("index", `${index}`);
    return container
};

const insertNewGroupContainer = (insertPoint, newElement) => {
    insertPoint.append(newElement);
}

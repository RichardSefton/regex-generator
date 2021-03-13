// @ts-nocheck
const makeSelections = (index) => {
    const wildcard = new SelectionType(index, ".", "wildcard");
    const digit = new SelectionType(index, "\\d", "digit");
    const word = new SelectionType(index, "\\w", "word");
    const whitespace = new SelectionType(index, "\\s", "whitespace");
    const notDigit = new SelectionType(index, "\\D", "not digit");
    const notWord = new SelectionType(index, "\\W", "not word");
    const notWhitespace = new SelectionType(index, "\\S", "not whitespace");
    const customRange = new SelectionType(index, "", "range");
    const numberLimit = new SelectionType(index, "", "numberLimit");
    const orSelection = new SelectionType(index, "|", "or");  

    $(`.selections[index=${index}]`).html("");
    $(`.selections[index=${index}]`).append(wildcard.makeDraggable());
    $(`.selections[index=${index}]`).append(digit.makeDraggable());
    $(`.selections[index=${index}]`).append(word.makeDraggable());
    $(`.selections[index=${index}]`).append(orSelection.makeDraggable());
    $(`.selections[index=${index}]`).append(whitespace.makeDraggable());
    $(`.selections[index=${index}]`).append(notDigit.makeDraggable());
    $(`.selections[index=${index}]`).append(notWord.makeDraggable());
    $(`.selections[index=${index}]`).append(notWhitespace.makeDraggable());
    $(`.selections[index=${index}]`).append(customRange.makeCustomRange());
    $(`.selections[index=${index}]`).append(numberLimit.makeNumberLimits());
    
    const beginString = new SelectionType(index, "^", "beginString", "Begin String").makeToggle();
    const endString = new SelectionType(index, "$", "endString", "End String").makeToggle();
    const groupModifierSelect = new SelectionType(index, "", "groupModifier", "Group Modifier").makeDropdown([
        {represents: "", label: "-None-"},
        {represents: "+", label: "one or more"},
        {represents: "*", label: "zero or more"},
        {represents: "?", label: "zero or one"}
    ]);
    $(`.options[index=${index}]`).html("");
    $(`.options[index=${index}]`).append(beginString);
    $(`.options[index=${index}]`).append(endString);
    $(`.options[index=${index}]`).append(groupModifierSelect);
    setToggles("beginString");
    setToggles("endString");

    const toggles = [
        beginString,
        endString
    ];

    const selections = [
        wildcard,
        digit, 
        word,
        whitespace,
        notDigit,
        notWord,
        notWhitespace,
        customRange,
        numberLimit,
        orSelection
    ];

    const dropdowns = [
        groupModifierSelect
    ];

    const areas = document.querySelectorAll(".regexGroupArea");

    setEventListeners(selections, areas, toggles, dropdowns, index)
}

const updater = (index) => {
    const groupAreas = [...document.querySelectorAll(".regexGroupArea")];
    const area = groupAreas.filter(ga => ga.getAttribute("index") === `${index}`);
    if (area.length === 1) {
        $(".selections").html("");
        updateGroup(area[0], index);
    }
    const selections = [...document.querySelectorAll(".selections")];
    selections.forEach(selection => {
        const selectionIndex = selection.getAttribute("index");
        makeSelections(selectionIndex);
    });
}

const setToggles = (className) => {
    const toggles = [...document.querySelectorAll(`.${className}`)];
    toggles.forEach(toggle => {
        const index = toggle.getAttribute("index");
        if (vscode.getState()[`${className}_${index}`]) {
            toggle.setAttribute("checked", true);
        }  else {
            toggle.removeAttribute("checked");
        }
    });
}

const selectionModifier = (e, index) => {
    const modifiers = [
        {value: "", label: "", bg: ""}, 
        {value: "+", label: "one or more", bg: "orange"}, 
        {value: "*", label: "zero or more", bg: "#cc66ff"},
        {value: "?", label: "zero or one", bg: "#66ff66"}
    ];

    const name = e.target.getAttribute("name");
    switch(name) {
        case "range":
            const rangeContainers = [...document.querySelectorAll(".customRange.dropped")];
            rangeContainers.forEach((cont) => {
                if (Number.parseInt(cont.getAttribute("index")) === Number.parseInt(index)) {
                    let modifierNumber = cont.getAttribute("modifierNumber");
                    modifierNumber = Number.parseInt(modifierNumber) + 1;
                    cont.setAttribute("modifierNumber", modifierNumber);
                    cont.setAttribute("modifierValue", modifiers[modifierNumber%modifiers.length].value);
                    $(`.input-group-text[index=${index}][name=range]`).css(`background-color`, modifiers[modifierNumber%modifiers.length].bg);
                    $(`.input-group-text[index=${index}][name=range][append]`).html(modifierNumber%modifiers.length > 0?`]: ${modifiers[modifierNumber%modifiers.length].label}`:`]`);
                }
            })            
        break;
        case "numberLimit":
            //do nothing. We don't want modifiers following number limits
        break;
        default:
            let modifierNumber = e.target.getAttribute("modifierNumber");
            modifierNumber = Number.parseInt(modifierNumber) + 1;
            e.target.setAttribute("modifierNumber", modifierNumber)
            e.target.style.backgroundColor = modifiers[modifierNumber%modifiers.length].bg;
            e.target.setAttribute("modifierValue", modifiers[modifierNumber%modifiers.length].value);
            e.target.innerHTML = modifierNumber%modifiers.length > 0?`${e.target.getAttribute("name")}: ${modifiers[modifierNumber%modifiers.length].label}`:`${e.target.getAttribute("name")}`;
    }
    updater(index);
}

const dragStart = (e) => {
    e.target.classList.add("dragging");
    e.target = document.querySelector('.dragging');
}

const dragEnd = (e, index) => {
    e.target.classList.remove("dragging");
    e.target.classList.add("dropped");
    e.target.addEventListener("click", (event) => {
        selectionModifier(event, index);
    })
    updater(index);
}

const dragOver = (e, area) => {
    e.preventDefault();
    const selection = document.querySelector(".dragging");
    const classList = [...e.target.classList];
    if (classList.includes("regexGroupArea")) {
        area.append(selection);
    } else {
        // console.log(area);
        const afterElement = dragPlacement(area, e.clientX, e.clientY);
        if (afterElement === undefined) {
            area.append(selection);
        } else {
            area.insertBefore(selection, afterElement);
        }
    }
}

const toggleChange = (e, index) => {
    vscode.setState({...vscode.getState()})[`${e.target.id}`] = e.target.checked;
    const groupAreas = [...document.querySelectorAll(".regexGroupArea")];
    const area = groupAreas.filter(ga => ga.getAttribute("index") === `${index}`);
    if (area.length === 1) {
        updateGroup(area[0], index);
    }
};

const dragPlacement = (area, x, y) => {
    const draggableElements = [...area.querySelectorAll('[draggable]:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const yOffset = y - box.top - box.height /2;
        const xOffset = x - box.left - box.width /2;
        if ((yOffset < 0 && yOffset > closest.yOffset) && (xOffset < 0 && xOffset > closest.xOffset)) {
            return {yOffset: yOffset, xOffset: xOffset, element: child}
        } else {
            return closest;
        }
    }, {yOffset: Number.NEGATIVE_INFINITY, xOffset: Number.NEGATIVE_INFINITY}).element;
};

const changeDropdown = (e, index) => {
    vscode.setState({...vscode.getState()})[`groupModifier_${index}`] = e.target.value;
    vscode.setState({...vscode.getState()})[`selectedGroupModifier_${index}`] = e.target.value;
    updater(index);
    console.log(e);
};

const setEventListeners = (selections, areas, toggles, dropdowns, index) => {
    selections.forEach((selection) => {
        selection.selection.addEventListener("dragstart", (e) => {
            dragStart(e);
        });
        selection.selection.addEventListener("dragend", (e) => {
            dragEnd(e, index);
        });
    });

    areas.forEach((area) => {
        area.addEventListener("dragover", (e) => {
            dragOver(e, area);
        });
    });

    toggles.forEach((toggle) => {
        toggle.addEventListener("change", (e) => {
            toggleChange(e, index);
        });
    });

    dropdowns.forEach((dropdown) => {
        dropdown.childNodes[1].addEventListener("change", (e) => {
            changeDropdown(e, index);
        })
    });
}

// /[A-Z]/.test("SWEFWEFAWEF")
const makeSelections = () => {
    const digit = new SelectionType("digits", "\d", "digits");
    const word = new SelectionType("word", "\w", "word");
    const whitespace = new SelectionType("whitespace", "\s", "whitespace");

    $(".selections").append(digit.makeCharacter());
    $(".selections").append(word.makeCharacter());
    $(".selections").append(whitespace.makeCharacter());

    const selections = [
        digit, 
        word,
        whitespace,
    ]
    const areas = document.querySelectorAll(".regexGroupArea");

    setEventListeners(selections, areas)
}

const dragStart = (e) => {
    console.log("started dragging");
    e.target.classList.add("dragging");
    e.target = document.querySelector('.dragging');
}

const dragEnd = (e) => {
    e.target.classList.remove("dragging");
    $(".selections").html("");
    makeSelections();
}

const dragging = (e) => {
}

const dragOver = (e, area) => {
    e.preventDefault();
    const selection = document.querySelector(".dragging");
    const classList = [...e.target.classList];
    if (classList.includes("regexGroupArea")) {
        area.appendChild(selection);
    } else {
        // console.log(area);
        const afterElement = dragPlacement(area, e.clientX, e.clientY);
        if (afterElement === undefined) {
            area.appendChild(selection);
        } else {
            area.insertBefore(selection, afterElement);
        }
    }
}

const dragPlacement = (area, x, y) => {
    const draggableElements = [...area.querySelectorAll('[draggable]:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        console.log(box);
        const yOffset = y - box.top - box.height /2;
        // const xOffset = x + 
        if ((yOffset < 0 && yOffset > closest.yOffset)) {
            return {offset: yOffset, element: child}
        } else {
            return closest;
        }
    }, {yOffset: Number.NEGATIVE_INFINITY, xOffset: Number.POSITIVE_INFINITY}).element;
}

const setEventListeners = (selections, areas) => {
    selections.forEach((selection) => {
        selection.selection.addEventListener("dragstart", (e) => {
            dragStart(e);
        });
        selection.selection.addEventListener("dragend", (e) => {
            dragEnd(e);
        });
        selection.selection.addEventListener("drag", (e) => {
            dragging(e);
        });
    });

    areas.forEach((area) => {
        area.addEventListener("dragover", (e) => {
            dragOver(e, area);
        })
    })
}
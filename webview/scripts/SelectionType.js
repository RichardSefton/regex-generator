// @ts-nocheck
class SelectionType {
    constructor(index, represents, name, label) {
        this.index = index;
        this.represents = represents;
        this.name = name;
        this.beginString = represents;
        this.label = label?label:"";
    }
    
    makeDraggable() {
        this.selection = document.createElement("div");
        this.selection.setAttribute("draggable", "true");
        this.selection.classList.add("btn");
        this.selection.setAttribute("represents", this.represents);
        this.selection.setAttribute("modifierNumber", 0);
        this.selection.setAttribute("modifierValue", "");
        this.selection.setAttribute("name", this.name);
        this.selection.setAttribute("index", `${this.index}`);
        this.selection.innerHTML = this.name;

        return this.selection;
    }

    makeCustomRange() {
        this.selection = document.createElement("div");
        this.selection.setAttribute("draggable", "true");
        this.selection.classList.add("customRange");
        this.selection.classList.add("input-group");
        this.selection.classList.add("btn");
        this.selection.classList.add("col-6");
        this.selection.setAttribute("modifierNumber", 0);
        this.selection.setAttribute("modifierValue", "");
        this.selection.setAttribute("name", this.name);
        this.selection.setAttribute("index", `${this.index}`)
        const customRangePrepend = document.createElement("div");
        customRangePrepend.classList.add("input-group-prepend");
        const customRangePrependSpan = document.createElement("span");
        customRangePrependSpan.setAttribute("name", `${this.name}`);
        customRangePrependSpan.setAttribute("index", `${this.index}`);
        customRangePrependSpan.classList.add("input-group-text");
        customRangePrependSpan.innerHTML = "[";
        customRangePrepend.append(customRangePrependSpan);
        this.selection.append(customRangePrepend);
        const customRangeInput = document.createElement("input");
        customRangeInput.classList.add("form-control");
        customRangeInput.classList.add("input-sm");
        customRangeInput.classList.add("customRangeInput");
        customRangeInput.setAttribute("type", "text");
        customRangeInput.setAttribute("name", `${this.name}`);
        customRangeInput.setAttribute("index", `${this.index}`)
        this.selection.append(customRangeInput)
        const customRangeAppend = document.createElement("div");
        customRangeAppend.classList.add("input-group-append");
        const customRangeAppendSpan = document.createElement("span");
        customRangeAppendSpan.setAttribute("name", `${this.name}`);
        customRangeAppendSpan.setAttribute("index", `${this.index}`);
        customRangeAppendSpan.setAttribute("append", true);
        customRangeAppendSpan.classList.add("input-group-text");
        customRangeAppendSpan.innerHTML += " ]";
        customRangeAppend.append(customRangeAppendSpan);
        this.selection.append(customRangeAppend);
        return this.selection;
    }

    makeNumberLimits() {
        this.selection = document.createElement("div");
        this.selection.setAttribute("draggable", "true");
        this.selection.classList.add("numberLimit");
        this.selection.classList.add("input-group");
        this.selection.classList.add("btn");
        this.selection.classList.add("col-6");
        this.selection.setAttribute("name", this.name);
        this.selection.setAttribute("index", `${this.index}`)
        const numberLimitPrepend = document.createElement("div");
        numberLimitPrepend.classList.add("input-group-prepend");
        const numberLimitPrependSpan = document.createElement("span");
        numberLimitPrependSpan.setAttribute("name", `${this.name}`);
        numberLimitPrependSpan.setAttribute("index", `${this.index}`);
        numberLimitPrependSpan.classList.add("input-group-text");
        numberLimitPrependSpan.innerHTML = "{";
        numberLimitPrepend.append(numberLimitPrependSpan);
        this.selection.append(numberLimitPrepend);
        const numberLimitInput = document.createElement("input");
        numberLimitInput.classList.add("form-control");
        numberLimitInput.classList.add("input-sm");
        numberLimitInput.classList.add("numberLimitInput");
        numberLimitInput.setAttribute("type", "text");
        numberLimitInput.setAttribute("name", `${this.name}`);
        numberLimitInput.setAttribute("index", `${this.index}`)
        this.selection.append(numberLimitInput)
        const numberLimitAppend = document.createElement("div");
        numberLimitAppend.classList.add("input-group-append");
        const numberLimitAppendSpan = document.createElement("span");
        numberLimitAppendSpan.setAttribute("name", `${this.name}`);
        numberLimitAppendSpan.setAttribute("index", `${this.index}`);
        numberLimitAppendSpan.setAttribute("append", true);
        numberLimitAppendSpan.classList.add("input-group-text");
        numberLimitAppendSpan.innerHTML += " }";
        numberLimitAppend.append(numberLimitAppendSpan);
        this.selection.append(numberLimitAppend);
        return this.selection;
    }

    makeToggle() {
        this.checkboxWrapper = document.createElement("div");
        this.checkboxWrapper.classList.add("form-group");
        this.checkboxWrapper.setAttribute("index", `${this.index}`);

        this.checkbox = document.createElement("input");
        this.checkbox.id = `${this.name}_${this.index}`;
        this.checkbox.classList.add(this.name);
        this.checkbox.setAttribute("type", "checkbox");
        this.checkbox.setAttribute("represents", this.represents);
        this.checkbox.setAttribute("index", `${this.index}`);
        
        this.checkboxLabel = document.createElement("label");
        this.checkboxLabel.classList.add("lbl-white");
        this.checkboxLabel.setAttribute("index", `${this.index}`);
        this.checkboxLabel.innerHTML = this.label;
        
        this.checkboxWrapper.append(this.checkbox);
        this.checkboxWrapper.append(this.checkboxLabel);
        
        return this.checkboxWrapper;
    }

    makeDropdown(options) {
        const selectFormGroup = document.createElement("div");
        selectFormGroup.classList.add("selectContainer");
        selectFormGroup.classList.add("form-group");
        selectFormGroup.setAttribute("index", `${this.index}`);
        selectFormGroup.setAttribute("name", this.name);
        const selectLabel = document.createElement("label");
        selectLabel.setAttribute("for", `${this.name}_${this.index}`);
        selectLabel.innerHTML = this.label;
        selectLabel.classList.add("selectLabel");
        selectFormGroup.appendChild(selectLabel);
        const select = document.createElement("select");
        select.id = `${this.name}_${this.index}`;
        select.classList.add("form-control");
        select.setAttribute("index", `${this.index}`);
        select.classList.add(`groupSelect`);
        select.setAttribute("name", this.name);
        options.forEach(o => {
            const selectOption = document.createElement("option");
            selectOption.value = o.represents;
            selectOption.text = o.label;
            select.setAttribute("index", `${this.index}`);
            select.appendChild(selectOption);
        });
        if (vscode.getState()[`selectedGroupModifier_${this.index}`]) {
            console.log(vscode.getState()[`selectedGroupModifier_${this.index}`]);
            select.value = vscode.getState()[`selectedGroupModifier_${this.index}`];
        }
        selectFormGroup.appendChild(select);
        this.select = selectFormGroup;
        return this.select; 
    }
}
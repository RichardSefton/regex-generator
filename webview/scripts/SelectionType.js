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
}
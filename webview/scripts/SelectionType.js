class SelectionType {
    constructor(id, represents, name) {
        this.represents = represents;
        this.name = name;
    }
    
    makeCharacter() {
        this.selection = document.createElement("div");
        this.selection.setAttribute("draggable", "true");
        this.selection.classList.add("btn");
        this.selection.setAttribute("represents", this.represents);
        this.selection.setAttribute("name", this.name);
        this.selection.innerHTML = this.name;

        return this.selection;
    }
}
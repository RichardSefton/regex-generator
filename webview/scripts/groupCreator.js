const makeCanvas = () => {
    const canvas = document.createElement("div");
    canvas.id = `regexGroupArea`;
    canvas.className = "regexGroupArea";
    return canvas
}

const makeGroup = () => {
    $("#regexGroup").append(makeCanvas());
}
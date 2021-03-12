// @ts-nocheck
const opening = "/";
const closing = "/";
const regex = [];
const newGroup = () => {
    regex.push([]);
}

const updateGroup = (group, index) => {
    const parts = [...group.querySelectorAll(".dropped")]
    const builder = [];
    if (vscode.getState()[`beginString_${index}`]) {builder.push("^")}
    builder.push("(");
    parts.forEach((part) => {
        builder.push(part.attributes["represents"].value)
    });
    builder.push(")");
    regex[index] = builder;

    postRegex();
}

const postRegex = () => {
    const display = document.getElementById("regexOut");
    let body = "";
    regex.forEach(re => {
        body += re.join("");
    })
    display.value = `${opening}${body}${closing}`;
}
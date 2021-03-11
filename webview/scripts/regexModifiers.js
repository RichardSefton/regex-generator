const addGlobal = (expression) => {
    return `${expression}g`;
}

const removeGlobal = (expression) => {
    expression = expression.replace("/g", "/");
    return expression;
}
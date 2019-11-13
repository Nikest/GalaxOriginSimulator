export const styleVariable = (key: string) => {
    return window.getComputedStyle(document.body).getPropertyValue(key)
};

const instanses = [];

export const modalService = {
    onInstance(modalAPI) {
        instanses.push(modalAPI)
    },
    open(name: string, content: any) {
        instanses[0].open(name, content);
    },
    close() {
        instanses[0].close()
    }
};

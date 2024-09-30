let vscodeApi;

export const getVsCodeApi = () => {
    if (!vscodeApi) {
        vscodeApi = window.acquireVsCodeApi();
    }
    return vscodeApi;
};

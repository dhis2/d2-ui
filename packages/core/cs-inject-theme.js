export default (fileInfo, api) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    const importDeclaration = root.find(j.ImportDeclaration, {
        source: {
            type: 'Literal',
            value: '../../../config/inject-theme',
        },
    });
    return importDeclaration.replaceWith((nodePath) => {
        const { node } = nodePath;
        node.source.value = '../../../../../config/inject-theme';
        return node;
    })
        .toSource();
};

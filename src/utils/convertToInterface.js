export const convertToInterface = (classContent) => {
    const outputFile = [];

    classContent.split('\n').forEach(line => {
        if (!line || line.trim().length === 1) return;

        if (line.indexOf('class ') > -1) {
            const lineFixed =
                line.indexOf(':') > -1
                    ? line
                        .trim()
                        .split('')
                        .slice(0, line.trim().indexOf(':'))
                        .join('')
                        .trim()
                    : line;
            const lineArr = lineFixed.trim().split(' ');
            const className = lineArr[lineArr.length - 1];

            const interfaceTitle = 'export interface ' + className + ' {';
            outputFile.push(interfaceTitle);
            return;
        }

        if (line.indexOf('get;') > -1) {
            const lineArr = line.trim().split(' ');
            const type = lineArr[1];
            const propName = lineArr[2]
                .split('')
                .map((char, i) => (i === 0 ? char.toLowerCase() : char))
                .join('');
            const typeToUse = getType(type);
            const property = `	${propName}: ${typeToUse};`;
            outputFile.push(property);
        }
    });
    outputFile.push('}')
    return outputFile.join('\n');
}

const getType = (type) => {
    const typeFixed =
        type.indexOf('?') > -1 ? type.slice(0, type.length - 1) : type;

    if (type.indexOf('ICollection') > -1) {
        const collectionOf = type
            .split('')
            .slice(type.indexOf('<') + 1, type.indexOf('>'))
            .join('');
        return collectionOf + '[]';
    }

    const typeMapping = {
        string: 'string',
        Guid: 'string',
        long: 'number',
        int: 'number',
        decimal: 'number',
        bool: 'boolean',
        DateTime: 'Date',
    };

    if (typeMapping[typeFixed]) return typeMapping[typeFixed];
    return typeFixed;
};
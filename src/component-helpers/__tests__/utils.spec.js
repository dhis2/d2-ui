import { createClassName, getRestProps } from '../utils';

describe('utils', () => {
    describe('createClassName', () => {
        it('should return the same class name', () => {
            expect(createClassName('my-component')).toBe('my-component');
        });

        it('should return class name and class name with selector appended', () => {
            expect(createClassName('my-component', 'abc')).toBe('my-component my-component-abc');
        });
    });

    describe('getRestProps', () => {
        it('should filter out non white-listed properties', () => {
            const propsWhiteList = {
                name: 'Bob',
                age: '100',
            };
            const omitProps = {
                salary: 123456789,
                address: {
                    street: '5th ave',
                    state: 'NY',
                },
            };
            const props = Object.assign({}, propsWhiteList, omitProps);

            const res = getRestProps(props, Object.keys(propsWhiteList));

            expect(res).toEqual(expect.objectContaining(propsWhiteList));
            expect(res).not.toEqual(expect.objectContaining(omitProps));
        });
    });
});

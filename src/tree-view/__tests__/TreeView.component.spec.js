import React from 'react';
import { shallow } from 'enzyme';
import TreeView from '../';

describe('TreeView component', () => {
    let wrapper;
    let children;

    beforeEach(() => {
        wrapper = shallow(<TreeView label="myLabel" />);
    });

    it('is collapsed by default', () => {
        expect(wrapper.state('collapsed')).toBe(true);
    });

    it('is initially expanded if initiallyExpanded=true', () => {
        wrapper = shallow(<TreeView label="myLabel" initiallyExpanded />);
        expect(wrapper.state('collapsed')).toBe(false);
    });

    it('does not expand when the label is clicked', () => {
        wrapper.find('.label').simulate('click');
        expect(wrapper.state('collapsed')).toBe(true);
    });

    it('expands when the arrow is clicked', () => {
        wrapper.find('.arrow').simulate('click');
        expect(wrapper.state('collapsed')).toBe(false);
    });

    it('expands and then collapses when the arrow is clicked twice', () => {
        wrapper.find('.arrow').simulate('click');
        wrapper.find('.arrow').simulate('click');
        expect(wrapper.state('collapsed')).toBe(true);
    });

    it('renders the arrow symbol', () => {
        expect(wrapper.contains(TreeView.defaultProps.arrowSymbol)).toBe(true);
    });

    it('renders custom arrow symbols', () => {
        wrapper = shallow(<TreeView label="myLabel" arrowSymbol="xoxo-funny-arrow" />);
        expect(wrapper.contains(TreeView.defaultProps.arrowSymbol)).toBe(false);
        expect(wrapper.contains('xoxo-funny-arrow')).toBe(true);
    });

    it('renders the label', () => {
        expect(wrapper.contains('myLabel')).toBe(true);
    });

    it('renders components as labels', () => {
        wrapper = shallow(<TreeView label={<TreeView />} />);
        expect(wrapper.children().contains(<TreeView />)).toBe(true);
    });

    describe('with onExpand() callback', () => {
        let onExpand;

        beforeEach(() => {
            onExpand = jest.fn();
            wrapper = shallow(<TreeView label="myLabel" onExpand={onExpand} />);
        });

        it('doesn\'t trigger the onExpand callback initially', () => {
            expect(onExpand).not.toHaveBeenCalled();
        });

        it('triggers the onExpand callback when the arrow is clicked', () => {
            wrapper.find('.arrow').simulate('click');
            expect(onExpand).toHaveBeenCalledTimes(1);
        });

        it('triggers the onExpand callback every time it\'s expanded', () => {
            wrapper.find('.arrow').simulate('click'); // Expand
            expect(onExpand).toHaveBeenCalledTimes(1);
            wrapper.find('.arrow').simulate('click'); // Collapse
            expect(onExpand).toHaveBeenCalledTimes(1);
            wrapper.find('.arrow').simulate('click'); // Expand
            expect(onExpand).toHaveBeenCalledTimes(2);
        });

        describe('and initiallyExpanded=true', () => {
            beforeEach(() => {
                wrapper = shallow(<TreeView label="myLabel" onExpand={onExpand} initiallyExpanded />);
            });

            it('doesn\'t trigger the onExpand callback initially', () => {
                expect(onExpand).not.toHaveBeenCalled();
            });

            it('doesn\'t triggers the onExpand callback when collapsed', () => {
                wrapper.find('.label').simulate('click'); // Collapse
                expect(onExpand).not.toHaveBeenCalled();
            });

            it('triggers the onExpand callback every time it\'s expanded', () => {
                wrapper.find('.arrow').simulate('click'); // Collapse
                expect(onExpand).not.toHaveBeenCalled();
                wrapper.find('.arrow').simulate('click'); // Expand
                expect(onExpand).toHaveBeenCalledTimes(1);
                wrapper.find('.arrow').simulate('click'); // Collapse
                expect(onExpand).toHaveBeenCalledTimes(1);
                wrapper.find('.arrow').simulate('click'); // Expand
                expect(onExpand).toHaveBeenCalledTimes(2);
            });
        });
    });

    describe('with onClick() callback', () => {
        let onClick;

        beforeEach(() => {
            onClick = jest.fn();
            wrapper = shallow(<TreeView label="myLabel" onClick={onClick}/>);
        });

        it('triggers the onClick callback when the label is clicked', () => {
            wrapper.find('.label').simulate('click');
            expect(onClick).toHaveBeenCalled();
        });

        it('triggers the onClick callback every time the label is clicked', () => {
            wrapper.find('.label').simulate('click');
            expect(onClick).toHaveBeenCalledTimes(1);
            wrapper.find('.label').simulate('click');
            expect(onClick).toHaveBeenCalledTimes(2);
        });

        it('doesn\'t automatically trigger the onClick callback', () => {
            expect(onClick).not.toHaveBeenCalled();
        });

        it('doesn\'t trigger the onClick callback when the arrow is clicked', () => {
            wrapper.find('.arrow').simulate('click');
            expect(onClick).not.toHaveBeenCalled();
        });

        describe('and initiallyExpanded children', () => {
            beforeEach(() => {
                children = [
                    <div className="child a">A</div>,
                    <div className="child b">B</div>,
                    <div className="child c">C</div>,
                ];
                wrapper = shallow(
                    <TreeView label="myLabel" onClick={onClick} initiallyExpanded>
                        {children}
                    </TreeView>
                );
            });

            it('triggers the onClick callback when the label is clicked', () => {
                wrapper.find('.label').simulate('click');
                expect(onClick).toHaveBeenCalled();
            });

            it('triggers the onClick callback every time the label is clicked', () => {
                wrapper.find('.label').simulate('click');
                expect(onClick).toHaveBeenCalledTimes(1);
                wrapper.find('.label').simulate('click');
                expect(onClick).toHaveBeenCalledTimes(2);
            });

            it('doesn\'t automatically trigger the onClick callback', () => {
                expect(onClick).not.toHaveBeenCalled();
            });

            it('doesn\'t trigger the onClick callback when the children are clicked', () => {
                wrapper.find('.children').simulate('click');
                expect(onClick).not.toHaveBeenCalled();
            });
        });

        describe('and onExpand() callback', () => {
            let onExpand;

            beforeEach(() => {
                onExpand = jest.fn(() => {});
                wrapper = shallow(<TreeView label="myLabel" onClick={onClick} onExpand={onExpand}/>);
            });

            it('triggers the onExpand callback when expanded', () => {
                wrapper.find('.arrow').simulate('click');

                expect(onExpand).toHaveBeenCalled();
            });

            it('doesn\'t trigger the onClick callback when expanded', () => {
                wrapper.find('.arrow').simulate('click');

                expect(onClick).not.toHaveBeenCalled();
            });
        });

        describe('( these tests are probably not working correctly: )', () => {
            describe('and nested TreeView with onClick() callback', () => {
                let nestedOnClick;

                beforeEach(() => {
                    nestedOnClick = jest.fn();
                    wrapper = shallow(
                        <TreeView label="myLabel" onClick={onClick} initiallyExpanded>
                            <TreeView label="nestedLabel" onClick={nestedOnClick}/>
                        </TreeView>
                    );
                });

                it('triggers the onClick callback when the label is clicked', () => {
                    wrapper.find('.label').simulate('click');
                    expect(onClick).toHaveBeenCalled();
                });

                it('doesn\'t trigger the onClick callback when the inner label is clicked', () => {
                    wrapper.find(TreeView).shallow().find('.label').simulate('click');
                    expect(onClick).not.toHaveBeenCalled();
                });

                it('triggers the inner onClick callback when the inner label is clicked', () => {
                    wrapper.find(TreeView).shallow().find('.label').simulate('click');
                    expect(nestedOnClick).toHaveBeenCalled();
                });

                it('doesn\'t trigger the inner onClick callback when the label is clicked', () => {
                    wrapper.find('.label').simulate('click');
                    expect(nestedOnClick).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe('with children', () => {
        beforeEach(() => {
            children = [
                <div className="child a">A</div>,
                <div className="child b">B</div>,
                <div className="child c">C</div>,
            ];
            wrapper = shallow(
                <TreeView label="myLabel">
                    {children}
                </TreeView>
            );
        });

        it('doesn\'t render any children until it\'s expanded', () => {
            expect(wrapper.find('.children').children()).toHaveLength(0);
            expect(wrapper.contains(children)).toBe(false);
        });

        it('renders children once expanded', () => {
            wrapper.find('.arrow').simulate('click');
            expect(wrapper.find('.children')).toHaveLength(1);
            expect(wrapper.contains(children)).toBe(true);
        });

        it('removes children if expanded and then collapsed', () => {
            wrapper.find('.arrow').simulate('click');
            wrapper.find('.arrow').simulate('click');
            expect(wrapper.find('.children')).toHaveLength(0);
            expect(wrapper.contains(children)).toBe(false);
        });

        it('renders children immediately if initiallyExpanded=true', () => {
            wrapper = shallow(<TreeView label="myLabel" initiallyExpanded>{children}</TreeView>);
            expect(wrapper.find('.children')).toHaveLength(1);
            expect(wrapper.contains(children)).toBe(true);
        });

        it('doesn\'t render children if initially expanded and then collapsed', () => {
            wrapper = shallow(<TreeView label="myLabel" initiallyExpanded>{children}</TreeView>);
            wrapper.find('.arrow').simulate('click');
            expect(wrapper.find('.children')).toHaveLength(0);
            expect(wrapper.contains(children)).toBe(false);
        });

        describe('and persistent=true', () => {
            beforeEach(() => {
                wrapper = shallow(
                    <TreeView label="myLabel" persistent>
                        {children}
                    </TreeView>
                );
            });

            it('doesn\'t render any children until it\'s expanded', () => {
                expect(wrapper.find('.children')).toHaveLength(0);
                expect(wrapper.contains(children)).toBe(false);
            });

            it('renders children once expanded', () => {
                wrapper.find('.arrow').simulate('click');
                expect(wrapper.find('.children')).toHaveLength(1);
                expect(wrapper.contains(children)).toBe(true);
            });

            it('doesn\'t remove children if expanded and then collapsed', () => {
                wrapper.find('.arrow').simulate('click');
                wrapper.find('.arrow').simulate('click');
                expect(wrapper.find('.children')).toHaveLength(1);
                expect(wrapper.contains(children)).toBe(true);
            });

            it('renders children immediately if initiallyExpanded=true', () => {
                wrapper = shallow(<TreeView label="myLabel" initiallyExpanded persistent>{children}</TreeView>);
                expect(wrapper.find('.children')).toHaveLength(1);
                expect(wrapper.contains(children)).toBe(true);
            });

            it('doesn\'t remove children if initially expanded and then collapsed', () => {
                wrapper = shallow(<TreeView label="myLabel" initiallyExpanded persistent>{children}</TreeView>);
                wrapper.find('.arrow').simulate('click');
                expect(wrapper.find('.children')).toHaveLength(1);
                expect(wrapper.contains(children)).toBe(true);
            });
        });
    });
});

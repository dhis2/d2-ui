import React from 'react';
import { shallow } from 'enzyme';

import TreeView from '../../src/tree-view';

describe('TreeView component', () => {
    let wrapper;
    let children;

    beforeEach(() => {
        wrapper = shallow(<TreeView label="myLabel" />);
    });

    it('is collapsed by default', () => {
        expect(wrapper.state('collapsed')).to.be.true;
    });

    it('is initially expanded if initiallyExpanded=true', () => {
        wrapper = shallow(<TreeView label="myLabel" initiallyExpanded />);
        expect(wrapper.state('collapsed')).to.be.false;
    });

    it('expands when the label is clicked', () => {
        wrapper.find('.label').simulate('click');
        expect(wrapper.state('collapsed')).to.be.false;
    });

    it('expands and then collapses when the label is clicked twice', () => {
        wrapper.find('.label').simulate('click');
        wrapper.find('.label').simulate('click');
        expect(wrapper.state('collapsed')).to.be.true;
    });

    it('renders the arrow symbol', () => {
        expect(wrapper.contains(TreeView.defaultProps.arrowSymbol)).to.be.true;
    });

    it('renders custom arrow symbols', () => {
        wrapper = shallow(<TreeView label="myLabel" arrowSymbol="xoxo-funny-arrow" />);
        expect(wrapper.contains(TreeView.defaultProps.arrowSymbol)).to.be.false;
        expect(wrapper.contains('xoxo-funny-arrow')).to.be.true;
    });

    it('renders the label', () => {
        expect(wrapper.contains('myLabel')).to.be.true;
    });

    it('renders components as labels', () => {
        wrapper = shallow(<TreeView label={<TreeView />} />);
        expect(wrapper.children().contains(TreeView)).to.be.true;
    });

    describe('with onExpand callback', () => {
        let onExpand;

        beforeEach(() => {
            onExpand = sinon.spy();
            wrapper = shallow(<TreeView label="myLabel" onExpand={onExpand} />);
        });

        it('doesn\'t trigger the onExpand callback initially', () => {
            expect(onExpand).to.not.have.been.called;
        });

        it('triggers the onExpand callback when clicked', () => {
            wrapper.find('.label').simulate('click');
            expect(onExpand).to.have.been.calledOnce;
        });

        it('triggers the onExpand callback every time it\'s expanded', () => {
            wrapper.find('.label').simulate('click'); // Expand
            expect(onExpand).to.have.been.calledOnce;
            wrapper.find('.label').simulate('click'); // Collapse
            expect(onExpand).to.have.been.calledOnce;
            wrapper.find('.label').simulate('click'); // Expand
            expect(onExpand).to.have.been.calledTwice;
        });

        describe('and initiallyExpanded=true', () => {
            beforeEach(() => {
                wrapper = shallow(<TreeView label="myLabel" onExpand={onExpand} initiallyExpanded />);
            });

            it('doesn\'t trigger the onExpand callback initially', () => {
                expect(onExpand).to.not.have.been.called;
            });

            it('doesn\'t triggers the onExpand callback when collapsed', () => {
                wrapper.find('.label').simulate('click'); // Collapse
                expect(onExpand).to.not.have.been.called;
            });

            it('triggers the onExpand callback every time it\'s expanded', () => {
                wrapper.find('.label').simulate('click'); // Collapse
                expect(onExpand).to.not.have.been.called;
                wrapper.find('.label').simulate('click'); // Expand
                expect(onExpand).to.have.been.calledOnce;
                wrapper.find('.label').simulate('click'); // Collapse
                expect(onExpand).to.have.been.calledOnce;
                wrapper.find('.label').simulate('click'); // Expand
                expect(onExpand).to.have.been.calledTwice;
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
            expect(wrapper.find('.children')).to.have.length(0);
            expect(wrapper.contains(children)).to.be.false;
        });

        it('renders children once expanded', () => {
            wrapper.find('.label').simulate('click');
            expect(wrapper.find('.children')).to.have.length(1);
            expect(wrapper.contains(children)).to.be.true;
        });

        it('removes children if expanded and then collapsed', () => {
            wrapper.find('.label').simulate('click');
            wrapper.find('.label').simulate('click');
            expect(wrapper.find('.children')).to.have.length(0);
            expect(wrapper.contains(children)).to.be.false;
        });

        it('renders children immediately if initiallyExpanded=true', () => {
            wrapper = shallow(<TreeView label="myLabel" initiallyExpanded>{children}</TreeView>);
            expect(wrapper.find('.children')).to.have.length(1);
            expect(wrapper.contains(children)).to.be.true;
        });

        it('doesn\'t render children if initially expanded and then collapsed', () => {
            wrapper = shallow(<TreeView label="myLabel" initiallyExpanded>{children}</TreeView>);
            wrapper.find('.label').simulate('click');
            expect(wrapper.find('.children')).to.have.length(0);
            expect(wrapper.contains(children)).to.be.false;
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
                expect(wrapper.find('.children')).to.have.length(0);
                expect(wrapper.contains(children)).to.be.false;
            });

            it('renders children once expanded', () => {
                wrapper.find('.label').simulate('click');
                expect(wrapper.find('.children')).to.have.length(1);
                expect(wrapper.contains(children)).to.be.true;
            });

            it('doesn\'t remove children if expanded and then collapsed', () => {
                wrapper.find('.label').simulate('click');
                wrapper.find('.label').simulate('click');
                expect(wrapper.find('.children')).to.have.length(1);
                expect(wrapper.contains(children)).to.be.true;
            });

            it('renders children immediately if initiallyExpanded=true', () => {
                wrapper = shallow(<TreeView label="myLabel" initiallyExpanded persistent>{children}</TreeView>);
                expect(wrapper.find('.children')).to.have.length(1);
                expect(wrapper.contains(children)).to.be.true;
            });

            it('doesn\'t remove children if initially expanded and then collapsed', () => {
                wrapper = shallow(<TreeView label="myLabel" initiallyExpanded persistent>{children}</TreeView>);
                wrapper.find('.label').simulate('click');
                expect(wrapper.find('.children')).to.have.length(1);
                expect(wrapper.contains(children)).to.be.true;
            });
        });
    });
});

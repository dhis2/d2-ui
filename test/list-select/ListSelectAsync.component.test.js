import React from 'react/addons';
import ListSelectAsync from '../../src/list-select/ListSelectAsync.component';
import ListSelect from '../../src/list-select/ListSelect.component';
import {ReplaySubject} from 'rx';
import log from 'loglevel';

import {shallow} from 'enzyme';

describe('ListSelectAsync component', () => {
    let listSelectAsyncComponent;
    let onItemDoubleClickSpy;

    beforeEach(() => {
        onItemDoubleClickSpy = spy();
        stub(log, 'error');

        listSelectAsyncComponent = shallow(<ListSelectAsync onItemDoubleClick={onItemDoubleClickSpy} />);
    });

    afterEach(() => {
        log.error.restore();
    });

    it('should render a ListSelect', () => {
        expect(listSelectAsyncComponent.find(ListSelect)).to.have.length(1);
    });

    it('should pass through the onItemDoubleClick handler to the ListSelect', () => {
        const listSelectComponent = listSelectAsyncComponent.find(ListSelect);

        expect(listSelectComponent.props().onItemDoubleClick).to.equal(onItemDoubleClickSpy);
    });

    describe('async source', () => {
        let fakeAsyncSource;

        beforeEach(() => {
            fakeAsyncSource = new ReplaySubject(1);
            fakeAsyncSource.onNext([
                {value: 'PvuaP6YALSA', label: 'Community'},
                {value: 'cNzfcPWEGSH', label: 'Country'},
                {value: 'POHZmzofoVx', label: 'Facility'},
                {value: 'NUPoPEBGCq9', label: 'OUs and Countries'},
            ]);

            listSelectAsyncComponent = shallow(
                <ListSelectAsync onItemDoubleClick={onItemDoubleClickSpy} source={fakeAsyncSource} />
            );

            listSelectAsyncComponent.update();
        });

        it('should render an option for each of the items', () => {
            const listSelect = listSelectAsyncComponent.find(ListSelect);

            expect(listSelect.props().source.length).to.equal(4);
        });

        it('should pass the received data to the ListSelect component', () => {
            const listSelect = listSelectAsyncComponent.find(ListSelect);

            expect(listSelect.props().source).to.deep.equal([
                {value: 'PvuaP6YALSA', label: 'Community'},
                {value: 'cNzfcPWEGSH', label: 'Country'},
                {value: 'POHZmzofoVx', label: 'Facility'},
                {value: 'NUPoPEBGCq9', label: 'OUs and Countries'},
            ]);
        });

        it('should only keep the new options if the source changed', () => {
            fakeAsyncSource.onNext([
                {value: 'dNzfcPWEGSH', label: 'Universe'},
                {value: 'MUPoPEBGCq9', label: 'Planet'},
            ]);
            listSelectAsyncComponent.update();

            const listSelect = listSelectAsyncComponent.find(ListSelect);

            expect(listSelect.props().source).to.deep.equal([
                {value: 'dNzfcPWEGSH', label: 'Universe'},
                {value: 'MUPoPEBGCq9', label: 'Planet'},
            ]);
        });

        it('should log an error when the source emits one', () => {
            fakeAsyncSource.onError('Could not find the source items');

            expect(log.error).to.be.calledWith('Could not find the source items');
        });

        it('should set the subscription onto the component instance', () => {
            expect(listSelectAsyncComponent.instance().disposable).not.to.be.undefined;
        });

        it('should dispose the observable on unmount', () => {
            const listSelectInstance = listSelectAsyncComponent.instance();

            spy(listSelectInstance.disposable, 'dispose');

            listSelectInstance.componentWillUnmount();

            expect(listSelectInstance.disposable.dispose).to.be.calledOnce;
        });
    });
});

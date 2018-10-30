import React from 'react';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import log from 'loglevel';
import { shallow } from 'enzyme';
import ListSelectAsync from '../ListSelectAsync.component';
import ListSelect from '../ListSelect.component';

describe('ListSelectAsync component', () => {
    let listSelectAsyncComponent;
    let onItemDoubleClickSpy;

    beforeEach(() => {
        onItemDoubleClickSpy = jest.fn();
        jest.spyOn(log, 'error');

        listSelectAsyncComponent = shallow(<ListSelectAsync onItemDoubleClick={onItemDoubleClickSpy} />);
    });

    afterEach(() => {
        log.error.mockRestore();
    });

    it('should render a ListSelect', () => {
        expect(listSelectAsyncComponent.find(ListSelect)).toHaveLength(1);
    });

    it('should pass through the onItemDoubleClick handler to the ListSelect', () => {
        const listSelectComponent = listSelectAsyncComponent.find(ListSelect);

        expect(listSelectComponent.props().onItemDoubleClick).toBe(onItemDoubleClickSpy);
    });

    describe('async source', () => {
        let fakeAsyncSource;

        beforeEach(() => {
            fakeAsyncSource = new ReplaySubject(1);
            fakeAsyncSource.next([
                { value: 'PvuaP6YALSA', label: 'Community' },
                { value: 'cNzfcPWEGSH', label: 'Country' },
                { value: 'POHZmzofoVx', label: 'Facility' },
                { value: 'NUPoPEBGCq9', label: 'OUs and Countries' },
            ]);

            listSelectAsyncComponent = shallow(
                <ListSelectAsync onItemDoubleClick={onItemDoubleClickSpy} source={fakeAsyncSource} />,
            );

            listSelectAsyncComponent.update();
        });

        it('should render an option for each of the items', () => {
            const listSelect = listSelectAsyncComponent.find(ListSelect);

            expect(listSelect.props().source.length).toBe(4);
        });

        it('should pass the received data to the ListSelect component', () => {
            const listSelect = listSelectAsyncComponent.find(ListSelect);

            expect(listSelect.props().source).toEqual([
                { value: 'PvuaP6YALSA', label: 'Community' },
                { value: 'cNzfcPWEGSH', label: 'Country' },
                { value: 'POHZmzofoVx', label: 'Facility' },
                { value: 'NUPoPEBGCq9', label: 'OUs and Countries' },
            ]);
        });

        it('should only keep the new options if the source changed', () => {
            fakeAsyncSource.next([
                { value: 'dNzfcPWEGSH', label: 'Universe' },
                { value: 'MUPoPEBGCq9', label: 'Planet' },
            ]);
            listSelectAsyncComponent.update();

            const listSelect = listSelectAsyncComponent.find(ListSelect);

            expect(listSelect.props().source).toEqual([
                { value: 'dNzfcPWEGSH', label: 'Universe' },
                { value: 'MUPoPEBGCq9', label: 'Planet' },
            ]);
        });

        it('should log an error when the source emits one', () => {
            log.error = jest.fn();
            fakeAsyncSource.error('Could not find the source items');

            expect(log.error).toHaveBeenCalledWith('Could not find the source items');
        });

        it('should set the subscription onto the component instance', () => {
            expect(listSelectAsyncComponent.instance().subscription).not.toBe(undefined);
        });

        it('should unsubscribe the observable on unmount', () => {
            const listSelectInstance = listSelectAsyncComponent.instance();

            jest.spyOn(listSelectInstance.subscription, 'unsubscribe');

            listSelectInstance.componentWillUnmount();

            expect(listSelectInstance.subscription.unsubscribe).toHaveBeenCalledTimes(1);
        });
    });
});

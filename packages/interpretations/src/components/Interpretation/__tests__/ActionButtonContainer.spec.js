//TODO: adjust/create similar tests with the re-factored components

/*it('sould show View action', () => {
    expect(interpretationComponent.find(ActionButtonContainer).find({ tooltip: 'View' })).toExist();
});

it.only('should show Exit view action', () => {
    expect(interpretationComponent.find(ActionButton).find({ tooltip: 'Exit View' })).toExist();
});

it('should show like action', () => {
    expect(interpretationComponent.find(ActionButton).find({ tooltip: 'Like' })).toExist();
});

describe('not liked by current user', () => {
    beforeEach(() => {
        currentUser = { id: 'kf34GLJED33', displayName: 'Nelson Mandela' };
        interpretationComponent = renderComponent(
            { extended: true },
            { d2: { currentUser } }
        );
    });

    describe('when like is clicked', () => {
        beforeEach(() => {
            interpretationComponent
                .find(ActionButton)
                .find({ tooltip: 'Like' })
                .simulate('click');
        });

        it('should like interpretation', () => {
            expect(interpretation.like).toHaveBeenCalledWith(true);
        });

        it('should notify change', () => {
            const { onChange } = interpretationComponent.instance().props;
            expect(onChange).toHaveBeenCalledWith(interpretation);
        });
    });
});




describe('liked by current user', () => {
    beforeEach(() => {
        currentUser = { id: 'gdfdRRxx112', displayName: 'Kevin Boateng' };
        interpretationComponent = renderComponent(
            { extended: true },
            { d2: { currentUser } }
        );
    });

    it('should show unlike action', () => {
        expect(interpretationComponent.find(ActionButton).find({ tooltip: 'Unlike' })).toExist();
    });

    describe('when unlike is clicked', () => {
        beforeEach(() => {
            interpretationComponent
                .find(ActionButton)
                .find({ tooltip: 'Unlike' })
                .simulate('click');
        });

        it('should unlike interpretation', () => {
            expect(interpretation.like).toHaveBeenCalledWith(false);
        });

        it('should notify change', () => {
            const { onChange } = interpretationComponent.instance().props;
            expect(onChange).toHaveBeenCalledWith(interpretation);
        });
    });
});

describe('owner actions', () => {
    describe('interpretation owned by current user', () => {
        beforeEach(() => {
            currentUser = { id: 'xE7jOejl9FI', displayName: 'John Traore' };
            interpretationComponent = renderComponent(
                { extended: true },
                { d2: { currentUser } }
            );
        });

        it('should show an edit action', () => {
            expect(interpretationComponent.find(ActionButton).find({ tooltip: 'Edit' })).toExist();
        });

        it('should show a delete action', () => {
            expect(
                interpretationComponent.find(ActionButton).find({ tooltip: 'Delete' })
            ).toExist();
        });


      describe('interpretation not owned by current user', () => {
                beforeEach(() => {
                    currentUser = { id: 'gdfdRRxx112', displayName: 'Kevin Boateng' };
                    interpretationComponent = renderComponent(
                        { extended: true },
                        { d2: { currentUser } }
                    );
                });

                it('should not show an edit action', () => {
                    expect(
                        interpretationComponent.find(ActionButton).find({ tooltip: 'Edit' })
                    ).not.toExist();
                });

                it('should not show a delete action', () => {
                    expect(
                        interpretationComponent.find(ActionButton).find({ tooltip: 'Delete' })
                    ).not.toExist();
                });
            });

            
        */
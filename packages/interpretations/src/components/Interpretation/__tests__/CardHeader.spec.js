//TODO: adjust/create similar tests with the re-factored components

/*const commonExpectations = () => {
    it('should show the authors name', () => {
        const cardHeader = interpretationComponent.find(CardHeader);
        expect(cardHeader.props().cardInfo.user.displayName).toMatch(interpretation.user.displayName);
    });

    it('should show the creation date', () => {
        const cardHeader = interpretationComponent.find(CardHeader);
        console.log(cardHeader.childAt(1).props());
        //expect(cardHeader.props().cardInfo.created).toMatch('Apr 14, 2018');
    });

    it.only('should show how many people like it', () => {
        const count = interpretation.likedBy.length;
        expect(interpretationComponent.text()).toMatch(`${count} likes`);
    });

    //TODO: render names onHover
    it('should show who likes it', () => {
        const names = interpretation.likedBy.map(user => user.displayName).join('\n');
        expect(interpretationComponent.find('.liked-by')).toHaveProp('title', names);
    });

    it('should show how many comments it has', () => {
        const count = interpretation.comments.length;
        expect(interpretationComponent.text()).toMatch(`${count} replies`);
    });
};
*/
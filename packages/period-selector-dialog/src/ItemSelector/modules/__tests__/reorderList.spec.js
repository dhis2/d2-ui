import { reorderList } from '../reorderList'

const items = [
    {
        id: '1',
    },
    {
        id: '2',
    },
    {
        id: '3',
    },
    {
        id: '4',
    },
    {
        id: '5',
    },
    {
        id: '6',
    },
]

describe('reorderList', () => {
    const props = {
        items,
        highlightedItemIds: [],
        destinationIndex: 0,
        sourceIndex: 0,
        draggableId: '',
    }

    beforeEach(() => {
        props.highlightedItemIds = []
    })

    describe('single item drag', () => {
        beforeEach(() => {
            props.isMultiDrag = false
        })

        it('moves 1st item to 5th position', () => {
            props.highlightedItemIds = [items[0].id]
            props.draggableId = items[0].id
            props.sourceIndex = 0
            props.destinationIndex = 4

            const result = reorderList(props)
            const expected = ['2', '3', '4', '5', '1', '6']
            expect(result).toEqual(expected)
        })

        it('moves last item to 3rd position', () => {
            props.highlightedItemIds = [items[5].id]
            props.draggableId = items[5].id
            props.sourceIndex = 5
            props.destinationIndex = 2

            const result = reorderList(props)
            const expected = ['1', '2', '6', '3', '4', '5']
            expect(result).toEqual(expected)
        })
    })

    describe('multi item drag', () => {
        beforeEach(() => {
            props.isMultiDrag = true
        })

        it('moves first two items to 3rd position', () => {
            props.highlightedItemIds = [items[0].id, items[1].id]
            props.draggableId = items[0].id
            props.sourceIndex = 0
            props.destinationIndex = 4

            const result = reorderList(props)
            const expected = ['3', '4', '1', '2', '5', '6']
            expect(result).toEqual(expected)
        })

        it('moves first two items to 5th (2nd to last) position', () => {
            props.highlightedItemIds = [items[0].id, items[1].id]
            props.draggableId = items[0].id
            props.sourceIndex = 0
            props.destinationIndex = 5

            const result = reorderList(props)
            const expected = ['3', '4', '5', '1', '2', '6']
            expect(result).toEqual(expected)
        })

        it('moves first two items to last position', () => {
            props.highlightedItemIds = [items[0].id, items[1].id]
            props.draggableId = items[0].id
            props.sourceIndex = 0
            props.destinationIndex = 6

            const result = reorderList(props)
            const expected = ['3', '4', '5', '6', '1', '2']
            expect(result).toEqual(expected)
        })

        it('moves last two items to 3rd position', () => {
            props.highlightedItemIds = [items[4].id, items[5].id]
            props.draggableId = items[4].id
            props.sourceIndex = 5
            props.destinationIndex = 2

            const result = reorderList(props)
            const expected = ['1', '2', '5', '6', '3', '4']
            expect(result).toEqual(expected)
        })

        it('moves second and sixth items to 4th position', () => {
            props.highlightedItemIds = [items[1].id, items[5].id]
            props.draggableId = items[1].id
            props.sourceIndex = 1
            props.destinationIndex = 4

            const result = reorderList(props)
            const expected = ['1', '3', '4', '2', '6', '5']
            expect(result).toEqual(expected)
        })

        it('moves first three items to 2nd position', () => {
            props.highlightedItemIds = [items[0].id, items[1].id, items[2].id]
            props.draggableId = items[1].id
            props.sourceIndex = 0
            props.destinationIndex = 4

            const result = reorderList(props)
            const expected = ['4', '1', '2', '3', '5', '6']
            expect(result).toEqual(expected)
        })

        it('moves first four items to 2nd position', () => {
            props.highlightedItemIds = [
                items[0].id,
                items[1].id,
                items[2].id,
                items[3].id,
            ]
            props.draggableId = items[1].id
            props.sourceIndex = 0
            props.destinationIndex = 5

            const result = reorderList(props)
            const expected = ['5', '1', '2', '3', '4', '6']
            expect(result).toEqual(expected)
        })

        it('moves last three items to 1st position', () => {
            props.highlightedItemIds = [items[3].id, items[4].id, items[5].id]
            props.draggableId = items[4].id
            props.sourceIndex = 4
            props.destinationIndex = 0

            const result = reorderList(props)
            const expected = ['4', '5', '6', '1', '2', '3']
            expect(result).toEqual(expected)
        })
    })
})

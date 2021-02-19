import sortBy from 'lodash/sortBy'

export const reorderList = ({
    items,
    highlightedItemIds,
    destinationIndex,
    sourceIndex,
    draggableId,
    isMultiDrag,
}) => {
    const list = Array.from(items.map(item => item.id))

    if (isMultiDrag) {
        const indexedItemsToMove = sortBy(
            highlightedItemIds.map(highlightedItemId => ({
                item: highlightedItemId,
                idx: items.map(item => item.id).indexOf(highlightedItemId),
            })),
            'idx'
        )

        const highlightedAboveDestination = indexedItemsToMove.filter(
            item => item.idx < destinationIndex
        )

        const newDestinationIndex =
            destinationIndex - highlightedAboveDestination.length

        indexedItemsToMove.forEach(indexed => {
            const idx = list.indexOf(indexed.item)
            list.splice(idx, 1)
        })

        indexedItemsToMove.forEach((indexed, i) => {
            list.splice(newDestinationIndex + i, 0, indexed.item)
        })
    } else {
        list.splice(sourceIndex, 1)
        list.splice(destinationIndex, 0, draggableId)
    }

    return list
}

export const styles = theme => ({
    card: {
        margin: '4px',
        marginBottom: '6px',
        position: 'relative',
    },
    actions: {
        marginTop: '0px',
        marginRight: '-4px',
        '& button': {
            padding: theme.spacing.unit * 0.5,
        },
    },
    header: {
        padding: '4px 12px 4px 12px',
    },
    title: {
        fontSize: 15,
        fontWeight: 500,
    },
    content: {
        padding: 0,
        paddingBottom: '0 !important',
        borderTop: '1px solid lightgrey',
    },
    collapse: {
        clear: 'both',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});
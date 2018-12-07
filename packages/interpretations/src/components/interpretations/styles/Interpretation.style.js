export const styles = theme => ({
    interpretationDescSection: {
        fontSize: '12px',
        backgroundColor: 'rgb(239, 239, 239)',
        borderRadius: '4px',
        padding: '5px',
    },
    interpretationName: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    date: {
        color: '#9e9999',
        fontWeight: 'normal',
    },
    interpretationTextWrapper: {
        marginBottom: '5px',
        marginLeft: '0px',
        marginTop: '5px',
    },
    interpretationText: {
        whiteSpace: 'pre-line',
        lineHeight: '1.5em',
        wordBreak: 'break-all',
    },
    interpretationTextLimited: {
        display: 'block',
        textOverflow: 'ellipsis',
        wordWrap: 'break-word',
        overflow: 'hidden',
        maxHeight: '3.0em',
        lineHeight: '1.5em',
        whiteSpace: 'pre-line'
    },
    interpretationCommentArea: {
        fontSize: '12px',
        margin: '2px 0 5px 0px',
        color: 'grey',
    },
    intepretationLikes: {
        paddingRight: '5px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '16px',
        marginRight: '50%',
    },
});
import css from 'styled-jsx/css'

export default css`
    .unselected-list-container {
        flex: 1;
        overflow-y: auto;
    }

    .unselected-list {
        border-bottom: 0px;
        list-style: none;
        margin: 0px;
        padding-left: 0px;
        user-select: none;
    }

    .unselected-list-item {
        display: flex;
        margin: 2px;
    }

    .select-all-button {
        display: block;
        margin: 0 auto;
        padding: 5px;
    }

    .select-highlighted-button {
        left: 429px;
        position: absolute;
        top: 230px;
    }
`;

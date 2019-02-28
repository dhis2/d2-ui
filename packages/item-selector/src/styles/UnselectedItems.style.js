import css from 'styled-jsx/css'

export default css`
    .unselected-list {
        user-select: none;
        list-style: none;
        border-bottom: 0px;
        padding-left: 0px;
        margin: 0px;
    }

    .unselected-list-container {
        flex: 1;
        overflow-y: auto;
    }

    .unselected-list-item {
        display: flex;
        margin: 2px;
    }

    .unselected-list-item:hover {
        background-color: #e0e0e0;
    }

    .assign-button {
        position: absolute;
        left: 429px;
        top: 230px;
    }
`

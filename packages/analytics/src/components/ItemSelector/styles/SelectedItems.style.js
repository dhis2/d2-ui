import { colors } from './colors';
import css from 'styled-jsx/css'

export default css`
    .selected-list {
        flex: 1;
        height: 455px;
        list-style: none;
        margin: 0px;
        overflow-y: scroll;
        padding-left: 0px;
        user-select: none;
    }

    .selected-list-item {
        display: flex;
        margin: 2px;
    }

    .selected-list-item:focus {
        outline: none;
    }

    .subtitle-container {
        border-bottom: 1px solid ${colors.greyLight};
        height: 42px;
    }

    .subtitle-text {
        color: ${colors.black};
        height: 20px;
        font-family: Roboto;
        font-size: 15px;
        font-weight: 500;
        left: 8px;
        position: relative;
        top: 12px;
    }

    .deselect-all-button {
        display: block;
        margin: 0 auto;
        padding: 5px;
    }

    .deselect-highlighted-button {
        left: -48px;
        position: absolute;
        top: 291px;
    }
`

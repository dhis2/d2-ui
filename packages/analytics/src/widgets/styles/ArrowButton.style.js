import { colors } from '../../styles/colors';
import css from 'styled-jsx/css';

export default css`
    .arrow-button {
        background-color: ${colors.white};
        border-radius: 4px;
        box-shadow: 0px 2px 5px #b1b1b1;
        height: 36px;
        min-height: 36px;
        min-width: 40px;
        padding: 0px;
        width: 40px;
    }

    .arrow-icon {
        fill: ${colors.greyDark},
        height: 20px;
        width: 24px;
    }
`;

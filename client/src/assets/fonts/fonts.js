import { createGlobalStyle } from 'styled-components';

import Zwizz from './Zwizz-Regular.woff';

export default createGlobalStyle`
    @font-face {
        font-family: "Zwizz";
        src: local("Zwizz"), url(${Zwizz});
        font-weight: 300;
    }
`
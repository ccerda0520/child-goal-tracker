import { createGlobalStyle } from 'styled-components';
import { fontGray, gray } from './variables';
export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');

* {
    box-sizing: border-box;
    font-family: "Lato", sans-serif;
}

body {
    margin: 0;
    padding: 0;
    background: #f5f7f8;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 15px;
}
h1 {
    margin-top: 0;
    margin-bottom: 20px;
    line-height: 1.1;
    font-size: 36px;
    letter-spacing: 0;
}
h2 {
    font-size: 28px;
    font-weight: 400;
    color: ${gray};
    line-height: 1.1;
    letter-spacing: 0;
    padding: 0;
    margin-bottom: 15px
}
h3 {
    color: ${fontGray};
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 0;
    margin-top: 0;
}
a {
    color: #337abb;
    cursor: pointer;
}
div,
label {
    display: block;
    width: 100%;
}
button {
    cursor: pointer;
}
`;

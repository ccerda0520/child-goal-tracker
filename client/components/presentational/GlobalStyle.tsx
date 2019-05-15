import { createGlobalStyle } from 'styled-components';
const gray = '#585858';
export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
* {
    box-sizing: border-box;
    font-family: "Lato", sans-serif;
    font-size: 15px;
}
body {
    margin: 0;
    padding: 0;
    background: #f5f5f5;
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
    padding: 0 25px;
    margin-bottom: 15px
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

input[type="text"],
input[type="email"],
input[type="password"],
textarea {
    width: 100%;
}

button {
    cursor: pointer;
}
`;

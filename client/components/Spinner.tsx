import styled, { keyframes } from 'styled-components';
import { LoaderAlt } from 'styled-icons/boxicons-regular/LoaderAlt';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(LoaderAlt)`
    display: inline-block;
    color: #adb5bd;
    animation: ${rotate} 2s linear infinite;
    height: 45px;
`;

export default Spinner;

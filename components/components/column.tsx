import styled from "styled-components";

const Column = styled.div<{ slim?: boolean }>`
  width: ${(props) => (props.slim ? 1000 : 1140)}px;
  margin: 0 auto;
`;

export default Column;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Heading = (props) => {
  return <H2>{props.children}</H2>;
};

Heading.propTypes = {
  children: PropTypes.element,
};

export default Heading;

const H2 = styled.h2`
  color: rgba(0, 0, 0, 0.87);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 29px;
  text-align: center;
`;

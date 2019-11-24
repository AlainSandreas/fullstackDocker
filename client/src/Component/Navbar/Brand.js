import React from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';

import logo from "../../assets/logo.png";

const Brand = () => {
  return (
    <Link to="/"><Image src={logo} alt="Company Logo" /></Link>
  )
}

export default Brand

const Image = styled.img`
  height: 85%;
  margin: auto 0;
  cursor:pointer;
`;
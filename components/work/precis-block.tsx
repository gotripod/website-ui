import React from "react";
import Column from "../column";
import styled from "styled-components";

interface Props {
  technologies: any[];
  services: any[];
}

const PrecisBlock = ({ technologies, services }: Props) => {
  return (
    <SColumn>
      <div>
        <p>Our involvement in this project included the following:</p>
        <ul></ul>
      </div>

      <div>
        <p>We made use of these technologies along the way:</p>
        <ul>
          {technologies.map((t, i) => (
            <li key={i}>{t.itemBody}</li>
          ))}
        </ul>
      </div>

      <div className="col-lg-3 col-md-10 offset-md-1">
        <p>So, what would you like to do next?</p>
        <ul className="list">
          <li>
            <a href="/work/curious-ways/">See another example of our work</a>
          </li>
          <li>
            <a href="/work/">Go back to the Work overview page</a>
          </li>
          <li>
            <a href="/contact/">Contact us</a>
          </li>
        </ul>
      </div>
    </SColumn>
  );
};

const SColumn = styled(Column)``;
export default PrecisBlock;

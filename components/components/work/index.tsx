import styled from "styled-components";
import Column from "../column";
import Link from "../link";
import PageTitle from "../page-title";

const Work = ({ projects }) => {
  console.log(projects);
  return (
    <Column>
      <PageTitle title="Work" subTitle="A selection of recent projects" />
      <Wrapper>
        {projects.map((project) => {
          return (
            <Slink key={project.id} link={project.link} img={project.logoUrl}>
              ok
            </Slink>
          );
        })}
      </Wrapper>
    </Column>
  );
};

export default Work;

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -13px;
`;

const Slink = styled(Link)<{ img: string }>`
  margin: 13px;
  background: url(${(props) => props.img});
  height: 270px;
  display: inline-block;
  width: 330px;
  background-size: auto 540px;

  &:hover {
    background-position: 0 270px;
  }
`;

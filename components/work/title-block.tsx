import React from "react";

interface Props {
  title: string;
  body: string;
}

const TitleBlock = ({ title, body }: Props) => {
  return (
    <div>
      <h2>{title}</h2>

      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};

export default TitleBlock;

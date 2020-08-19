import React from "react";

interface Props {
  body: string;
}

const IntroBlock = ({ body }: Props) => {
  return <section dangerouslySetInnerHTML={{ __html: body }} />;
};

export default IntroBlock;

import React from "react";
import Column from "../column";
import PageTitle from "../page-title";
import Map from "./map";

const Contact = () => {
  return (
    <>
      <Column slim>
        <PageTitle
          title="Want the internet to work for you?"
          subTitle="Let's talk"
        />
      </Column>
      <Column>
        <Map />
      </Column>
    </>
  );
};

export default Contact;

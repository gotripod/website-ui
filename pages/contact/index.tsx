import React from "react";
import Column from "../../components/column";
import Map from "../../components/contact/map";
import Layout from "../../components/layout";
import PageTitle from "../../components/page-title";

const Contact = () => {
  return (
    <Layout>
      <Column slim>
        <PageTitle
          title="Want the internet to work for you?"
          subTitle="Let's talk"
        />
      </Column>
      <Column>
        <Map />
      </Column>
    </Layout>
  );
};

export default Contact;

import Layout from "../components/Layout.js";
import Link from "next/link";
import axios from "axios";
import humps from "humps";
import Carousel from "../components/Carousel.js";
import Posts from "../components/Posts.js";
import Services from "../components/Services.js";
import Footer from "../components/Footer.js";
import ContactForm from "../components/ContactForm.js";

const Index = ({ carousel, services, posts }) => {
  return (
    <Layout>
      <header className="head">
        <div className="head__mobile">
          <div className="button--mobile hamburger hamburger--htla">
            <span />
          </div>
          <a href="/" className="head__logo">
            {" "}
            <img
              src="https://gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/gt-logo-colour-on-black.svg"
              alt="Go Tripod"
              className="loading"
              data-was-processed="true"
            />
          </a>
        </div>
        <Carousel data={carousel} />
      </header>
      <main className="main">
        <div className="main__wrap">
          <div className="r">
            <div className="col-lg">
              <Services data={services} />
            </div>
          </div>

          <div className="r">
            <div className="col-lg">
              <div className="s__wrap">
                <div className="r">
                  <div className="col-lg-10 offset-lg-1">
                    <h1 className="s__title">
                      Here's what we've been up to recently&#8230;
                    </h1>

                    <Posts data={posts} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="r">
            <div className="col-lg">
              <div className="s__wrap">
                <div className="r">
                  <div className="col-lg-10 offset-lg-1 col-md-10 offset-md-1">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

Index.getInitialProps = async function() {
  let postData = (await axios.get(
    "https://gotripod.com/wp-json/wp/v2/posts?per_page=3"
  )).data;
  let acfData = (await axios.get(
    "https://gotripod.com//wp-json/acf/v3/pages/5"
  )).data;

  acfData = humps.camelizeKeys(acfData.acf);

  let carouselImages = acfData.carouselSlides.map(x =>
    axios.get(`https://gotripod.com//wp-json/wp/v2/media/${x.slideImage}`)
  );
  let serviceImages = acfData.serviceBuilder.map(x =>
    axios.get(`https://gotripod.com//wp-json/wp/v2/media/${x.serviceImage}`)
  );

  const carouselResults = await Promise.all(carouselImages);

  carouselResults.forEach((result, idx) => {
    acfData.carouselSlides[idx].slideImage = humps.camelizeKeys(result.data);
  });

  const serviceResults = await Promise.all(serviceImages);

  serviceResults.forEach((result, idx) => {
    acfData.serviceBuilder[idx].serviceImage = humps.camelizeKeys(result.data);
  });

  return {
    carousel: acfData.carouselSlides,
    services: acfData.serviceBuilder,
    posts: humps.camelizeKeys(postData)
  };
};

export default Index;

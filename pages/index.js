import Layout from "../components/Layout.js";
import Link from "next/link";
import axios from "axios";
import humps from "humps";
import Carousel from "../components/Carousel.js";
import Posts from "../components/Posts.js";
import Services from "../components/Services.js";
import Footer from "../components/Footer.js";

const Index = ({ carousel, services, posts }) => {
  console.log(carousel, services, posts);
  return (
    <Layout>
      <header className="header">
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
                    <h1 className="s__title">Got an idea for a project?</h1>

                    <div className="s__body rte">
                      <p>
                        Need a website? Web-enabled software to streamline your
                        business? Just some advice? A hug?
                      </p>
                    </div>

                    <form
                      className="form form--contact"
                      accept-charset="UTF-8"
                      action="https://usebasin.com/f/608feeaf0fac"
                      method="post"
                    >
                      <fieldset className="form__fieldset">
                        <div className="r">
                          <div className="col-lg-6 col-md-6">
                            <div className="form__row">
                              <div className="input">
                                <label for="message" className="input__label">
                                  Message&amp;ast;
                                </label>
                                <textarea
                                  type="text"
                                  id="message"
                                  name="message"
                                  className="input__field"
                                  rows="9"
                                  required=""
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="form__row">
                              <div className="input">
                                <label for="name" className="input__label">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  className="input__field"
                                />
                              </div>
                            </div>

                            <div className="form__row">
                              <div className="input">
                                <label for="email" className="input__label">
                                  Email&amp;ast;
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  className="input__field"
                                  required=""
                                />
                              </div>
                            </div>

                            <div className="form__actions">
                              <input
                                type="hidden"
                                name="source"
                                value="https://gotripod.com/"
                              />{" "}
                              <button
                                className="button button--grey"
                                type="submit"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </form>
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
  let postData = (await axios.get("https://gotripod.com/wp-json/wp/v2/posts"))
    .data;
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
  //console.log(acfData.carouselSlides);

  return {
    carousel: acfData.carouselSlides,
    services: acfData.serviceBuilder,
    posts: humps.camelizeKeys(postData)
  };
};

export default Index;

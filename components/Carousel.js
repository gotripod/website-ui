export default ({ data }) => (
  <React.Fragment>
    <div className="hero">
      <div className="hero__parallax" data-parallax="true" data-speed="0.5">
        {data.map(slide => (
          <div className="hero__slide" key={slide.slideImage.sourceUrl}>
            <img
              data-src={slide.slideImage.sourceUrl}
              data-srcset={slide.slideImage.sourceUrl}
              className="hero__image"
              alt=""
            />{" "}
          </div>
        ))}
      </div>
    </div>
    <div className="head__wrap">
      <div className="mask" />

      <div className="inner">
        <ul className="list head-nav__list">
          <li className="head-nav__item menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-5 current_page_item menu-item-15">
            <a href="/" className="head-nav__link">
              <span>Home</span>
            </a>
          </li>

          <li className="head-nav__item menu-item menu-item-type-post_type menu-item-object-page menu-item-30">
            <a href="/insights/" className="head-nav__link">
              <span>Insights</span>
            </a>
          </li>

          <li className="head-nav__item menu-item menu-item-type-post_type menu-item-object-page menu-item-44">
            <a href="/contact/" className="head-nav__link">
              <span>Contact</span>
            </a>
          </li>
        </ul>

        <div className="carousel">
          <div className="carousel__tray">
            {data.map(slide => (
              <div className="carousel__item">
                <p>
                  The Internet can empower your business to expand and thrive.
                </p>
              </div>
            ))}
          </div>

          <div className="carousel__counter">
            <span className="current">1</span> <span className="total">4</span>
          </div>

          <div className="carousel__control carousel__control--prev" />

          <div className="carousel__control carousel__control--next" />
        </div>
      </div>

      <div className="mask" />
    </div>
  </React.Fragment>
);

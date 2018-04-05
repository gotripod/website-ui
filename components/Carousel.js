import Navigation from '../components/Navigation'

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
        <Navigation />

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

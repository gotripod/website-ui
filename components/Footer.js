export default () => (
  <React.Fragment>
    <ul className="list foot-nav__list">
      <li className="foot-nav__item">
        <a
          href="/"
          className="foot-nav__link menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-5 current_page_item menu-item-15"
        >
          <span>Home</span>
        </a>
      </li>

      <li className="foot-nav__item">
        <a
          href="/insights/"
          className="foot-nav__link menu-item menu-item-type-post_type menu-item-object-page menu-item-30"
        >
          <span>Insights</span>
        </a>
      </li>

      <li className="foot-nav__item">
        <a
          href="/contact/"
          className="foot-nav__link menu-item menu-item-type-post_type menu-item-object-page menu-item-44"
        >
          <span>Contact</span>
        </a>
      </li>
    </ul>

    <div
      className="foot__top"
      style={{
        backgroundImage:
          "/wp-content/themes/go-tripod/WPGulp/assets/img/bg-footer-stripes.svg"
      }}
    >
      <div className="r">
        <div className="col-lg">
          <a href="/" className="foot__logo">
            <img
              src="/wp-content/themes/go-tripod/WPGulp/assets/img/gt-logo-mono-on-black.svg"
              alt="Go Tripod"
            />
          </a>{" "}
          <img
            src="/wp-content/themes/go-tripod/WPGulp/assets/img/yus-footer.svg"
            className="foot__icon"
            alt=""
          />
        </div>
      </div>
    </div>

    <div className="foot__middle">
      <div className="r">
        <div className="col-lg-4 offset-lg-1">
          <ul className="list contact-list">
            <li className="contact-list__item">
              <a
                href="/cdn-cgi/l/email-protection#b7dfd2dbdbd8f7d0d8c3c5dec7d8d399d4d8da"
                className="contact-list__link"
              >
                <span
                  className="__cf_email__"
                  data-cfemail="335b565f5f5c73545c47415a435c571d505c5e"
                >
                  [email&nbsp;protected]
                </span>
              </a>
            </li>

            <li className="contact-list__item">
              <a
                href="tel:+448454752487"
                className="contact-list__link contact-list__link--phone"
              >
                +44 (0) 845 475 2487
              </a>
            </li>
          </ul>
        </div>

        <div className="col-lg-3 first-lg col-md-6">
          <p>
            Tremough Innovation Centre,<br />
            Penryn, Cornwall, TR10 9TA, UK
          </p>

          <div className="social">
            <ul className="list social-list">
              <li className="social-list__item">
                <a
                  href="https://twitter.com/gotripod"
                  className="social-list__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow Go Tripod on Twitter (opens in new window)"
                />
              </li>

              <li className="social-list__item">
                <a
                  href="https://www.facebook.com/gotripod"
                  className="social-list__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Like Go Tripod on Facebook (opens in new window)"
                />
              </li>

              <li className="social-list__item">
                <a
                  href="https://www.linkedin.com/company/go-tripod-ltd"
                  className="social-list__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow Go Tripod on LinkedIn (opens in new window)"
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-3 offset-lg-1 col-md-6">
          <p>
            Need more mail?<br />
            Get our occassional newsletter:
          </p>

          <form
            className="form form--inline"
            action="https://techfusion.createsend.com/t/r/s/tduillt/"
            method="post"
          >
            <fieldset className="form__fieldset">
              <div className="form__row">
                <div className="input">
                  <input
                    type="email"
                    id="cm-tduillt-tduillt"
                    name="cm-tduillt-tduillt"
                    className="input__field"
                    placeholder="Email address"
                    required=""
                  />
                </div>
                <button className="button button--blue-light" type="submit">
                  Go
                </button>
              </div>
            </fieldset>
          </form>

          <p className="alert alert--info form-alert">
            Thanks. Check your email!
          </p>
        </div>
      </div>
    </div>

    <div className="foot__bottom">
      <div className="r">
        <div className="col-lg">
          <p>
            &#169; 2018 Go Tripod.&#8195;All rights reserved.&#8195;Registered
            in the UK company number 6912029.&#8195;VAT No. 972 5228 06.
          </p>
        </div>
      </div>
    </div>

    <div className="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div className="pswp__bg" />

      <div className="pswp__scroll-wrap">
        <div className="pswp__container">
          <div className="pswp__item" />

          <div className="pswp__item" />

          <div className="pswp__item" />
        </div>

        <div className="pswp__ui pswp__ui--hidden">
          <div className="pswp__top-bar">
            <div className="pswp__counter" />

            <div className="pswp__preloader">
              <div className="pswp__preloader__icn">
                <div className="pswp__preloader__cut">
                  <div className="pswp__preloader__donut" />
                </div>
              </div>
            </div>
          </div>

          <div className="pswp__caption">
            <div className="pswp__caption__center" />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

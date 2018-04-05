export default ({ data }) => (
  <ul className="list service-list">
    {data.map((service, idx) => (
      <li className="service-list__item" key={service.serviceTitle}>
        <div className="service">
          <div className="service__image">
            <img
              data-src={`${service.serviceImage.sourceUrl}`}
              alt=""
            />{" "}
            <noscript>
              <img
                src="https://www.gotripod.com/"
                alt=""
              />
            </noscript>
          </div>

          <div className="service__content">
            { idx === 0 ? <h1 className="service__title">We are Go Tripod.</h1> : null }

            <h2 className="service__subtitle">{service.serviceTitle}</h2>

            <div className="service__body rte" dangerouslySetInnerHTML={{ __html: service.serviceBody }} />
            <a href="/contact" className="button button--alt button--turquoise">
              Enquire
            </a>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

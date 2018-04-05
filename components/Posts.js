export default ({ data }) => (
  <div>
    <ul className="list news-list">
      {data.map(post => (
        <li className="news-list__item">
          <div className="news__meta">03/04/2018</div>

          <h2 className="news__title" dangerouslySetInnerHTML={{ __html: post.title.rendered}} />
          <a
            href="/insights/work-smarter-not-harder-vs-code/"
            className="news__link"
          >
            Read more
          </a>
        </li>
      ))}
    </ul>
    <a href="/insights" className="button button--alt button--blue">
      See them all
    </a>
  </div>
);

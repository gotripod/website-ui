export default () => (
  <React.Fragment>
    <h1 className="s__title">Got an idea for a project?</h1>

    <div className="s__body rte">
      <p>
        Need a website? Web-enabled software to streamline your business? Just
        some advice? A hug?
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
              <button className="button button--grey" type="submit">
                Send
              </button>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </React.Fragment>
);

import React, { Fragment } from 'react'

const Home = () => (
  <Fragment>
    <section className="home-section" id="home-main-section">
      <p>Tracking your packages is now <b>simple</b>!</p>
      <img src={"./logo.png"} id="home-header-logo"></img>
      <div>
        <form id="home-tracking-form">
          <input name="tracking-number-input" placeholder="Example: UI211585462CN"></input>
          <button className="form-button-active"><i className="fas fa-search"></i></button>
        </form>
      </div>
    </section>
    <section className="home-section" id="online-shopping-support-info">
      <p>Online shopping support:</p>
      <div id="online-shopping-support-logos">
        <img src={"./online-shopping/amazon-logo.png"}></img>
        <img src={"./online-shopping/aliexpress-logo.png"}></img>
        <img src={"./online-shopping/ebay-logo.png"}></img>
      </div>
    </section>
    <section className="home-section" id="services-info">
      <div className="single-service-info">
        <i class="fas fa-cubes"></i>
        <h3>Easy tracking of your packages</h3>
        <p>Meeting point of sellers and customers. Track by order identificator</p>
      </div>
      <div className="single-service-info">
        <i class="far fa-envelope-open"></i>
        <h3>Receive status notifications</h3>
        <p>Choose your prefered way to get notified (SMS, Email)</p>
      </div>
      <div className="single-service-info">
        <i class="fas fa-money-check-alt"></i>
        <h3>Get access to premium features</h3>
        <p>Our premium services provide you...</p>
      </div>
    </section>
  </Fragment>
)

export default Home

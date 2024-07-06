import React from "react";

const Steps = () => {
  return (
    <section className="roadmap pt-120 pb-120" id="roadmap">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xxl-7">
            <div className="heading__content mb-10 mb-lg-15 text-center">
              <h1 className="display-four mb-5 mb-lg-6">Roadmap to use</h1>
              <p className="fs-six-up mx-ch mx-auto">


    "Our roadmap guides users through secure registration, intuitive interfaces, and transparent blockchain interactions, evolving with user feedback."
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="roadmap__content">
              <span className="roadmap__line"></span>
              <div className="roadmap__part">
                <div className="event cus-rounded-1 p-4 p-md-5 p-xxl-10 me-5">
                  <span className="heading fs-three p1-color mb-3">1.</span>
                  <h4>Introducton</h4>
                  <p className="mt-4">
                  "Seamlessly register, interact, and innovate with our user-friendly blockchain DApp."
                  </p>
                </div>
              </div>
              <div className="roadmap__part">
                <div className="event cus-rounded-1 p-4 p-md-5 p-xxl-10">
                  <span className="heading fs-three p1-color mb-3">2.</span>
                  <h4>Create Metamask account & connect</h4>
                  <p className="mt-4">
                  "Create a Metamask account to securely interact with blockchain applications and manage digital assets."{" "}
                  </p>
                </div>
              </div>
              <div className="roadmap__part">
                <div className="event cus-rounded-1 p-4 p-md-5 p-xxl-10 me-5">
                  <span className="heading fs-three p1-color mb-3">3.</span>
                  <h4>Register as Voter / Candidate </h4>
                  <p className="mt-4">
                    For registration provide all the necessary information and documents asked.
                  </p>
                </div>
              </div>
              <div className="roadmap__part">
                <div className="event cus-rounded-1 p-4 p-md-5 p-xxl-10">
                  <span className="heading fs-three p1-color mb-3">4.</span>
                  <h4>Verifiction</h4>
                  <p className="mt-4">
                    Once registered wait for the confirmation by admin.
                  </p>
                </div>
              </div>
              <div className="roadmap__part">
                <div className="event cus-rounded-1 p-4 p-md-5 p-xxl-10 me-5">
                  <span className="heading fs-three p1-color mb-3">5.</span>
                  <h4>Ready to VOTE</h4>
                  <p className="mt-4">
                    {" "}
                    Once your account is varified by admin now you are eligible for voting.
                  </p>
                </div>
              </div>
              <div className="roadmap__part">
                <div className="event cus-rounded-1 p-4 p-md-5 p-xxl-10">
                  <span className="heading fs-three p1-color mb-3">6.</span>
                  <h4>View Results</h4>
                  <p className="mt-4">
                    View results within no-time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;

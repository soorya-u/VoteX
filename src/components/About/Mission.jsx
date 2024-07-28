const Mission = () => {
  return (
    <section className="provide-world our_mission pt-120 pb-120 position-relative z-0">
      <div className="animation position-absolute top-0 left-0 w-100 h-100 z-n1">
        <img
          src="assets/images/vector8.png"
          alt="vector"
          className="position-absolute bottom-0 pt-6 pt-xl-15 d-none d-lg-flex push_animat"
        />
      </div>
      <div className="container">
        <div className="row justify-content-between align-items-center mb-10 mb-lg-15">
          <div className="col-xl-5">
            <span className="heading s1-color fs-five mb-5">Our Mission</span>
            <h3>Empowering Success How We&apos;re Making a Difference</h3>
          </div>
          <div className="col-xl-4">
            <p className="fs-six-up mx-ch text-xl-end mt-3 mt-xl-0">
              we believe that success is not reserved for the privileged few.
              It&apos;s a journey that anyone can embark upon with right
              guidance
            </p>
          </div>
        </div>
        <div className="row gy-6 gy-xxl-0">
          <div className="col-md-6 col-xxl-4">
            <div className="provide-world__card nb3-bg text-center cus-rounded-1 py-5 py-lg-10 px-4 px-lg-9">
              <span className="provide-card__icon d-center nb4-bg p-4 rounded-circle mx-auto">
                <i className="ti ti-users  fs-three p1-color"></i>
              </span>
              <h4 className="mt-5 mb-5">Client-first approach</h4>
              <p>
                Transformed the voting landscape. By leveraging blockchain
                technology, our app has made it easier than ever for individuals
                to securely and transparently participate in voting processes
                from anywhere.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xxl-4">
            <div className="provide-world__card nb3-bg text-center cus-rounded-1 py-5 py-lg-10 px-4 px-lg-9">
              <span className="provide-card__icon d-center nb4-bg p-4 rounded-circle mx-auto">
                <i className="ti ti-shield fs-three p1-color"></i>
              </span>
              <h4 className="mt-5 mb-5">Integrity and Compliance</h4>
              <p>
                One of the fundamental principles of voting is security and
                transparency. Successful voting systems ensure that each vote is
                accurately recorded and counted, providing voters with
                confidence in the electoral process.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-xxl-4">
            <div className="provide-world__card nb3-bg text-center cus-rounded-1 py-5 py-lg-10 px-4 px-lg-9">
              <span className="provide-card__icon d-center nb4-bg p-4 rounded-circle mx-auto">
                <i className="ti ti-bolt fs-three p1-color"></i>
              </span>
              <h4 className="mt-5 mb-5">Fast Execution</h4>
              <p>
                Voting is not without its challenges, as ensuring the security
                and integrity of the process can be complex and demanding. It
                requires rigorous measures to prevent fraud and ensure
                transparency, fostering trust and participation among voters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;


const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted py-2">
      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <img src="https://res.cloudinary.com/do63p55lo/image/upload/v1642435427/ElectonicStore/logo/logo_vmcz7e.png" alt="logo" />
              </h6>
              <p>
              E-commerce is revolutionizing the way we all shop in India. Why do you want to hop from one store to another in search of the latest phone when you can find it on the Internet in a single click? Not only mobiles.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Products
              </h6>
              <p>Mobile</p>
              <p>Laptop</p>
              <p>SmartWatch</p>
              <p>Earphones</p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Useful links
              </h6>
              <p>Pricing</p>
              <p>Settings</p>
              <p>Orders</p>
              <p>Help</p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Contact
              </h6>
              <p>Mumbai, 400012, IN</p>
              <p>info@example.com</p>
              <p>+91 956 032 0001</p>
              <p>+91 956 032 0002</p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        © 2022 Copyright ElectronicStore.com
      </div>
    </footer>
  )
}

export default Footer
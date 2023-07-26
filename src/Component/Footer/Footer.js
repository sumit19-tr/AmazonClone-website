import React from "react";
import './Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <>
            <footer className="bg-dark text-center text-lg-start text-white mt-5">
                <div className="container p-4">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <p className="text-center">© Sumit Mehra Intern Trainee at edureka.</p>
                        </div>
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <div className="d-flex justify-content-center">
                                <a href="https://www.linkedin.com/in/sumit-mehra-76484a131/" target="_blank" className="me-4">
                                    <i className="fab fa-linkedin" style={{ fontSize: "32px" }}></i>
                                </a>
                                <a href="https://github.com/sumit19-tr" target="_blank">
                                    <i className="fab fa-github" style={{ fontSize: "32px" }}></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="backtotop c3">
                <center>
                    <button onClick={handleScroll}>Back to top</button>
                </center>
            </div>

            <footer className="footer bg-dark text-center text-lg-start">
                <div className="container p-4">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                            <article className="heading">
                                <h2>Get to know Us</h2>
                            </article>
                            <article className="list">
                                <ul>
                                    <li><Link to="" className="text-white">About Us</Link></li>
                                    <li><Link to="" className="text-white">Careers</Link></li>
                                    <li><Link to="" className="text-white">Press Releases</Link></li>
                                    <li><Link to="" className="text-white">Amazon Science</Link></li>
                                </ul>
                            </article>
                        </div>
                        <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                            <article className="heading">
                                <h2>Connect with Us</h2>
                            </article>
                            <article className="list">
                                <ul>
                                    <li><Link to="" className="text-white">Facebook</Link></li>
                                    <li><Link to="" className="text-white">Twitter</Link></li>
                                    <li><Link to="" className="text-white">Instagram</Link></li>
                                </ul>
                            </article>
                        </div>
                        <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                            <article className="heading">
                                <h2>Let Us Help You</h2>
                            </article>
                            <article className="list">
                                <ul>
                                    <li><Link to="" className="text-white">Your Account</Link></li>
                                    <li><Link to="" className="text-white">Returns</Link></li>
                                    <li><Link to="" className="text-white">Amazon App Download</Link></li>
                                    <li><Link to="" className="text-white">Amazon Assistant</Link></li>
                                    <li><Link to="" className="text-white">Help</Link></li>
                                </ul>
                            </article>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;

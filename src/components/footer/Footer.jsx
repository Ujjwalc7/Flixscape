import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../content Wrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
  return (
      <footer className="footer">
          <ContentWrapper>
              <ul className="menuItems">
                  <li className="menuItem">Terms Of Use</li>
                  <li className="menuItem">Privacy-Policy</li>
                  <li className="menuItem">About</li>
                  <li className="menuItem">Blog</li>
                  <li className="menuItem">FAQ</li>
              </ul>
              <div className="infoText">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit
                  esse cillum dolore eu fugiat nulla pariatur.
              </div>
              <div className="socialIcons">
                  <span className="icon">
                    <a href=""><FaFacebookF /></a>
                  </span>
                  <span className="icon">
                      <a href="https://www.instagram.com/___ujjwalc7___/?next=%2F"><FaInstagram /></a>
                  </span>
                  <span className="icon">
                      <a href="https://twitter.com/Ujjwalc7"><FaTwitter /></a>
                  </span>
                  <span className="icon">
                      <a href="https://www.linkedin.com/in/ujjwal-kisku-1b45ab238/"><FaLinkedin /></a>
                  </span>
              </div>
          </ContentWrapper>
      </footer>
  );
};

export default Footer;

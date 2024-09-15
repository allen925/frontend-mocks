import '../styles/main.scss';
import '../styles/footer.scss';
import { footerTopIcons, footerMidSections, Certified } from '../consts';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-top-container'>
        {footerTopIcons.map((icon, index) => (
          <div key={index} className={`footerTopIcons`}>
            <img src={icon.image} alt={icon.title} />
          </div>
        ))}
      </div>
      <div className='footer-mid-container'>
        {footerMidSections.map((section, index) => (
          <div key={index} className={`footer-section ${index < 4 ? 'span-two' : ''}`}>
            <h2 className="footer-section-header">
              <a href="https://www.nintendo.com/us/store/products/stardew-valley-switch/">
                {section.header}
              </a>
            </h2>
            <ul>
              {section.links.map((link, index) => (
                <li key={index}>
                  <a href="https://www.nintendo.com/us/store/products/stardew-valley-switch/">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='certified'>
        <a href={Certified.link}>
          <img src={Certified.image} alt={Certified.title} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

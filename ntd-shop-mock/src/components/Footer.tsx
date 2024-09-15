import '../styles/main.scss';
import '../styles/footer.scss';
import { footerTopIcons, footerMidSections, Certified, footerBottomRow } from '../consts';
import USA from "/src/assets/USAIcon.webp";

const Footer = () => {
  console.log(USA)
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
      <div className='footer-bot-container'>
        <p style={{ margin: 0, padding: 0 }}>
          <span>
            © Nintendo.
          </span>
          <span>
            Games are property of their respective owners.
          </span>
          <span>
            Nintendo of America Inc. Headquarters are in Redmond, Washington, USA
          </span>
        </p>
        <div>
          {footerBottomRow.map((item, index) => (
            <a href={item.link} key={index}>
              {item.title}
            </a>
          ))}
        </div>
        <div>
          <a href="https://www.nintendo.com/us/store/products/stardew-valley-switch/" className='local'>
            <img src={USA} className='icon' />
          </a>
          <a href="https://www.nintendo.com/us/store/products/stardew-valley-switch/" className='local'>
            English (United States)
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

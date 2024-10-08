import { SlideProps } from "./types/carousel.types";
import { CertifiedProps, IconProps, MidSectionProps, FooterRow } from "./types/footer.types";
import { NavSearchCategories, NavSearchDropProduct, NavSearchDropTopic } from "./types/nav.types";

export const originalSlides: SlideProps[] = [
  { image: "/src/assets/image0.avif", title: "Image 0" },
  { image: "/src/assets/image1.avif", title: "Image 1" },
  { image: "/src/assets/image2.avif", title: "Image 2" },
  { image: "/src/assets/image3.avif", title: "Image 3" },
  { image: "/src/assets/image4.avif", title: "Image 4" },
  { image: "/src/assets/image5.avif", title: "Image 5" },
  { image: "/src/assets/image6.avif", title: "Image 6" }
];

export const footerTopIcons: IconProps[] = [
  { image: "/src/assets/footer0-ntd.svg", title: "ntd" },
  { image: "/src/assets/footer1-fb.svg", title: "fb" },
  { image: "/src/assets/footer2-ig.svg", title: "ig" },
  { image: "/src/assets/footer3-x.svg", title: "x" },
  { image: "/src/assets/footer4-ytb.svg", title: "yub" }
];

export const footerMidSections: MidSectionProps[] = [
  {
    header: "About Nintendo",
    links: [
      "Careers",
      "Corporate Social Responsibility"
    ]
  },
  {
    header: "Shop",
    links: [
      "Games",
      "Hardware",
      "Merchandise",
      "Sales & Deals",
      "Exclusives",
      "Online Service",
      "Nintendo NY Store"
    ]
  },
  {
    header: "My Nintendo Store Orders",
    links: [
      "Order Details",
      "Shipping Info",
      "Returns & Exchanges",
      "FAQ"
    ]
  },
  {
    header: "Support",
    links: [
      "Nintendo Switch",
      "Nintendo Account",
      "Other Systems",
      "Repairs",
      "Nintendo Product Recycling"
    ]
  },
  {
    header: "Parents",
    links: [
      "Info for Parents",
      "Parental Controls"
    ]
  },
  {
    header: "Community",
    links: [
      "Community Guidelines",
      "Online Safety Principles"
    ]
  },
  {
    header: "Privacy",
    links: [
      "Privacy Policy",
      "Cookies and Interest-based Ads"
    ]
  }
];

export const Certified: CertifiedProps = {
  title: "ESRB Certified Icon",
  link: "https://www.esrb.org/EPCConfirm/891/",
  image: "/src/assets/Certified.svg"
}

export const footerBottomRow: FooterRow[] = [
  { title: "Contact us", link: "" },
  { title: "Website feedback", link: "" },
  { title: "Terms of Use", link: "" },
]

export const navSearchCategories: NavSearchCategories[] = [
  { title: "All categories" },
  { title: "Games" },
  { title: "Hardware" },
  { title: "Merchandise" },
  { title: "News & Events" },
  { title: "Support" },
]


export const navSearchDropTopics: NavSearchDropTopic[] = [
  { title: "Nintendo Switch™ - OLED Model: Mario Red Edition", link: "" },
  { title: "Nintendo Switch", link: "" },
  { title: "Super Mario Bros. Wonder", link: "" },
  { title: "Nintendo Switch games", link: "" },
  { title: "Zelda games", link: "" },
]

export const navSearchDropProducts: NavSearchDropProduct[] = [
  { title: "Nintendo Switch™ - OLED Model - Mario Red Edition", type: "Hardware", link: "", image: "" },
  { title: "Super Mario Bros.™ Wonder", type: "Nintendo Switch", link: "", image: "" },
  { title: "Super Mario RPG™", type: "Nintendo Switch", link: "", image: "" },
  { title: "WarioWare™: Move It!", type: "Nintendo Switch", link: "", image: "" },
]

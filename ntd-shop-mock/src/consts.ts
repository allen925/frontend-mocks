import { SlideProps } from "./types/carousel.types";
import { CertifiedProps, IconProps, MidSectionProps } from "./types/footer.types";

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
  { image: "/src/assets/footer0-ntd.png", title: "ntd" },
  { image: "/src/assets/footer1-fb.png", title: "fb" },
  { image: "/src/assets/footer2-ig.png", title: "ig" },
  { image: "/src/assets/footer3-x.png", title: "x" },
  { image: "/src/assets/footer4-ytb.png", title: "yub" }
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
  image: "/src/assets/Certified.png"
}
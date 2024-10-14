
  // Importing images
  import { Link } from 'react-router-dom'
import image1 from '../assets/images/footer1.webp'
  import image2 from '../assets/images/footer2.webp'
  import image3 from '../assets/images/footer3.webp'
  import image4 from '../assets/images/footer4.webp'

  // Variables
  const links = ["Home", "Product", "Contact", "About"];
  const footerImages = [
    { name: "image 1", src: image1 },
    { name: "image 2", src: image2 },
    { name: "image 3", src: image3 },
    { name: "image 4", src: image4 },
  ]

export default function Footer() {
return (
  <footer className="bg-custom-dark-blue text-slate-200 flex flex-wrap items-start justify-center gap-8 max-w-[1440px] mx-auto py-8 px-[5%]">
    <div className="w-300">
      <h1 className="oswald text-3xl mb-4">Our Mission</h1>
      <p className="text-sm text-custom-btn-gray">
        At ArbSale, our mission is to revolutionize the way people 
        shop by providing a seamless and enjoyable online shopping 
        experience. We strive to be the go-to destination for customers 
        seeking convenience, quality, and variety in their purchases.
      </p>
    </div>

    <div className="min-w-500 flex flex-wrap items-start justify-between gap-8">
      <div className="quickLinks w-250">
        <h2 className="oswald text-2xl mb-4">Quick Links</h2>
        <ul className="text-sm text-custom-btn-gray">
          {links.map(link => (
            <li key={link} className='mb-2'>
              <Link to="/">{link}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footerGallery w-250">
        <h2 className="oswald text-2xl mb-4">Gallery</h2>
        <div className="flex w-200 flex-wrap gap-4">
          {footerImages.map(image => (
            <img key={image.name} src={image.src} alt={image.name} />
          ))}
        </div>
      </div>

      <div className="footerContactUs w-250">
        <h2 className="oswald text-2xl mb-4">Contact Us</h2>

        <div className="headOffice mb-6 flex flex-wrap items-start gap-4 text-sm">
          <div className="p-2 rounded-full bg-custom-blue h-8 w-8 relative">
            <img className="rotate-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%]" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/ffffff/external-send-user-interface-tanah-basah-glyph-tanah-basah.png" alt="external-send-user-interface-tanah-basah-glyph-tanah-basah"/>
          </div>
          <div className="details">
            <h3 className="mb-2">Head Office</h3>
            <p className="text-custom-btn-gray">123, Main Street, Kaduna</p>
          </div>
        </div>

        <div className="phoneNumber mb-6 text-sm flex flex-wrap gap-4">
          <div className="p-2 rounded-full bg-custom-blue h-8 w-8 relative">
            <img className="-rotate-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%]" src="https://img.icons8.com/ios-filled/50/ffffff/phone.png" alt="phone"/>
          </div>
          <div className="details">
            <h3 className="mb-2">Phone Number</h3>
            <p className="text-custom-btn-gray">+234 123 456 789 0</p>
          </div>
        </div>

        <div className="email text-sm flex flex-wrap gap-4">
          <div className="p-2 rounded-full bg-custom-blue h-8 w-8 relative">
            <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%]" src="https://img.icons8.com/ios-filled/50/ffffff/mail.png" alt="mail"/>
          </div>
          <div className="details">
            <h3 className="mb-2">Email</h3>
            <p className="text-custom-btn-gray">aroma@website.com</p>
          </div>
        </div>
      </div>
    </div>

    <div className="footerText text-center bg-custom-dark-blue-shade">
      <p>Copyright ©2023 All rights reserved | This design was gotten from <a className="text-custom-blue underline underline-offset-2" href="https://preview.colorlib.com/">Colorlib</a></p>
    </div>
  </footer>
);
}
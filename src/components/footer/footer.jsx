import { Mail, Linkedin, Instagram, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-primary-light text-primary-dark py-6 text-center">
      <div className="container mx-auto px-4 sm:px-8">
        {/* TaskHub Brand */}
        <p className="text-lg font-semibold mb-2 hover:text-white cursor-pointer">TaskHub</p>
        <p className="text-sm opacity-75 mb-4">Organize. Track. Achieve.</p>

        {/* Social Media Links */}
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="https://www.linkedin.com/in/shashi-sahani-b73140185/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl p-2 rounded-full transition-all hover:text-white"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com/shashisahani/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl p-2 rounded-full transition-all hover:text-white"
          >
            <Instagram size={24} />
          </a>
          <a
            href="mailto:shashisahani496@gmail.com"
            className="text-xl p-2 rounded-full transition-all hover:text-white"
          >
            <Mail size={24} />
          </a>
        </div>

        {/* Address with Icon */}
        <div className="mt-6 text-sm opacity-75 flex justify-center items-center space-x-2">
          <MapPin size={20} className="hover:text-white"/>
          <a
            href="https://www.google.com/maps?q=1304+Officer+City+1,+Housing+Society,+Ghaziabad,+Uttar+Pradesh"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-white"
          >
            1304 Officer City 1, Housing Society, Ghaziabad, Uttar Pradesh
          </a>
        </div>

        {/* Google Map Embed */}
        <div className="mt-6">
          <div className="mapouter relative w-full overflow-hidden">
            <div className="gmap_canvas w-full">
              <iframe
                className="gmap_iframe mx-auto"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=600&height=400&hl=en&q=1304+Officer+City+1,+Housing+Society,+Ghaziabad,+Uttar+Pradesh&t=&z=14&ie=UTF8&iwloc=B&output=embed"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="mt-6">
          <p className="text-xs opacity-75 hover:text-white">
            © {new Date().getFullYear()} TaskHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

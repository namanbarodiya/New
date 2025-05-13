import Link from "next/link";
import { ETCIOLogo } from "@/components/common/ETCIOLogo";

export function Footer() {
  const footerLinks = {
    Platform: [
      { name: "Home", href: "/" },
      { name: "News", href: "/news" },
      { name: "Events", href: "/events" },
      { name: "Webinars", href: "/webinars" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/careers" },
      { name: "Advertise", href: "/advertise" },
    ],
    Resources: [
      { name: "Blog", href: "/blog" },
      { name: "Newsletters", href: "/newsletters" },
      { name: "Research", href: "/research" },
      { name: "Case Studies", href: "/case-studies" },
    ],
  };

  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <ETCIOLogo className="mb-4" />
            <p className="text-sm text-muted-foreground mt-4 max-w-xs">
              The go-to resource for IT decision-makers, providing insights, analysis, and news
              on emerging technologies.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-medium mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ETCIO.com. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ETCIOLogo } from "@/components/common/ETCIOLogo";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { name: "News", href: "/" },
    { name: "Exclusives", href: "/exclusives" },
    { name: "Leaders Speak", href: "/leaders-speak" },
    { name: "Events", href: "/events" },
    { name: "Awards", href: "/awards" },
    { name: "Webinars", href: "/webinars" },
    { name: "Brand Solutions", href: "/brand-solutions" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-6">
              <ETCIOLogo className="h-8 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-base font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 pb-3">
              <Button variant="outline" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
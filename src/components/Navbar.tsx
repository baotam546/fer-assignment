"use client"

import * as React from "react"

import { Book, BookOpen, CheckSquare, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link, Outlet } from "react-router-dom"

export function BookNavbar() {
  const [isOpen, setIsOpen] = React.useState(false)
//   const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    {
      name: "Reading Books",
      href: "/",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      name: "Unread Books",
      href: "/se11111/unreadBooks",
      icon: <Book className="mr-2 h-4 w-4" />,
    },
    {
      name: "Read",
      href: "/se11111/allBooks",
      icon: <CheckSquare className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <div>
         <nav className="border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <div  className="flex items-center font-bold text-xl">
              <Book className="mr-2 h-6 w-6" />
              <span>BookTracker</span>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                
                )}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-base font-medium rounded-md",
                 
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
    <Outlet />
    </div>
   
  )
}


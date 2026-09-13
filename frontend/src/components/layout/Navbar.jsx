import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Menu, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import useLogout from "@/hooks/mutations/useLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/questions", label: "Questions" },
  { to: "/tags", label: "Tags" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const { logout } = useLogout();
  const initial = user?.username?.charAt(0).toUpperCase() ?? "";
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) return;
    navigate(`/questions?search=${encodeURIComponent(trimmed)}`);
  }

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-15 px-6">
        <Link
          to="/"
          className="shrink-0 font-mono text-lg font-semibold tracking-tight text-foreground"
        >
          bug_journal
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex ">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="relative hidden sm:block">
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden sm:block"
            >
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="search"
                placeholder="Search questions"
                className="w-66 pl-8"
              />
            </form>
          </div>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/ask">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>

          <Button asChild size="icon" variant="default" className="sm:hidden">
            <Link to="/ask">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full">
                <Avatar>
                  {user.profileImage && (
                    <AvatarImage src={user.profileImage} alt={user.username} />
                  )}
                  <AvatarFallback>{initial}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/bookmarks">Bookmarks</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Hamburger — only below md */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-mono">bug_journal</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-6 px-4">
                <div className="relative">
                  <form
                    onSubmit={(e) => {
                      handleSearchSubmit(e);
                      setMobileOpen(false);
                    }}
                    className="relative"
                  >
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      type="search"
                      placeholder="Search questions"
                      className="pl-8"
                    />
                  </form>
                </div>

                {user && (
                  <Button asChild onClick={() => setMobileOpen(false)}>
                    <Link to="/ask">
                      <Plus className="h-4 w-4" />
                      Ask question
                    </Link>
                  </Button>
                )}

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.end}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `rounded-md px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>

                {!user && (
                  <div className="flex flex-col gap-2 border-t border-border pt-4">
                    <Button
                      asChild
                      variant="outline"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link to="/login">Log in</Link>
                    </Button>
                    <Button asChild onClick={() => setMobileOpen(false)}>
                      <Link to="/register">Sign up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

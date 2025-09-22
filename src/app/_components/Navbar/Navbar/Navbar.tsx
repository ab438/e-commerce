"use client";
import { cartcontext } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

interface ExtendedUser {
  name?: string;
  email?: string;
  role?: string;
  token?: string; // لو التوكن جاي من API
}

interface ExtendedSession {
  user?: ExtendedUser;
  accessToken?: string;
}

export default function Navbar() {
  const context = useContext(cartcontext);
  if (!context) throw new Error("Cart context not found");
  const { numbercartitem } = context;

  const { wishlist } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { data: rawSession } = useSession();
  const router = useRouter();

  // cast للنوع اللى فوق
  const session = rawSession as ExtendedSession | null;
  const user = session?.user;
  const token = session?.accessToken || session?.user?.token;

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  const handleWishlistClick = () => {
    if (!token) {
      toast.error("You must be logged in to access wishlist");
      return;
    }
    router.push("/wishlist");
  };

  return (
    <nav className="bg-emerald-600 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto w-full lg:w-[80%] flex justify-between items-center p-4">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <i className="fa-solid fa-cart-shopping"></i>
          <Link href="/">FreshCart</Link>
        </div>

        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="hidden lg:flex lg:gap-8 items-center">
          <ul className="flex gap-6 items-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            {user && (
              <li>
                <Link className="relative" href="/cart">
                  Cart
                  {numbercartitem > 0 && (
                    <span className="absolute top-[-10px] end-[-10px] flex size-5 rounded-full justify-center items-center bg-white text-emerald-600 ">
                      {numbercartitem}
                    </span>
                  )}
                </Link>
              </li>
            )}
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/brands">Brands</Link>
            </li>

            {user && (
              <li className="relative">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="hover:text-yellow-300 flex items-center gap-1"
                >
                  Settings
                  <i
                    className={`fa-solid fa-angle-down transition-transform ${
                      settingsOpen ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>
                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md">
                    <Link
                      href="/change-password"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setSettingsOpen(false)}
                    >
                      Change Password
                    </Link>
                    <Link
                      href="/update-profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setSettingsOpen(false)}
                    >
                      Update Profile
                    </Link>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <ul className="flex gap-4">
            <li>
              <button onClick={handleWishlistClick} className="relative">
                <i className="fa-solid fa-heart"></i>
                {wishlist.length > 0 && (
                  <span className="absolute top-[-10px] end-[-10px] flex size-5 rounded-full justify-center items-center bg-white text-emerald-600">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </li>
            {!user ? (
              <>
                <li>
                  <Link href="">
                    <i className="fab fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-tiktok"></i>
                  </Link>
                </li>
                <li>
                  <Link href="">
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-yellow-300">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-yellow-300">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li
                  onClick={logout}
                  className="hover:text-yellow-300 cursor-pointer"
                >
                  Signout
                </li>
                <li>Hi {user.name}</li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* mobile code as before ... */}
      {/* Mobile menu */}
{isOpen && (
  <div className="lg:hidden bg-emerald-600 text-white p-4">
    <ul className="flex flex-col gap-4">
      <li>
        <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
      </li>
      {user && (
        <li>
          <Link href="/cart" onClick={() => setIsOpen(false)}>Cart ({numbercartitem})</Link>
        </li>
      )}
      <li>
        <Link href="/products" onClick={() => setIsOpen(false)}>Products</Link>
      </li>
      <li>
        <Link href="/categories" onClick={() => setIsOpen(false)}>Categories</Link>
      </li>
      <li>
        <Link href="/brands" onClick={() => setIsOpen(false)}>Brands</Link>
      </li>
      {user && (
        <>
          <li>
            <Link href="/change-password" onClick={() => setIsOpen(false)}>Change Password</Link>
          </li>
          <li>
            <Link href="/update-profile" onClick={() => setIsOpen(false)}>Update Profile</Link>
          </li>
          <li onClick={logout} className="cursor-pointer">Signout</li>
        </>
      )}
      {!user && (
        <>
          <li>
            <Link href="/register" onClick={() => setIsOpen(false)}>Register</Link>
          </li>
          <li>
            <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
          </li>
        </>
      )}
    </ul>
  </div>
)}

    </nav>
  );
}

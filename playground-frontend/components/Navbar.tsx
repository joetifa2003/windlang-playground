import Link from "next/link";
import { useRouter } from "next/router";
import { Sling as Hamburger } from "hamburger-react";
import { useState } from "react";

const LINKS = [
    {
        href: "/",
        name: "Home",
    },
    {
        href: "/playground",
        name: "Playground",
    },
];

const Navbar = () => {
    const router = useRouter();
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    return (
        <>
            <div className="navbar bg-base-300 text-base-content">
                <div className="container flex justify-between">
                    <div className="">
                        <Link href="/">
                            <a className="flex space-x-4 text-xl normal-case btn btn-ghost">
                                <img src="/WindLogo.png" width={36} />
                                <span>WindLang</span>
                            </a>
                        </Link>
                    </div>
                    <div className="hidden space-x-4 sm:block">
                        {LINKS.map((link) => (
                            <Link href={link.href} key={link.href}>
                                <a
                                    className={`btn btn-ghost ${
                                        router.pathname === link.href
                                            ? "text-primary"
                                            : ""
                                    }`}
                                >
                                    {link.name}
                                </a>
                            </Link>
                        ))}
                    </div>
                    <div className="sm:hidden">
                        <Hamburger
                            toggled={isMenuOpened}
                            onToggle={(v) => setIsMenuOpened(v)}
                        />
                    </div>
                </div>
            </div>
            <div
                className={`fixed left-0 z-10 w-full h-full bg-opacity-60 bg-base-300 backdrop-blur-lg transition-all duration-[600ms] ease-in-out p-8 ${
                    isMenuOpened ? "top-16" : "top-full"
                }`}
            >
                <div className="flex flex-col space-y-4">
                    {LINKS.map((link) => (
                        <Link href={link.href} key={link.href}>
                            <a
                                className={`btn btn-outline text-lg ${
                                    router.pathname === link.href
                                        ? "text-primary"
                                        : ""
                                }`}
                                onClick={() => setIsMenuOpened(false)}
                            >
                                {link.name}
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;

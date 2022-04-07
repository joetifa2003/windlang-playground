import Link from "next/link";

const Navbar = () => {
    return (
        <div className="navbar bg-base-300 text-base-content">
            <div className="container">
                <Link href="/">
                    <a className="flex space-x-4 text-xl normal-case btn btn-ghost">
                        <img src="/WindLogo.png" width={36} />
                        <span>WindLang</span>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;

import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import {SignedIn, SignedOut, SignInButton, SignOutButton, UserButton} from "@clerk/nextjs";
const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                        src="/images/logo.svg"
                        width={46}
                        height={44}
                        alt={"logo"}
                    />

                </div>
            </Link>

            <div className="flex items-center gap-8">
                <NavItems/>
                <SignedOut>
                    <div className="flex items-center gap-2">
                       <SignInButton>
                        <button className="btn-signin">
                            SignIn
                        </button>
                    </SignInButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
        </nav>
    )
}

export { Navbar };
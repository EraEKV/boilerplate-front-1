import React from "react";
import Link from "next/link";
import { Button } from "../shared/ui/button";

const Header = () => {
    return (
        <div className={"text-center text-primary"}>
            <h1 className={"text-3xl pb-5"}>Welcome to the Lorem</h1>
            <Button className="py-8 px-6 text-lg">
                <Link href={"/chat"}>Get chat with AI</Link>
            </Button>
        </div>
    )
}

export default Header;
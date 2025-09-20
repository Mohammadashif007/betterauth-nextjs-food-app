import { ModeToggle } from "@/components/mode-toggler";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import React from "react";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <p className="font-semibold">Logo</p>
            </div>
            <div className="flex items-center gap-3">
                <ModeToggle></ModeToggle>
                <DropdownMenu></DropdownMenu>
            </div>
        </div>
    );
};

export default Navbar;

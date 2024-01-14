import React, {useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Icon} from "@tremor/react";
import {ArrowLeftOnRectangleIcon, UserCircleIcon} from "@heroicons/react/20/solid";

function Header() {
    const navigate = useNavigate();

    const menuRef = useRef<HTMLDivElement>(null);

    const [menuShown, setMenuShown] = useState(false);

    function handleLogout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("user");
        try {
            navigate("/auth/login");
        } catch (e) {
            window.location.reload();
        }
    }

    return (
        <header className="py-5 border-b border-gray-200 bg-white">
            <div className="container">
                <div className="grid grid-cols-14 gap-8 items-center">
                    <div className="col-span-4">
                        <div className="text-xl font-bold">
                            <Link to="/">
                                IncidentControl
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-6">
                    </div>
                    <div className="col-span-4 flex justify-end">
                        <div className="relative flex items-center w-full justify-end">
                            <div ref={menuRef} className="text-sm flex items-center cursor-pointer select-none" onClick={() => {setMenuShown(!menuShown)}}>
                                <Icon icon={UserCircleIcon} size="xl" className="p-0" color="slate" />
                            </div>

                            <div className={"absolute z-10 divide-y overflow-y-auto w-64 top-full right-0 bg-white border-gray-200 divide-gray-200 mt-1 mb-1 rounded-md border transition-all shadow-lg " + (menuShown ? "visible opacity-100" : "invisible opacity-0")} >
                                <button type="button" onClick={handleLogout} className="flex items-center justify-start w-full truncate px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700">
                                    <Icon icon={ArrowLeftOnRectangleIcon} size="sm" color="red" className="mr-3 p-0" />
                                    <p className="text-sm text-red-500 whitespace-nowrap truncate">Выйти</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
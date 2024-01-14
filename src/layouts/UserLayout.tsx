import {Outlet, ScrollRestoration} from "react-router-dom";
import Header from "../components/Header.tsx";

function UserLayout() {
    return (
        <main className="main min-h-screen flex flex-col">
            <Header/>
            <div className="container grow flex flex-col">
                <Outlet/>
            </div>

            <ScrollRestoration/>

            <footer className="py-5 border-t border-gray-200 mt-8 flex justify-center text-center">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-xs text-slate-500">
                        Кубалов Павел <br/>
                        Скрыпник Василий <br/>
                        Васильчук Максим <br/>
                        <b>2023г.</b> Все права не защищены
                    </p>
                </div>
            </footer>
        </main>
    )
}

export default UserLayout;
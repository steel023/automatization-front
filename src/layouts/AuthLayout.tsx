import {Outlet} from "react-router-dom";
import {Card, Flex} from "@tremor/react";

function AuthLayout() {
    return (
        <div className={"h-screen flex items-center justify-center bg-slate-50"}>
            <div className="container">
                <Card className="h-[400px] flex items-center justify-center">
                    <Flex>
                        <div className="content basis-5/12 mx-auto text-center">
                            <Outlet/>
                        </div>
                    </Flex>
                </Card>
            </div>
        </div>
    )
}

export default AuthLayout;
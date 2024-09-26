import React from "react";
import {Label} from "@/app/shared/ui/label";
import {Input} from "@/app/shared/ui/input";
import {Button} from "@/app/shared/ui/button";


const signIn = () => {
    return (
        <div className={"flex justify-center items-center w-full min-h-screen"}>
            <div className={"w-[400px] h-[500px] bg-gray-100 space-y-4 py-6 px-5 items-center text-primary rounded-lg"}>
                <h1 className={"text-2xl text-center"}>Welcome friend</h1>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email"/>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" placeholder="Password"/>
                </div>

                <Button className={"flex justify-center w-24 bg-primary hover:bg-gray-800"}>Button</Button>
            </div>
        </div>
    )
}

export default signIn
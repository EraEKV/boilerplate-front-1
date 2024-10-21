"use client"

import React from "react";
import { Label } from "@/app/shared/ui/label";
import { Input } from "@/app/shared/ui/input";
import { Button } from "@/app/shared/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const router = useRouter();


    const handleSubmit = () => {
        router.push('/homepage')
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gray-200">
            <div className="w-[400px] h-[550px] bg-white shadow-lg rounded-lg p-8 space-y-6">
                <h1 className="text-3xl font-semibold text-center text-gray-800">Welcome, friend!</h1>

                <div className="text-center spcae-y-5">
                    <Button className="flex items-center font-semibold text-primary text-base py-8 justify-center w-full mb-4 shadow-md bg-gray-50 hover:text-white">
                        <Image 
                            src="/icons/google.png" 
                            className="size-7 mr-2"
                            width={48}
                            height={48}
                            alt="Google" /> 
                        Sign in with Google
                    </Button>
                    <p className="text-gray-600">Or sign in with</p>
                </div>

                <div className="grid w-full gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Enter your email" className="border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"/>
                </div>
                <div className="grid w-full gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" placeholder="Enter your password" className="border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"/>
                </div>

                <Button onClick={handleSubmit} className="w-full bg-primary text-white hover:bg-gray-800 transition duration-200">Sign In</Button>
                
                
            </div>
        </div>
    );
};

export default SignIn;

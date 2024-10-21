"use client"

import React from "react";
import { Label } from "@/app/shared/ui/label";
import { Input } from "@/app/shared/ui/input";
import { Button } from "@/app/shared/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
    const router = useRouter();


    const handleSubmit = () => {
        router.push('/homepage')
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gray-200">
            <div className="w-[400px] h-[600px] bg-white shadow-lg rounded-lg p-8 space-y-6">
                <h1 className="text-3xl font-semibold text-center text-primary">Welcome, friend!</h1>

                <div className="text-center spcae-y-5">
                    <Button className="flex items-center font-semibold bg-gray-50 border-[2px] border-gray-50 text-primary hover:bg-gray-100 text-base py-8 justify-center w-full mb-4 shadow-md ">
                        <Image 
                            src="/icons/google.png" 
                            className="size-7 mr-2"
                            width={48}
                            height={48}
                            alt="Google" /> 
                        Sign in with Google
                    </Button>
                </div>
                
                <div className="flex items-center">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <p className="px-4 text-gray-600 text-center">Or sign in with</p>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                <div className="grid w-full gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Enter your email" className="border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"/>
                </div>
                <div className="grid w-full gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password1" placeholder="Enter your password" className="border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"/>
                </div>
                <div className="grid w-full gap-2">
                    <Label htmlFor="password">Password again</Label>
                    <Input type="password" id="password2" placeholder="Enter your password again" className="border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"/>
                </div>

                <Button onClick={handleSubmit} className="w-full py-5 text-base font-bold bg-primary text-white transition duration-200">Sign Up</Button>
                
                <div>
                    Already have an account? 
                    <Link className="underline text-cyan-500 font-bold ml-2 " href={'/sign-in'}>Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;

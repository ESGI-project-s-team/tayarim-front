"use client";
import React from "react";
import "../../globals.css";
import Navbar from "@/app/components/NavBar";
import HomeBody from "@/app/components/HomeBody";


export default function Page() {
    return (
        <>
            <Navbar/>
            <div className="absolute inset-0 overflow-hidden ">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bg-home-body.webp" alt="logo" className="w-full h-full object-cover"/>
            </div>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div
                className="flex justify-center relative mt-48  ">
                <div className="bg-white rounded-xl p-10  w-1/3 ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className="mx-auto h-10 w-auto"
                            src="/white-logo-short-removebg.png"
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center leading-9 tracking-tight text-gray-900">
                            Welcome back ! Please enter your details
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-custom-search px-3 py-1.5 text-sm font-semibold leading-6 text-black border-black border shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <div className="flex w-full justify-around">
                            <p className="mt-10 text-center text-sm text-gray-500">
                                <a href="#" className="font-semibold leading-6 text-black">
                                    Forgot password ?
                                </a>
                            </p>
                            <p className="mt-10 text-center text-sm text-gray-500">
                                <a href="#" className="font-semibold leading-6 text-black">
                                    Forgot email ?
                                </a>
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};
import React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import IconList from "@/components/icons-list";

const page = () => {
    return (
        <div className="bg-background text-foreground min-h-screen">
            <HeroSection />
        </div>
    );
};

const HeroSection = () => {
    return (
        <div className="w-full">
            <div className="container mx-auto grid grid-cols-1 items-center gap-12 py-24 lg:grid-cols-2 lg:gap-24">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
                        Beautiful Animated Icons
                    </h1>
                    <p className="text-muted-foreground mb-8 max-w-2xl text-lg">
                        A collection of smooth, high-quality animated icons for your next
                        project. Copy and paste directly into your app.
                    </p>
                </div>

                <div className="flex w-full justify-center lg:justify-end">
                    <CodeBlock
                        command="@lucide-animated/circle-chevron-down"
                        className="w-full max-w-xl shadow-2xl"
                    />
                </div>
            </div>
            <div className="flex w-full ">
                <IconList />
            </div>
        </div>
    );
};

export default page;

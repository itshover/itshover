"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import PrimaryButton from "@/components/ui/primary-button";
import { createIssue } from "@/actions/create-issue";
import { cn } from "@/lib/utils";
import GithubIcon from "@/icons/github-icon";

interface RequestIconModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RequestIconModal({ isOpen, onClose }: RequestIconModalProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setSuccess(null);
            setError(null);
            setLoading(false);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            const result = await createIssue(formData);

            if (result.error) {
                setError(result.error);
            } else if (result.success && result.url) {
                setSuccess(result.url);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => !loading && onClose()}
                        className={cn(
                            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
                            loading && "pointer-events-none"
                        )}
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-background w-full max-w-md rounded-2xl border shadow-2xl pointer-events-auto overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Request an Icon</h2>
                                    <button
                                        onClick={() => !loading && onClose()}
                                        disabled={loading}
                                        className="text-muted-foreground hover:text-foreground transition-colors p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {success ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                                        <div className="h-16 w-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                        <h3 className="text-lg font-medium">Request Submitted!</h3>
                                        <p className="text-muted-foreground text-sm max-w-[80%]">
                                            The issue has been created successfully on GitHub.
                                        </p>
                                        <a href={success} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline font-medium text-sm">
                                            View Issue <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                        </a>
                                        <div className="pt-4 w-full">
                                            <PrimaryButton onClick={onClose} className="w-full">
                                                Close
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="category" className="text-sm font-medium">
                                                Category <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="category"
                                                name="category"
                                                required
                                                defaultValue=""
                                                className="flex h-10 w-full rounded-xl border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="" disabled>Select a category</option>
                                                <option value="Brand/Logo">Brand / Logo</option>
                                                <option value="Interface">Interface</option>
                                                <option value="Navigation">Navigation</option>
                                                <option value="Social Media">Social Media</option>
                                                <option value="Technology">Technology</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="links" className="text-sm font-medium">
                                                Reference Links / Description
                                            </label>
                                            <textarea
                                                id="links"
                                                name="links"
                                                placeholder="Figma links, Dribbble shots, or description of the icon..."
                                                className="flex min-h-[80px] w-full rounded-xl border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="handle" className="text-sm font-medium">
                                                Your GitHub Handle <span className="text-muted-foreground font-normal">(Optional)</span>
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-muted-foreground">@</span>
                                                <input
                                                    id="handle"
                                                    name="handle"
                                                    type="text"
                                                    placeholder="username"
                                                    className="flex h-10 w-full rounded-xl border bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="text-red-500 text-sm font-medium bg-red-500/10 p-3 rounded-lg flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                                {error}
                                            </div>
                                        )}

                                        <div className="pt-2">
                                            <PrimaryButton type="submit" disabled={loading} className="w-full">
                                                {loading ? (
                                                    <div className="flex items-center gap-2">
                                                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Submitting...
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <GithubIcon className="h-4 w-4" />
                                                        Submit Request
                                                    </div>
                                                )}
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

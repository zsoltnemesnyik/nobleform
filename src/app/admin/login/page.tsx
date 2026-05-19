import LoginForm from "@/components/forms/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-semibold text-neutral-900 text-center mb-8">Login</h1>
                <LoginForm />
                <Button variant="outline" className="w-full mt-4" asChild>
                    <Link
                        href="/"
                        className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                        ← Vissza a vásárlói oldalra
                    </Link>
                </Button>
            </div>
        </div>
    );
}
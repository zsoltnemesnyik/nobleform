"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";

import {
    adminLoginSchema,
    type AdminLoginSchema,
} from "@/lib/validations/admin";
import { login } from "@/lib/auth/auth";

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const form = useForm<AdminLoginSchema>({
        resolver: zodResolver(adminLoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (
        values: AdminLoginSchema
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await login(
                values.email,
                values.password
            );

            if (error) {
                toast.error(error.message);
                setError(error.message);
                return;
            }

            toast.success("Successfully logged in");

            router.push("/admin");
            router.refresh();


        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-6">

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">
                                Email
                            </FieldLabel>

                            <Input
                                {...field}
                                id="email"
                                type="email"
                                placeholder="admin@nobleform.hu"
                                aria-invalid={fieldState.invalid}
                            />

                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="password">
                                Password
                            </FieldLabel>

                            <Input
                                {...field}
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                aria-invalid={fieldState.invalid}
                            />

                            {fieldState.invalid && (
                                <FieldError
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />

                {error && (
                    <p className="rounded-md bg-red-50 p-3 text-center text-sm text-red-600">
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading
                        ? "Login..."
                        : "Login"}
                </Button>

            </FieldGroup>
        </form>
    );
}
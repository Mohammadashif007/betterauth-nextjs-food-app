"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const signupSchema = z
    .object({
        name: z.string().min(1, { error: "Name is require" }),
        email: z.email({ error: "Enter a valid email" }),
        password: z.string().min(6, { error: "Password at least 6 character" }),
        confirmPassword: z
            .string()
            .min(6, { error: "Please confirm password" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password dose not match",
        path: ["confirmPassword"],
    });

type signupValues = z.infer<typeof signupSchema>;

export function SignUpForm() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<signupValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async ({ name, email, password }: signupValues) => {
        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
        });
        if (error) {
            setError(error.message || "Something went wrong");
        } else {
            toast.success("Signed up successfully");
            router.push("/");
        }
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                    Enter your information and create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Jon Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="jon@doe.com"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirm Password"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {error && (
                            <div role="alert" className="text-sm text-red-600">
                                {error}
                            </div>
                        )}
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

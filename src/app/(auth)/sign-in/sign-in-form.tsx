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
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signinSchema = z.object({
    email: z.email({ error: "Inter a valid email" }),
    password: z.string().min(1, { message: "Password is required" }),
});

type SigninValues = z.infer<typeof signinSchema>;

export function SignInForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async ({ email, password }: SigninValues) => {
        const { error } = await authClient.signIn.email({
            email,
            password,
        });

        if (error) {
            setError(error.message || "Something went wrong!");
        } else {
            toast.success("Signin successfully");
            router.push("/");
        }
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="your@email.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {error && (
                            <div role="alert" className="text-sm text-red-400">
                                {error}
                            </div>
                        )}
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        )}
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
                <p>
                    Don&#39;t have account?{" "}
                    <Link href={"/sign-up"} className="underline">
                        Sign Up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Link href={"/sign-in"}>
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}

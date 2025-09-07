import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Welcome to Employee Onboarding</h1>
        <p className="text-gray-600">Click below to begin the process.</p>
        <Link href="/onboarding">
          <Button className="bg-gray-300 cursor-pointer">Start Onboarding</Button>
        </Link>
      </div>
    </div>
  );
}

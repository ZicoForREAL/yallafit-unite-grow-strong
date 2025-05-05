
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { User } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<"client" | "coach">("client");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration successful!",
        description: `Your ${role} account has been created. Please sign in.`,
      });
      navigate("/login");
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-yalla-green flex items-center justify-center">
              <User className="h-6 w-6 text-black" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-white">Create an account</h1>
            <p className="mt-2 text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-yalla-green hover:text-yalla-green/80"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8 bg-yalla-dark-gray rounded-lg shadow-lg p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-white">
                    First name
                  </Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    autoComplete="given-name"
                    required
                    className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-white">
                    Last name
                  </Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    autoComplete="family-name"
                    required
                    className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                  required
                  className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-white">
                  Confirm password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-white">I am registering as:</Label>
                <RadioGroup
                  defaultValue="client"
                  className="flex gap-4"
                  onValueChange={(value) => setRole(value as "client" | "coach")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="client" id="client" />
                    <Label htmlFor="client" className="text-white">Client</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="coach" id="coach" />
                    <Label htmlFor="coach" className="text-white">Coach</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yalla-green text-black hover:bg-yalla-green/90"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-yalla-green hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy" className="text-yalla-green hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

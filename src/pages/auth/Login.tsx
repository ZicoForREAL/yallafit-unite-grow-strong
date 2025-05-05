
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { Lock } from "lucide-react";

// Test accounts for easy access
const TEST_ACCOUNTS = [
  { role: "client", email: "client@yallafit.com", password: "password123" },
  { role: "coach", email: "coach@yallafit.com", password: "password123" },
  { role: "admin", email: "admin@yallafit.com", password: "password123" },
];

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login, add real authentication later
    setTimeout(() => {
      // Check if this is one of our test accounts
      const testAccount = TEST_ACCOUNTS.find(account => account.email === email);
      
      if (testAccount) {
        navigate("/dashboard", { state: { userRole: testAccount.role } });
      } else {
        // Demo login - navigate to appropriate dashboard based on email
        if (email.includes("coach")) {
          navigate("/dashboard", { state: { userRole: "coach" } });
        } else if (email.includes("admin")) {
          navigate("/dashboard", { state: { userRole: "admin" } });
        } else {
          navigate("/dashboard", { state: { userRole: "client" } });
        }
      }

      setIsLoading(false);
      toast({
        title: "Login successful!",
        description: "Welcome to YallaFit",
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-yalla-green flex items-center justify-center">
              <Lock className="h-6 w-6 text-black" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-white">Sign in to YallaFit</h1>
            <p className="mt-2 text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-yalla-green hover:text-yalla-green/80"
              >
                Register
              </Link>
            </p>
          </div>

          <div className="mt-8 bg-yalla-dark-gray rounded-lg shadow-lg p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-yalla-green hover:text-yalla-green/80"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
                />
              </div>

              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yalla-green text-black hover:bg-yalla-green/90"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            
            {/* Test accounts section */}
            <div className="mt-6 pt-6 border-t border-yalla-gray">
              <p className="text-white text-sm mb-3 font-medium">Test Accounts:</p>
              <div className="space-y-3">
                {TEST_ACCOUNTS.map((account) => (
                  <div 
                    key={account.role}
                    className="flex justify-between items-center p-2 bg-black/20 rounded hover:bg-black/40 cursor-pointer"
                    onClick={() => {
                      setEmail(account.email);
                      setPassword(account.password);
                    }}
                  >
                    <div>
                      <span className="text-yalla-green font-semibold capitalize">{account.role}</span>
                      <p className="text-xs text-gray-400">{account.email}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEmail(account.email);
                        setPassword(account.password);
                        
                        // Auto submit after small delay
                        setTimeout(() => {
                          const form = document.querySelector('form');
                          if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
                        }, 100);
                      }}
                      className="text-xs text-white hover:text-yalla-green hover:bg-black/40"
                    >
                      Use
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { newUserSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { verifyCodeSchema } from "@/schemas/verifyCode";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupForm() {
  const [userEmail, setUserEmail] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [code, setCode] = useState("");
  const [ispendingVerification, setIspendingVerification] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const verifycode = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    if (ispendingVerification) {
      const timer = setTimeout(() => {
        setShowResend(true);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [ispendingVerification]);

  const handleSubmit = async (data: z.infer<typeof newUserSchema>) => {
    console.log("Form data:", data, "Form errors:", form.formState.errors);
    setIsloading(true);
    try {
      const response = await axios.post(`/api/sign-up`, data, { timeout: 10000 });
      if (response.status === 200) {
        setUserEmail(data.email);
        toast.success(response.data.message, { style: { background: '#34D399', color: '#fff' } });
        toast.success("Verification Code Sent Successfully", { style: { background: '#34D399', color: '#fff' } });
        setIspendingVerification(true);
      }
    } catch (error) {
      const axiosError = error as any;
      console.error("Error submitting user data", axiosError);
      const errorMessage = axiosError.response?.data?.message || "Failed to create account";
      toast.error(errorMessage, {
        style: { background: '#F87171', color: '#fff' },
      });
    } finally {
      console.log("Resetting isloading");
      setIsloading(false);
    }
  };

  const handleVerification = async (data: z.infer<typeof verifyCodeSchema>) => {
    setIsloading(true);
    if (!userEmail) {
      toast.error("Email is missing for verification.");
      setIsloading(false);
      return;
    }
    try {
      const response = await axios.post(`/api/check-verificationCode`, {
        email: userEmail,
        code: data.code,
      }, { timeout: 10000 });
      if (response.status === 200) {
        toast.success("Verification successful", {
          style: { background: '#34D399', color: '#fff' },
        });
        router.push("/dashboard");
      } else {
        toast.error(response.data?.message ?? "Verification failed", {
          style: { background: '#F87171', color: '#fff' },
        });
      }
    } catch (error: any) {
      console.error("Verification error", error);
      toast.error(error.response?.data?.message ?? "Verification failed", {
        style: { background: '#F87171', color: '#fff' },
      });
    } finally {
      setIsloading(false);
    }
  };

  const handleResendCode = async () => {
    setIsloading(true);
    try {
      const response = await axios.post(`/api/resend-verification`, { email: userEmail }, { timeout: 10000 });
      toast.success("Verification code resent", { style: { background: '#34D399', color: '#fff' } });
      setShowResend(false);
      setTimeout(() => setShowResend(true), 30000);
    } catch (error: any) {
      console.error("Resend verification error", error);
      toast.error(error.response?.data?.message ?? "Failed to resend code", {
        style: { background: '#F87171', color: '#fff' },
      });
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="shadow-xl mx-auto w-full  max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-black p-6 md:p-8 backdrop-blur-md "
    >
      <h2 className="text-2xl font-bold text-white mb-2">
        Welcome to PageCrafter
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Create your account to start crafting amazing pages!
      </p>

      <AnimatePresence mode="wait">
        {!ispendingVerification ? (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <Form {...form}>
              <form className="my-8" onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <LabelInputContainer className="mb-4">
                        <FormLabel className="text-white font-medium">Username</FormLabel>
                        <Input
                          placeholder="Your username"
                          {...field}
                          type="text"
                          className="border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg py-2.5 transition-all duration-300 hover:bg-gray-700/50"
                        />
                        <FormMessage className="text-red-400" />
                      </LabelInputContainer>
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <LabelInputContainer className="mb-4">
                        <FormLabel className="text-white font-medium">Email</FormLabel>
                        <Input
                          placeholder="Your email address"
                          {...field}
                          type="email"
                          className="border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg py-2.5 transition-all duration-300 hover:bg-gray-700/50"
                        />
                        <FormMessage className="text-red-400" />
                      </LabelInputContainer>
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <LabelInputContainer className="mb-4">
                        <FormLabel className="text-white font-medium">Password</FormLabel>
                        <div className="relative">
                          <Input
                            placeholder="******"
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg py-2.5 pr-10 transition-all duration-300 hover:bg-gray-700/50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        <FormMessage className="text-red-400" />
                      </LabelInputContainer>
                    </FormItem>
                  )}
                />

                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <LabelInputContainer className="mb-6">
                        <FormLabel className="text-white font-medium">Confirm Password</FormLabel>
                        <div className="relative">
                          <Input
                            placeholder="******"
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            className="border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg py-2.5 pr-10 transition-all duration-300 hover:bg-gray-700/50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        <FormMessage className="text-red-400" />
                      </LabelInputContainer>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="relative block h-12 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
                  disabled={isloading}
                >
                  {isloading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Creating Your Account...
                    </div>
                  ) : (
                    'Launch Your Journey'
                  )}
                  <BottomGradient />
                </Button>

                <div className="my-6 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

                <div className="flex flex-col space-y-4">
                  <button
                    className="relative flex h-12 w-full items-center justify-start space-x-2 rounded-lg bg-gray-800/50 text-white hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <IconBrandGithub className="h-5 w-5 text-gray-300" />
                    <span className="text-sm font-medium">Sign up with GitHub</span>
                    <BottomGradient />
                  </button>
                  <button
                    className="relative flex h-12 w-full items-center justify-start space-x-2 rounded-lg bg-gray-800/50 text-white hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <IconBrandGoogle className="h-5 w-5 text-gray-300" />
                    <span className="text-sm font-medium">Sign up with Google</span>
                    <BottomGradient />
                  </button>
                </div>
              </form>
            </Form>
          </motion.div>
        ) : (
          <motion.div
            key="verify"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Form {...verifycode}>
              <form className="my-8" onSubmit={verifycode.handleSubmit(handleVerification)}>
                <div className="mb-6">
                  <LabelInputContainer>
                    <FormLabel className="text-white font-medium">Verification Code</FormLabel>
                    <FormField
                      control={verifycode.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <Controller
                            control={verifycode.control}
                            name="code"
                            render={({ field: { onChange, value } }) => (
                              <InputOTP
                                maxLength={6}
                                value={value}
                                onChange={(value) => {
                                  onChange(value);
                                  setCode(value);
                                }}
                              >
                                <InputOTPGroup className="text-white space-x-2">
                                  {[...Array(6)].map((_, index) => (
                                    <InputOTPSlot
                                      key={index}
                                      index={index}
                                      className="border-gray-700 bg-gray-800/50 text-white w-12 h-12 text-center rounded-lg focus:border-cyan-500 focus:ring-cyan-500 transition-all duration-300"
                                    />
                                  ))}
                                </InputOTPGroup>
                              </InputOTP>
                            )}
                          />
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </LabelInputContainer>
                </div>

                <Button
                  className="relative block h-12 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
                  type="submit"
                  disabled={isloading}
                >
                  {isloading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Verifying...
                    </div>
                  ) : (
                    <span>Verify →</span>
                  )}
                  <BottomGradient />
                </Button>

                <AnimatePresence>
                  {showResend && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-center"
                    >
                      <button
                        type="button"
                        onClick={handleResendCode}
                        className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                        disabled={isloading}
                      >
                        Resend Verification Code
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
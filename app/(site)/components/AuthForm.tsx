'use client';
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from 'react-icons/fc';
import AuthSocialButton from "./AuthSocialButton";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(session?.status === 'authenticated') {
            router.push('/users');
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Something went wrong!\nPlease check your credentials.'))
            .finally(() => setIsLoading(false));
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid Credentials.\nPlease check your credentials.');
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Successfully Logged in!');
                    router.push('/users');
                }
            })
            .finally(() => setIsLoading(false));
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
        .then((callback) => {
            if (callback?.error) {
                toast.error('Invalid Credentials.\nPlease check your credentials.');
            }

            if (callback?.ok && !callback?.error) {
                toast.success('Successfully Logged in!')
            }
        })
        .finally(() => setIsLoading(false));
    }

    return (
        <div
            className="
                mt-6
                mx-5
                sm:mx-10
            "
        >
            <div className="
                px-4
                py-6
                md:py-3
                sm:px-4
            ">
                <form
                    className=" space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input
                            id="name"
                            label="Name"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div className="flex justify-center items-center">
                        <Button
                            disabled={isLoading}
                            fulWidth
                            type="submit"
                        >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative flex justify-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                            <div className="absolute inset-x-0 flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or</span>
                            </div>
                        </div>
                        <div className="absolute mt-5 flex gap-2 items-center">
                            <AuthSocialButton
                                title="Github"
                                icon={BsGithub}
                                onClick={() => socialAction('github')
                                }
                            />
                            <AuthSocialButton
                                title="Google"
                                icon={FcGoogle}
                                onClick={() => socialAction('google')
                                }
                            />
                        </div>
                    </div>
                    <div className="mt-20 flex gap-1 justify-center">
                        {variant === 'LOGIN' ? 'New to My Auth?' : 'Already have an Account?'}
                        <div
                            onClick={toggleVariant}
                            className="hover:underline cursor-pointer"
                        >
                            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AuthForm;
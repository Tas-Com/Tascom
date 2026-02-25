import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegister } from "./useRegister";
import { useNavigate } from "@tanstack/react-router";
import { getLocation } from "../../../shared/utils/getLocation";

export const registerSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.email("Invalid Email"),
        countryCode: z.enum(["+970", "+972"]),
        phoneNumber: z
            .string()
            .regex(/^\d+$/, "Phone number must contain only numbers")
            .min(9, "Phone number is too short")
            .max(10, "Phone number is too long"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z
            .string()
            .min(8, "Password must be at least 8 characters"),
        agree: z
            .boolean()
            .refine((val) => val === true, "You must agree to the terms"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Your passwords don't match",
        path: ["confirmPassword"],
    });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
    const registerMutation = useRegister();
    const [showSuccess, setShowSuccess] = useState(false);
    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [isLocating, setIsLocating] = useState(true);
    const [locationError, setLocationError] = useState<string | null>(null);
    const navigate = useNavigate();

    const requestLocation = async () => {
        setIsLocating(true);
        setLocationError(null);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setIsLocating(false);
                    setLocationError(null);
                },
                async () => {
                    // If browser location is denied or fails, fallback to IP location seamlessly
                    try {
                        const fallbackLocation = await getLocation();
                        setUserLocation(fallbackLocation);
                        setIsLocating(false);
                    } catch {
                        setIsLocating(false);
                        setUserLocation(null);
                        setLocationError(
                            "Please enable location access to register. We need your location to connect you with nearby tasks.",
                        );
                    }
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
            );
        } else {
            try {
                const fallbackLocation = await getLocation();
                setUserLocation(fallbackLocation);
                setIsLocating(false);
            } catch {
                setIsLocating(false);
                setLocationError("Geolocation is not supported by your browser.");
            }
        }
    };

    useEffect(() => {
        requestLocation();
    }, []);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            countryCode: "+970",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            agree: false,
        },
    });

    const { handleSubmit, setError } = form;

    const onSubmit = async (data: RegisterFormValues) => {
        let finalLocation = userLocation;

        if (!finalLocation) {
            setIsLocating(true);
            try {
                finalLocation = await getLocation();
                setUserLocation(finalLocation);
            } catch {
                setIsLocating(false);
                setLocationError(
                    "Please enable location access to register. We need your location to connect you with nearby tasks.",
                );
                return;
            }
            setIsLocating(false);
        }

        let formattedPhone = data.phoneNumber;
        if (data.phoneNumber.startsWith("0")) {
            formattedPhone = data.phoneNumber.substring(1);
        }

        registerMutation.mutate(
            {
                name: data.name,
                email: data.email,
                phoneNumber: `${data.countryCode}${formattedPhone}`,
                password: data.password,
                location: `${finalLocation.latitude},${finalLocation.longitude}`,
            },
            {
                onSuccess: (user) => {
                    console.log(`Welcome ${user.name}!`);
                    setShowSuccess(true);
                    navigate({ to: "/" });
                },
                onError: (err: any) => {
                    console.log("Registration error:", err);
                    if (err?.errors && Array.isArray(err.errors)) {
                        err.errors.forEach((error: any) => {
                            setError(error.field as any, {
                                type: "server",
                                message: error.message,
                            });
                        });
                    } else if (err?.message) {
                        if (err.message.toLowerCase().includes("email")) {
                            setError("email", { type: "server", message: err.message });
                        } else {
                            setError("root", { type: "server", message: err.message });
                        }
                    }
                },
            },
        );
    };

    return {
        form,
        onSubmit: handleSubmit(onSubmit),
        isSubmitting: registerMutation.isPending,
        showSuccess,
        isLocating,
        userLocation,
        locationError,
    };
};

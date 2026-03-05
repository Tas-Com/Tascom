import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "../apis/changepasswordApi";
import type { ChangePasswordPayload } from "../apis/changepasswordApi";

interface FieldErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const useChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!oldPassword) {
      errors.oldPassword = "Old password is required";
    }

    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      errors.newPassword = "Minimum 8 characters";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const mutation = useMutation<void, unknown, ChangePasswordPayload>({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setFieldErrors({});
    },
  });

  const handleSubmit = () => {
    if (!validate()) return;

    mutation.mutate({
      oldPassword,
      newPassword,
      confirmPassword,
    });
  };

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    fieldErrors,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    errorMessage:
      typeof mutation.error === "object" && mutation.error !== null
        ? (mutation.error as any).message
        : undefined,
    handleSubmit,
  };
};
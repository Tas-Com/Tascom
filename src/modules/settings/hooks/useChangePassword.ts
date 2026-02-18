import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "../apis/changepasswordApi";

interface FieldErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export const useChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!oldPassword)
      errors.oldPassword = "Old password is required";

    if (!newPassword)
      errors.newPassword = "New password is required";
    else if (newPassword.length < 8)
      errors.newPassword = "Minimum 8 characters";

    if (!confirmNewPassword)
      errors.confirmNewPassword = "Please confirm your new password";
    else if (newPassword !== confirmNewPassword)
      errors.confirmNewPassword = "Passwords do not match";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setFieldErrors({});
    },
  });

  const handleSubmit = () => {
    if (!validate()) return;
    mutation.mutate({ oldPassword, newPassword, confirmNewPassword });
  };

  return {
    oldPassword, setOldPassword,
    newPassword, setNewPassword,
    confirmNewPassword, setConfirmNewPassword,
    fieldErrors,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    errorMessage: (mutation.error as Error)?.message,
    handleSubmit,
  };
};
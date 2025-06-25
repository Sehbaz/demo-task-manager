// react
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

// mantine components
import {
  Button,
  Container,
  Group,
  TextInput,
  PasswordInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

// hooks
import { useLogin } from "./hooks/login.hooks";
import { useForm } from "@mantine/form";

// types
import type { LoginRequest } from "@/types/auth";

export const Login = () => {
  // state
  const [loading, setLoading] = useState(false);

  // hooks
  const navigate = useNavigate();

  const form = useForm<LoginRequest>({
    initialValues: {
      email: "",
      password: "",
    },
    // NOTE: Basic password validation, can be improved in future.
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const loginMutation = useLogin({
    onSuccess: () => {
      setLoading(false);
      notifications.show({
        title: "Welcome back!",
        message: "You're being redirected to your dashboard.",
        color: "green",
        autoClose: 1500,
        withCloseButton: false,
      });
      navigate("/projects");
    },
    onError: () => {
      setLoading(false);
      notifications.show({
        title: "Login failed",
        message: "Please check your credentials and try again.",
        color: "red",
        autoClose: 2000,
        withCloseButton: false,
      });
    },
  });

  // methods
  const handleLogin = useCallback(
    (values: LoginRequest) => {
      setLoading(true);
      loginMutation.mutate({
        email: values.email,
        password: values.password,
      });
    },
    [loginMutation]
  );

  return (
    <Container size="xs" py="lg">
      <Title order={2} mb="md">
        Login
      </Title>

      <form onSubmit={form.onSubmit(handleLogin)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="you@example.com"
          {...form.getInputProps("email")}
          mb="sm"
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Your password"
          {...form.getInputProps("password")}
          mb="sm"
        />

        <Group justify="flex-end">
          <Button type="submit" loading={loading}>
            Login
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default Login;

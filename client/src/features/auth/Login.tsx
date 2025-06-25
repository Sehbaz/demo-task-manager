import { useNavigate } from "react-router-dom";
import { useLogin } from "./hooks";
import {
  Button,
  Checkbox,
  Container,
  Group,
  TextInput,
  PasswordInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export function Login() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const loginMutation = useLogin({
    onSuccess: () => {
      console.log("Login successful. Navigating...");
      navigate("/projects");
    },
    onError: () => {
      alert("Invalid credentials");
    },
  });

  const handleLogin = (values: typeof form.values) => {
    loginMutation.mutate({ email: values.email, password: values.password });
  };

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
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Container>
  );
}

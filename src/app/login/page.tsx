import LoginForm from "../../components/auth/LoginForm";

export const metadata = {
  title: "Login | Tutor Media",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <LoginForm />
    </main>
  );
}

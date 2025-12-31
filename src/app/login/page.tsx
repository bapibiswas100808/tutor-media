import TutorLoginForm from "../../components/auth/TutorLoginForm";

export const metadata = {
  title: "Tutor Login | Tutor Media",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50 py-12 px-4">
      <TutorLoginForm />
    </main>
  );
}

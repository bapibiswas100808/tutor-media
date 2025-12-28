import CompleteProfileClient from "./CompleteProfileClient";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <CompleteProfileClient tutorId={id} />;
}

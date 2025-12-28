
import CompleteProfileClient from "./CompleteProfileClient";

interface PageProps {
  params: { id: string }; 
}

export default function Page({ params }: PageProps) {
  return <CompleteProfileClient tutorId={params.id} />;
}

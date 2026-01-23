// src/app/admin/edit-tutor/[id]/page.tsx

import EditTutor from "./EditTutor";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params; // ✅ MUST await
  return <EditTutor id={id} />;
}

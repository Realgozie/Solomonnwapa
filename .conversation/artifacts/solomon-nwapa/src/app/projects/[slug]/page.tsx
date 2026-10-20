import { permanentRedirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function LegacyProjectRoute({ params }: Props) {
  const { slug } = await params;
  permanentRedirect(`/work/${encodeURIComponent(slug)}`);
}

import ScrollyCanvas from "@/components/ScrollyCanvas";
import ScrollSections from "@/components/ScrollSections";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white font-[family-name:var(--font-geist-sans)] selection:bg-white/20">
      <ScrollyCanvas />
      <ScrollSections />
    </main>
  );
}

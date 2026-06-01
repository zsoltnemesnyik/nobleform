import NavbarPublic from "@/components/NavbarPublic";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-neutral-50">
            <NavbarPublic />
            {children}
        </div>
    );
}
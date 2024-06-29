import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import Navbar from "@/components/shared/Navbar"

export default function ProfessionalLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    return (
        <main >
            <Header />
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}
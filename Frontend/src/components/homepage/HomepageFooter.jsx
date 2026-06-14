

const footerLinks = {
    Docs: [
        { label: "Getting Started", href: "/docs/getting-started" },
        { label: "Host a Contest", href: "/docs/host-contest" },
        { label: "AI Proctoring", href: "/docs/ai-proctoring" },
        { label: "API Reference", href: "/docs/api" },
        { label: "GitHub", href: "https://github.com/abwcuri0us", external: true },
    ],
    CodeArena: [
        { label: "Demo", href: "#try-it" },
        { label: "Features", href: "#features" },
        { label: "Early Access", href: "#early-access" },
    ],
    Platform: [
        { label: "Home", href: "#", disabled: true },
        { label: "Problem Set", href: "#", disabled: true },
        { label: "Contests", href: "#", disabled: true },
    ],
    Company: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "mailto:admin@thecodearena.co.in" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Security", href: "/security" },
    ]
};

export default function HomepageFooter() {
    return (
        <footer id="footer">

            <section className="max-w-screen-xl mx-auto py-20 grid grid-cols-2 md:grid-cols-5 xl:grid-cols-7 gap-x-12 gap-y-8 px-6">
                <div className="col-span-full xl:col-span-2 flex justify-center xl:justify-start">
                    <a href="#" className="flex items-center">
                        <img src="/code-arena_logo.webp" alt="CodeArena" className="h-16 w-auto" width="200" height="64" />
                    </a>
                </div>

                {Object.entries(footerLinks).map(([title, links]) => (
                    <div key={title} className="flex flex-col gap-2 items-center sm:items-start">
                        <h3 className="font-bold text-lg">{title}</h3>
                        {links.map((link) => (
                            <div key={link.label}>
                                {link.disabled ? (
                                    <span className="text-gray-400 cursor-not-allowed">{link.label}</span>
                                ) : (
                                    <a
                                        href={link.href}
                                        className="opacity-60 hover:opacity-100 transition-opacity"
                                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    >
                                        {link.label}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </section>

            <section className="max-w-screen-xl mx-auto pb-14 text-center px-6">
                <h3>
                    &copy; {new Date().getFullYear()}{" "}
                    <a href="/" className="text-orange-500 transition-all hover:border-b-2 border-orange-500 font-semibold">
                        CodeArena
                    </a>
                </h3>
                <p className="text-gray-400 text-sm mt-4">
                    CodeArena HQ<br/>
                    Vashi, Navi Mumbai, Maharashtra<br/>
                    India
                </p>
            </section>
        </footer>
    );
}

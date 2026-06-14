import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const faqList = [
    {
        question: 'What is "CodeArena"?',
        answer:
            "CodeArena is an all-in-one toolkit for competitive programming. We offer a competitive programming platform, command-line interface, and backend framework for hosting your own instance of the application stack.",
    },
    {
        question: "How do I get started?",
        answer:
            'To join the platform, simply click on the "Get Started" or "Sign Up" buttons at the top of this page. You can also visit our GitHub repository to learn more about the project and contribute to the development of CodeArena.',
    },
    {
        question: "What are the benefits of using CodeArena over other platforms?",
        answer:
            "Unlike other platforms, CodeArena is open-source and extensible. You can host your own instance, customize it to your needs, and contribute to the development of the project. We also offer a CLI and backend framework for building your own competitive programming platform.",
    },
    {
        question: "How do I contribute to the development of CodeArena?",
        answer:
            "You can contribute to the development of CodeArena by visiting our GitHub repository and submitting a pull request. We are always looking for new contributors to help us improve the platform.",
    },
    {
        question: "How do I become an admin on the platform?",
        answer:
            "To become an admin on the platform, you must first register as a user. Once you have registered, you can request admin access by contacting the CodeArena team.",
    },
    {
        question: "How do I report a bug or issue with the platform?",
        answer:
            "To report a bug or issue with the platform, you can contact our team directly (hello@codearena.dev) or submit an issue on our GitHub repository.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="py-10 md:py-16 px-4">
            <div className="relative mx-auto w-full overflow-hidden rounded-3xl">
                <div aria-hidden className="absolute inset-0 bg-black/90" />

                <div className="relative mx-auto max-w-3xl px-6 py-10 md:py-14">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-medium mb-6 text-center"
                    >
                        Frequently Asked{" "}
                        <span className="bg-gradient-to-b from-osu to-osu-light text-transparent bg-clip-text font-serif italic font-semibold">
                            Questions
                        </span>
                    </motion.h2>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                        }}
                        className="w-full space-y-0"
                    >
                        {faqList.map((item, index) => (
                            <motion.div 
                                variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                                key={index} 
                                className="border-b border-white/10"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="flex w-full items-center justify-between py-4 text-left font-medium text-white hover:text-osu-text transition-colors"
                                >
                                    <span className="pr-4">{item.question}</span>
                                    <ChevronDown
                                        className={cn(
                                            "shrink-0 w-5 h-5 text-osu-text transition-transform duration-300",
                                            openIndex === index && "rotate-180"
                                        )}
                                    />
                                </button>
                                <div
                                    className={cn(
                                        "overflow-hidden transition-all duration-300",
                                        openIndex === index ? "max-h-96 pb-4" : "max-h-0"
                                    )}
                                >
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <h3 className="font-medium mt-6">
                        Still have questions?{" "}
                        <a
                            href="mailto:hello@codearena.dev"
                            className="text-osu-text transition-all underline underline-offset-4 hover:text-white hover:decoration-white"
                        >
                            Contact us
                        </a>
                    </h3>
                </div>
            </div>
        </section>
    );
}

import { ReactNode } from "react";


export default function Layout({ left, right }: { left: ReactNode; right: ReactNode }) {
    return (
        <div className="h-screen w-full grid md:grid-cols-2">
            <section className="border-r border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
                {left}
            </section>
            <section className="overflow-hidden flex flex-col">
                {right}
            </section>
        </div>
    );
}
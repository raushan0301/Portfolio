export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t border-[var(--border-primary)]">
            <div className="section-container">
                <div className=" text-center text-sm text-[var(--text-tertiary)]">
                    <p>© Copyright {currentYear}. All Rights Reserved by Raushan Raj</p>
                    {/* <p className="mt-2">Designed for security, performance, and clarity.</p> */}
                </div>
            </div>
        </footer>
    );
}

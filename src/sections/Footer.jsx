const socials = [
    { name: 'GitHub', href: 'https://github.com/PedroBorela', icon: '/assets/github.svg' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/pedro-borela-25b421250/', icon: '/assets/tech/linkedin.svg' },
    { name: 'Instagram', href: 'https://instagram.com/pedro.borela', icon: '/assets/instagram.svg' },
];

const Footer = () => {
    return (
        <section className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className="text-white-500 flex gap-2">
                <a href="mailto:pborela2014@gmail.com" className="hover:text-white transition-colors">
                    pborela2014@gmail.com
                </a>
                <p>|</p>
                <p>Manhuaçu, MG</p>
            </div>
            <div className="flex gap-3">
                {socials.map(({ name, href, icon }) => (
                    <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={name}
                        className="social-icon">
                        <img src={icon} alt={name} className="w-1/2 h-1/2" />
                    </a>
                ))}
            </div>
            <p className="text-white-500">© {new Date().getFullYear()} Pedro Borela. Todos os direitos reservados</p>
        </section>
    )
}

export default Footer;

import Globe from "react-globe.gl";
import Button from "../components/Button";
import { useState } from "react";

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('pborela2014@gmail.com')
        setHasCopied(true)
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }
    return (
        <section className="c-space my-20" id="about">
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid1.png" alt="grid 1" className="w-full sm:h-[276px] h-fit object-contain" />
                        <div>
                            <p className="grid-headtext">Desenvolvimento full-stack</p>
                            <p className="grid-subtext">Na Origenow, desenvolvo sistemas internos, integrações de APIs e webhooks para conectar ferramentas de operação, comunicação e mídia. Também desenvolvo sites e landing pages para empresas de e-commerce e marketplaces.</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid2.png" alt="grid2" className="w-full sm:h-[276px] h-fit object-contain" />
                        <div>
                            <p className="grid-headtext">Formação e atuação técnica</p>
                            <p className="grid-subtext">Sou técnico em Redes e graduando em Sistemas de Informação no IF Sudeste MG. Trabalho principalmente com React, Next.js, Node.js, Three.js e GSAP.</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 xl:row-span-4">
                    <div className="grid-container">
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                            <Globe
                                height={326}
                                width={326}
                                backgroundColor="rgba(0,0,0,0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                labelsData={[{ lat: -20.2578, lng: -42.0289, text: 'Manhuaçu, MG', color: 'white', size: 20 }]}
                            />
                        </div>
                        <div>
                            <p className="grid-headtext">
                                Manhuaçu, Minas Gerais
                            </p>
                            <p className="grid-subtext">
                                Atuo presencialmente em Manhuaçu e de forma remota em outros projetos.
                            </p>
                            <a href="#contact">
                                <Button name="Entrar em contato" isBeam containerClass="w-full mt-10" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                            <img src="/assets/grid3.png" alt="" className="w-full sm:h-[266px] h-fit object-contain" />
                        <div>
                            <p className="grid-headtext">Trabalho e pesquisa</p>
                            <p className="grid-subtext">
                                Durante o curso de Sistemas de Informação, participei de pesquisas sobre jogos digitais aplicados ao ensino de inglês e do desenvolvimento de uma plataforma de realidade virtual, apresentada em Salvador. Na disciplina de Engenharia de Software III, desenvolvi um projeto sobre o uso de modelos de linguagem na geração de cenários Gherkin.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img
                            src="assets/grid4.png"
                            alt="grid-4"
                            className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
                        />
                        <div className="space-y-2">
                            <p className="grid-subtext text-center">Contato direto</p>
                            <div className="copy-container" onClick={handleCopy}>
                                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copiar" />
                                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">pborela2014@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About

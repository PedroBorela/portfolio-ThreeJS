import { techStack } from "../constants";

const Stack = () => {
    return (
        <section className="c-space my-20" id="stack">
            <h3 className="head-text">Stack e ferramentas</h3>
            <p className="text-white-600 mt-4 max-w-3xl">
                Tecnologias que utilizo no desenvolvimento de interfaces, APIs, bancos de dados e deploys.
            </p>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-12">
                {techStack.map(({ id, title, description, items }) => (
                    <div key={id} className="grid-container">
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <p className="grid-headtext">{title}</p>
                                <p className="grid-subtext">{description}</p>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-8">
                                {items.map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center gap-2 rounded-full border border-black-300 bg-black-200 px-4 py-2 transition-colors hover:border-white-600"
                                        title={item.name}>
                                        <img src={item.path} alt={item.name} className="w-5 h-5 object-contain" />
                                        <span className="text-white-600 text-sm">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stack;

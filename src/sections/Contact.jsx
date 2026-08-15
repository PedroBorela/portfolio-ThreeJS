import emailjs from '@emailjs/browser';
import { useRef, useState } from "react"

const Contact = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false)
    
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const handleChange = ({ target: {name, value} }) => {
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
           await emailjs.send(
                'service_6fb5zee',
                'template_0rh4gv9', {
                from_name: form.name,
                to_name: 'Pedro',
                from_email: form.email,
                to_email: 'pborela2014@gmail.com',
                message: form.message,
            },'8tUjLqLt4VhR9l7ow')
            setLoading(false);
            alert('Sua mensagem foi enviada!')
            setForm({
                name:'',
                email:'',
                message:'',

            });
        } catch (error) {
            setLoading(false)
            console.error('Falha ao enviar a mensagem:', error)
            alert('Não consegui enviar sua mensagem. Tente de novo ou me chame no e-mail pborela2014@gmail.com')
        }

    }
    return (
        <section className="c-space my-20" id='contact'>
            <div className="relative min-h-screen flex items-center justify-center flex-col">
                <img src="/assets/terminal.png" alt="" className="absolute inset-0 min-h-screen" />

                <div className="contact-container">
                    <h3 className="head-text">Contato</h3>
                    <p className="text-lg text-white-600 mt-3">Entre em contato para conversar sobre desenvolvimento de sites, sistemas, integrações ou outros projetos digitais.</p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className="space-y-3">
                            <span className="field-label">
                                Nome
                            </span>
                            <input type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="Ex.: Maria Silva" />
                        </label>

                        <label className="space-y-3">
                            <span className="field-label">
                                E-mail
                            </span>
                            <input type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="Ex.: maria@empresa.com.br" />
                        </label>

                        <label className="space-y-3">
                            <span className="field-label">
                                Mensagem
                            </span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input"
                                placeholder="Descreva brevemente o seu projeto." />
                        </label>
                        <button className="field-btn " type="submit" disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar mensagem'}
                            <img src="/assets/arrow-up.png" alt="seta pra cima" className="field-btn_arrow" />
                        </button>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

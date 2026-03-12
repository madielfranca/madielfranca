const { useState, useEffect } = React;
const { createRoot } = ReactDOM;
const { motion, AnimatePresence } = window.Motion;

// ICONS (Inline SVG replacements for Lucide)
const IconBase = ({ children, className = "w-5 h-5", ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
        {children}
    </svg>
);

const Zap = (props) => <IconBase {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></IconBase>;
const ChevronRight = (props) => <IconBase {...props}><path d="m9 18 6-6-6-6" /></IconBase>;
const ArrowRight = (props) => <IconBase {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></IconBase>;
const Play = (props) => <IconBase {...props}><polygon points="6 3 20 12 6 21 6 3" /></IconBase>;
const Database = (props) => <IconBase {...props}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></IconBase>;
const BrainCircuit = (props) => <IconBase {...props}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M9 13a4.5 4.5 0 0 0 3-4" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M12 13h4" /><path d="M12 18h6a2 2 0 0 1 2 2v1" /><path d="M12 8h8" /><path d="M16 8V5a2 2 0 0 1 2-2" /><circle cx="16" cy="13" r=".5" /><circle cx="18" cy="3" r=".5" /><circle cx="20" cy="21" r=".5" /><circle cx="20" cy="8" r=".5" /></IconBase>;
const Network = (props) => <IconBase {...props}><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" /></IconBase>;
const CheckCircle2 = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></IconBase>;
const Terminal = (props) => <IconBase {...props}><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></IconBase>;
const Activity = (props) => <IconBase {...props}><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" /></IconBase>;

// COMPONENTES

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 ${scrolled ? 'glass-panel !border-none !border-b !border-white/10' : ''}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-heading font-bold text-xl text-white tracking-wide">SyncAuto</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="hidden md:flex items-center gap-8 text-sm font-medium"
                >
                    <a href="#solucoes" className="hover:text-white transition-colors">Soluções</a>
                    <a href="#tecnologia" className="hover:text-white transition-colors">Tecnologia</a>
                    <a href="#dashboard" className="hover:text-white transition-colors">Performance</a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <a href="#contato" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all group">
                        Iniciar Projeto
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </nav>
    );
};

const HeroSession = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Efeitos Especiais */}
            <div className="tech-grid-bg"></div>

            {/* Glowing blobs ambient light */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-600/30 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
            <div className="absolute top-40 right-40 w-72 h-72 bg-accent-500/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 -left-20 w-80 h-80 bg-brand-400/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Copy content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                            Revolucionando Operações
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6">
                            O Futuro é <br />
                            <span className="text-gradient">Autônomo.</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
                            Aceleramos sua empresa integrando inteligência artificial e processos autônomos. Elimine tarefas repetitivas, foque na estratégia.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-all animate-pulse-neon flex items-center justify-center gap-2 group">
                                Explorar Soluções
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-white/5 text-white font-semibold flex items-center justify-center gap-2 transition-all">
                                <Play className="w-5 h-5" />
                                Ver Demo
                            </button>
                        </div>
                    </motion.div>

                    {/* Automation Flow Interactive Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative lg:ml-auto w-full max-w-md mx-auto"
                    >
                        <div className="glass-panel p-6 rounded-2xl glow-effect relative">
                            {/* Mock Code Header */}
                            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <div className="text-xs text-slate-500 font-mono flex items-center gap-1">
                                    <Terminal className="w-3 h-3" /> main_workflow.py
                                </div>
                            </div>

                            {/* Flow Items */}
                            <div className="space-y-4">
                                {[
                                    { icon: Database, label: "Data Extraction", tool: "Selenium", color: "text-blue-400", bg: "bg-blue-400/10" },
                                    { icon: BrainCircuit, label: "AI Analysis", tool: "OpenAI", color: "text-purple-400", bg: "bg-purple-400/10" },
                                    { icon: Network, label: "System Sync", tool: "n8n", color: "text-emerald-400", bg: "bg-emerald-400/10" }
                                ].map((step, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + (idx * 0.2) }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-space-900/50 border border-white/5 relative z-10"
                                    >
                                        <div className={`w-10 h-10 rounded-lg ${step.bg} ${step.color} flex items-center justify-center`}>
                                            <step.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-white">{step.label}</h4>
                                            <p className="text-xs text-slate-400">Powered by {step.tool}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-500/20 text-brand-300">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Connecting lines */}
                            <div className="absolute left-11 top-[100px] bottom-[60px] w-0.5 bg-gradient-to-b from-brand-500/50 to-emerald-500/50 -z-10"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Services = () => {
    const services = [
        {
            icon: Database,
            title: "Automação de Dados",
            desc: "Extração inteligente (Web Scraping / RPA) e normalização de grandes volumes de informações em tempo real."
        },
        {
            icon: BrainCircuit,
            title: "IA Integrada",
            desc: "Modelos NLP e Visão Computacional plugados no seu fluxo de trabalho para tomada de decisões autônomas."
        },
        {
            icon: Network,
            title: "Workflows Inteligentes",
            desc: "Integração via APIs e webhooks conectando CRMs, ERPs e ferramentas de comunicação sem atrito."
        }
    ];

    return (
        <section id="solucoes" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Engenharia de Processos</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">Nossa expertise técnica para modernizar cada pilar operacional da sua empresa.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {services.map((srv, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass-panel p-8 rounded-2xl group cursor-pointer"
                        >
                            <div className="w-14 h-14 rounded-xl bg-space-900/80 border border-white/5 flex items-center justify-center mb-6 group-hover:border-brand-500/40 transition-colors">
                                <srv.icon className="w-7 h-7 text-brand-400 group-hover:text-accent-400 transition-colors" />
                            </div>
                            <h3 className="text-xl font-heading font-semibold text-white mb-3">{srv.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{srv.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const DashboardPreview = () => {
    return (
        <section id="dashboard" className="py-24 relative overflow-hidden">
            {/* Background Light */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Controle Absoluto em Tempo Real</h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Monitore a eficiência e a economia de tempo de todas as automações com nosso dashboard customizado de telemetria.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Métricas de horas salvas",
                                "Logs de execução de scripts",
                                "Alertas preventivos via Slack/Teams",
                                "Auditoria completa de APIs"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-slate-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative w-full"
                    >
                        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative z-10">
                            {/* Dashboard Header */}
                            <div className="bg-space-900/90 border-b border-white/5 p-4 flex justify-between items-center">
                                <div className="text-sm font-semibold text-white flex gap-2 items-center">
                                    <Activity className="w-4 h-4 text-brand-400" />
                                    Telemetry
                                </div>
                                <div className="flex gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                </div>
                            </div>

                            {/* Dashboard Content */}
                            <div className="p-6 bg-space-800/80 grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-space-900/50 border border-white/5 p-4 rounded-xl">
                                        <div className="text-xs text-slate-400 mb-1">Horas Salvas (Mês)</div>
                                        <div className="text-2xl font-heading font-bold text-white text-gradient">1,420h</div>
                                    </div>
                                    <div className="bg-space-900/50 border border-white/5 p-4 rounded-xl">
                                        <div className="text-xs text-slate-400 mb-1">Sucesso de Execução</div>
                                        <div className="text-2xl font-heading font-bold text-white">99.98%</div>
                                    </div>
                                </div>

                                <div className="bg-space-900/50 border border-white/5 p-4 rounded-xl h-40 relative overflow-hidden flex items-end">
                                    {/* Mock Chart */}
                                    <div className="w-full flex items-end gap-2 h-full opacity-60">
                                        {[40, 60, 45, 80, 55, 90, 75, 100].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${h}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className="w-full bg-brand-500 rounded-t-sm"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Deco behind dashboard */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/30 to-accent-500/30 blur-2xl -z-10 rounded-3xl opacity-50"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const TechStack = () => {
    const techs = ["Python", "JavaScript", "Selenium", "n8n", "PostgreSQL", "OpenAI API", "AWS", "Docker"];

    return (
        <section id="tecnologia" className="py-12 border-y border-white/5 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 overflow-hidden">
                <div className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
                    Nossa Stack Tecnológica
                </div>
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {techs.map((tech, i) => (
                        <div key={i} className="text-xl font-heading font-bold text-white hover:text-brand-400 transition-colors">
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer id="contato" className="py-20 relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">

                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-heading font-bold text-xl text-white tracking-wide">SyncAuto</span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-8">
                            Transformando operações através de código inteligente. Entre em contato para descobrir o potencial inexplorado do seu negócio.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Links Mocks */}
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500/20 hover:text-brand-400 cursor-pointer transition-colors">
                                LD
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500/20 hover:text-brand-400 cursor-pointer transition-colors">
                                TW
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-500/20 hover:text-brand-400 cursor-pointer transition-colors">
                                GH
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8 rounded-2xl relative">
                        <h3 className="text-xl font-heading font-semibold text-white mb-6">Fale com Especialistas</h3>
                        <form className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nome / Empresa"
                                    className="w-full bg-space-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="E-mail Corporativo"
                                    className="w-full bg-space-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Como podemos acelerar sua operação?"
                                    rows="3"
                                    className="w-full bg-space-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                                ></textarea>
                            </div>
                            <button type="button" className="w-full py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-colors">
                                Solicitar Análise
                            </button>
                        </form>
                    </div>

                </div>

                <div className="mt-20 pt-8 border-t border-white/5 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} SyncAuto Consultoria. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
};

const App = () => {
    return (
        <div className="text-slate-300 font-sans">
            <Navbar />
            <HeroSession />
            <TechStack />
            <Services />
            <DashboardPreview />
            <Footer />
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);

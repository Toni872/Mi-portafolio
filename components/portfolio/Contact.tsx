'use client'

import { useState } from 'react'
import { Mail, Github, Linkedin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContactProps {
    email: string
    github: string
    linkedin: string
}

export function Contact({ email, github, linkedin }: ContactProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        // Simulate sending (replace with actual implementation)
        setTimeout(() => {
            setStatus('sent')
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setStatus('idle'), 3000)
        }, 1000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <section id="contact" className="section relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
            
            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
                            Contacto
                        </h2>
                        <p className="text-xl text-text-secondary">
                            ¿Tienes una pregunta o quieres trabajar juntos? Déjame tus datos y te responderé lo antes posible.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold mb-6 text-primary-light">Conecta conmigo</h3>

                            <div className="space-y-4">
                                <a
                                    href={`mailto:${email}`}
                                    className="group relative flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-surface/50 to-surface border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                >
                                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                                        <Mail size={24} className="text-primary" />
                                    </div>
                                    <span className="text-text-secondary group-hover:text-text transition-colors">{email}</span>
                                </a>

                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-surface/50 to-surface border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                >
                                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                                        <Github size={24} className="text-primary" />
                                    </div>
                                    <span className="text-text-secondary group-hover:text-text transition-colors">GitHub</span>
                                </a>

                                <a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-surface/50 to-surface border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                >
                                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                                        <Linkedin size={24} className="text-primary" />
                                    </div>
                                    <span className="text-text-secondary group-hover:text-text transition-colors">LinkedIn</span>
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                    className="w-full px-4 py-3 bg-surface/50 backdrop-blur-sm border border-border/50 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-text placeholder:text-text-muted hover:border-primary/30"
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    className="w-full px-4 py-3 bg-surface/50 backdrop-blur-sm border border-border/50 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-text placeholder:text-text-muted hover:border-primary/30"
                                />
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Mensaje"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-surface/50 backdrop-blur-sm border border-border/50 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-text placeholder:text-text-muted hover:border-primary/30"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full"
                            >
                                {status === 'sending' ? (
                                    'Sending...'
                                ) : status === 'sent' ? (
                                    'Sent!'
                                ) : (
                                    <>
                                        <Send className="h-4 w-4 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

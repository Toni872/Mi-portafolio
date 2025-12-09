'use client'

import { useState } from 'react'
import { Mail, Github, Linkedin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

interface ContactProps {
    email: string
    github: string
    linkedin: string
}

export function Contact({ email, github, linkedin }: ContactProps) {
    const { t } = useLanguage()
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
                <div className="max-w-5xl mx-auto">
                    <div className="relative mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
                            {t.contact.title}
                        </h2>
                        <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-primary to-transparent"></div>
                        <p className="text-base sm:text-lg md:text-xl text-text-secondary mt-4 px-4 sm:px-0">
                            {t.contact.subtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
                        {/* Contact Info */}
                        <div className="space-y-4 sm:space-y-5 md:space-y-6 flex flex-col justify-start">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-primary-light">{t.contact.connect}</h3>

                            <div className="space-y-3 sm:space-y-4">
                                <a
                                    href={`mailto:${email}`}
                                    className="group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-surface/50 to-surface border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] touch-manipulation min-h-[44px] active:bg-surface/70"
                                >
                                    <div className="p-2 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                                        <Mail size={20} className="sm:w-6 sm:h-6 text-primary" />
                                    </div>
                                    <span className="text-xs sm:text-sm md:text-base text-text-secondary group-hover:text-text transition-colors break-all">{email}</span>
                                </a>

                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-surface/50 to-surface border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] touch-manipulation min-h-[44px] active:bg-surface/70"
                                >
                                    <div className="p-2 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                                        <Github size={20} className="sm:w-6 sm:h-6 text-primary" />
                                    </div>
                                    <span className="text-xs sm:text-sm md:text-base text-text-secondary group-hover:text-text transition-colors">GitHub</span>
                                </a>

                                <a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-surface/50 to-surface border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] touch-manipulation min-h-[44px] active:bg-surface/70"
                                >
                                    <div className="p-2 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                                        <Linkedin size={20} className="sm:w-6 sm:h-6 text-primary" />
                                    </div>
                                    <span className="text-xs sm:text-sm md:text-base text-text-secondary group-hover:text-text transition-colors">LinkedIn</span>
                                </a>

                                <a
                                    href="https://wa.me/34687723287"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-br from-surface/50 to-surface border border-border/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] touch-manipulation min-h-[44px] active:bg-surface/70"
                                >
                                    <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                                        <svg width="20" height="20" className="sm:w-6 sm:h-6 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.873.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
                                        </svg>
                                    </div>
                                    <span className="text-xs sm:text-sm md:text-base text-text-secondary group-hover:text-text transition-colors break-all">+34 687723287</span>
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col justify-start">
                            <div className="h-[0px] sm:h-[26px] md:h-[52px] mb-4 sm:mb-6 hidden md:block"></div>
                            <div className="space-y-3 sm:space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={t.contact.name}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface/50 backdrop-blur-sm border border-border/50 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm sm:text-base text-text placeholder:text-text-muted hover:border-primary/30"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder={t.contact.email}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface/50 backdrop-blur-sm border border-border/50 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm sm:text-base text-text placeholder:text-text-muted hover:border-primary/30"
                                />

                                <textarea
                                    name="message"
                                    placeholder={t.contact.message}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-surface/50 backdrop-blur-sm border border-border/50 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-sm sm:text-base text-text placeholder:text-text-muted hover:border-primary/30"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full relative px-6 py-3 bg-primary text-dark hover:bg-primary/90 rounded-lg font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 touch-manipulation min-h-[44px] active:bg-primary/80"
                                style={{
                                    WebkitTapHighlightColor: 'transparent'
                                }}
                            >
                                {/* Recuadro verde cuando está activo - igual que header */}
                                <div className="contact-active-overlay absolute inset-0 bg-primary/10 rounded-lg border border-primary/30 opacity-0 transition-opacity duration-200 pointer-events-none"></div>
                                
                                <span className="relative z-10 flex items-center justify-center">
                                    {status === 'sending' ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
                                            {t.contact.sending}
                                        </>
                                    ) : status === 'sent' ? (
                                        <>
                                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {t.contact.sent}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4 mr-2" />
                                            {t.contact.sendMessage}
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

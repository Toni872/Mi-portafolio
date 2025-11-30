'use client'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-primary/20 py-12 bg-gradient-to-t from-bg-secondary to-transparent">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-50"></div>
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-text-secondary text-sm">
            © {currentYear} <span className="text-primary font-semibold">Toni Lloret</span>. Todos los derechos reservados.
          </p>

          <div className="flex gap-6">
            <a
              href="https://github.com/Toni872"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-text-secondary hover:text-primary transition-all duration-300 text-sm font-medium"
            >
              <span className="relative z-10">GitHub</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="https://www.linkedin.com/in/antonio-lloret-sánchez-080166156/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-text-secondary hover:text-primary transition-all duration-300 text-sm font-medium"
            >
              <span className="relative z-10">LinkedIn</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="mailto:antohachi@gmail.com"
              className="group relative text-text-secondary hover:text-primary transition-all duration-300 text-sm font-medium"
            >
              <span className="relative z-10">Email</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

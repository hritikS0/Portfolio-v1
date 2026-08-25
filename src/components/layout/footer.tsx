const year = new Date().getFullYear()

const links = [
  { label: "GitHub", href: "https://github.com/hritikS0" },
  { label: "LinkedIn", href: "https://linkedin.com/in/hritik-sharma-91336430b/" },
  { label: "Résumé", href: "/resume-hritik.pdf" },
]

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta text-muted">© {year} Hritik Sharma</p>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8125rem] text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

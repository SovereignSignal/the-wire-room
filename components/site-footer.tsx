import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-xl" role="img" aria-label="satellite dish">📡</span>
              <span className="font-serif text-base font-bold text-foreground">
                The Wire Room
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Tracking non-dilutive funding across Crypto, AI, and Open Source.
            </p>
          </div>

          {/* Wires */}
          <div>
            <h4 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              The Wires
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://x.com/CryptoGrantWire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  @CryptoGrantWire
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/AIGrantWire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  @AIGrantWire
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/OSSGrantWire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  @OSSGrantWire
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/feed"
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  Wire Feed
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  Operating Manual
                </Link>
              </li>
            </ul>
          </div>

          {/* Meta */}
          <div>
            <h4 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Meta
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <span className="text-sm text-muted-foreground">
                  Powered by Sovereign Signal
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center font-mono text-xs text-muted-foreground">
            {"--- END TRANSMISSION ---"}
          </p>
        </div>
      </div>
    </footer>
  )
}

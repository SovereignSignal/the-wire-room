import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-5">
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

          {/* Wires on X */}
          <div>
            <h4 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Wires on X
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

          {/* Wires on Telegram */}
          <div>
            <h4 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Telegram
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="https://t.me/cryptograntwire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  Crypto Grant Wire
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/aigrantwire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  AI Grant Wire
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/ossgrantwire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  OSS Grant Wire
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation & Meta */}
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
              <li>
                <a
                  href="https://sovereignsignal.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground transition-colors hover:text-primary"
                >
                  Sovereign Signal
                </a>
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

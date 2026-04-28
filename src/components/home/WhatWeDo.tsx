import { Link } from 'react-router-dom';
import { ArrowRight, User, Cpu } from 'lucide-react';
import { FadeIn } from '../ui/motion';

// Owner-first bridge between the navy hero and the rest of the page.
// Says explicitly what the firm does, before any positioning argument.
export function WhatWeDo() {
  return (
    <section className="bg-white py-24 md:py-32 border-b border-navy/5">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="eyebrow text-navy-light mb-6">What we do</p>
            <h2 className="font-serif text-display-md text-navy leading-tight mb-6 text-balance">
              We help UK business owners sell their companies.
            </h2>
            <p className="text-body-lg text-navy-light leading-relaxed max-w-3xl mb-14">
              For founders ready to exit a business they have built — or to find the right capital partner — Mastella
              runs the full process. From confidential first conversation to signed deal.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-sand-light rounded-xl p-8 md:p-10 border border-navy/10 h-full flex flex-col">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy/5 border border-navy/15 mb-5">
                  <User className="h-4 w-4 text-navy" />
                </div>
                <p className="font-mono text-xs text-navy tracking-widest mb-3">EXCEPTIONAL HUMAN GUIDANCE</p>
                <h3 className="font-serif text-2xl text-navy mb-4 leading-snug">
                  Senior advisors lead every conversation that matters.
                </h3>
                <p className="text-navy-light leading-relaxed">
                  Yours, the buyers&apos;, the lawyers&apos;. No junior teams in between, no advisor-of-the-week
                  handover. The most senior person on the deal is the one you started with.
                </p>
              </div>

              <div className="bg-sand-light rounded-xl p-8 md:p-10 border border-navy/10 h-full flex flex-col">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 mb-5">
                  <Cpu className="h-4 w-4 text-accent-dark" />
                </div>
                <p className="font-mono text-xs text-accent-dark tracking-widest mb-3">LEVERAGED BY TECHNOLOGY</p>
                <h3 className="font-serif text-2xl text-navy mb-4 leading-snug">
                  Proprietary tools accelerate analysis and surface buyers others can&apos;t reach.
                </h3>
                <p className="text-navy-light leading-relaxed">
                  Faster financial work. Broader buyer discovery. Sharper benchmarking against live market data.
                  Without compromising rigour.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-2xl md:text-3xl font-serif text-navy italic text-center mt-16 max-w-3xl mx-auto leading-snug text-balance">
              The combination is what gets a deal done at the right price, on the right terms, in less time than the
              traditional process.
            </p>
            <div className="text-center mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-navy text-white px-7 py-3.5 rounded-md font-semibold tracking-wide hover:bg-navy-light transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Book a confidential conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

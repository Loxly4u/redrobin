function Footer() {
  return (
    <footer className="border-t border-panel bg-bg/95 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 text-sm text-muted sm:grid-cols-[1.45fr_auto] sm:items-center">
          <p className="leading-7">
            All assessments documented were conducted under formal rules of engagement with explicit authorization.
          </p>
          <div className="space-y-2 text-right">
            <p>Enterprise offensive security portfolio built for risk intelligence, remediation, and governance.</p>
            <div className="inline-flex flex-wrap justify-end gap-3 text-xs uppercase tracking-[0.24em] text-accent/80">
              <span>Authorization only</span>
              <span>Red-team posture</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

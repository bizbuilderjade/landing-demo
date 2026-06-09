"use client";

import { useId, useRef, useState, useEffect } from "react";
import { motion, useInView, animate } from "motion/react";
import {
  BarChart3,
  Blocks,
  ChevronRight,
  FileCode2,
  Gauge,
  LayoutTemplate,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const navLinks = [
  { label: "문제", href: "#problem" },
  { label: "솔루션", href: "#solution" },
  { label: "프로세스", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const valueItems: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: LayoutTemplate,
    title: "작업 기준의 통일",
    body: "정보 소스와 업데이트 경로를 하나로 정리해, 같은 기준으로 판단할 수 있는 환경을 만듭니다.",
  },
  {
    icon: Gauge,
    title: "실행 속도",
    body: "승인·공유·전달에 필요한 이동과 대기 시간을 줄이고, 팀이 실제 일에 더 오래 집중할 수 있게 합니다.",
  },
  {
    icon: Workflow,
    title: "자동화된 흐름",
    body: "반복되는 양식과 전달 과정을 자동화해, 실수와 누락을 줄이고 운영 부담을 낮춥니다.",
  },
  {
    icon: BarChart3,
    title: "진행의 가시성",
    body: "누가, 무엇을, 언제까지 해야 하는지 한눈에 보이는 상태 구조로, 진행과 리스크를 투명하게 확인할 수 있습니다.",
  },
];

const processItems: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "현재 흐름 정리",
    body: "기존 업데이트 경로와 승인 과정을 점검해, 불필요한 대기와 누락 지점을 먼저 정리합니다.",
  },
  {
    step: "02",
    title: "환경 구축",
    body: "프로젝트별 권한, 양식, 상태 기준을 맞춘 공간을 구성하고, 관련 정보를 하나의 시스템으로 통일합니다.",
  },
  {
    step: "03",
    title: "팀 적용",
    body: "실제 업무 패턴에 맞춰 사용을 시작하고, 자동화 규칙과 템플릿을 점진적으로 확장합니다.",
  },
  {
    step: "04",
    title: "운영 개선",
    body: "누적된 사용 패턴을 바탕으로 병목을 개선하고, 팀이 스스로 유지할 수 있는 기준으로 만듭니다.",
  },
];

const faqItems: { q: string; a: string }[] = [
  {
    q: "도입에 오래 걸리나요?",
    a: "프로젝트 규모와 사용 범위에 따라 다르지만, 기본 환경 구축은 소규모 팀에서 보통 1~2주 내에 시작할 수 있습니다.",
  },
  {
    q: "기존 툴과 함께 쓸 수 있나요?",
    a: "가능합니다. 일부 연동 구조를 맞춰두었기 때문에, 쓰던 환경을 한번에 바꾸지 않고 단계적으로 연결할 수 있습니다.",
  },
  {
    q: "모바일에서도 사용할 수 있나요?",
    a: "네. 데스크톱과 모바일 모두에서 기본 기능을 사용할 수 있도록 구성되어 있습니다.",
  },
  {
    q: "보안과 데이터 관리 기준은 어떻게 되나요?",
    a: "프로젝트별 접근 권한, 활동 기록, 데이터 보관 설정을 제공합니다. 자세한 기준은 상세 안내에서 확인할 수 있습니다.",
  },
];

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-medium text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base md:text-lg text-muted">{description}</p> : null}
    </div>
  );
}

function NumberTicker({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(`${value.toLocaleString()}${suffix}`);
  const inView = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => setText(`${Math.round(latest).toLocaleString()}${suffix}`),
    });
    return () => {
      controls.stop();
    };
  }, [inView, suffix, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(faqItems[0]?.q ?? null);
  const mountId = useId();

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/40 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2 text-foreground">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold tracking-tight">Clarity OS</span>
          </a>
          <nav aria-label="주요 메뉴" className="hidden items-center gap-8 text-sm text-muted md:flex">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="hidden h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:flex"
            >
              시작하기
            </a>
            <a href="#cta" className="inline-flex sm:hidden">
              <span className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">
                시작하기
              </span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary/80" aria-hidden="true" />
              운영 효율화 도입 전, 가장 먼저 확인할 것
            </div>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              정리된 기준 안에서, 실행되는 팀 만들기
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              정보가 흩어져 기준이 바뀌는 환경에서, Clarity OS는 프로젝트 진행과 전달 기준을 한 곳에 모아
              팀이 같은 판단으로 움직일 수 있게 합니다. 과도한 도구나 복잡한 설정 없이, 필요한 흐름을 갖출 수 있습니다.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#cta"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
              >
                무료로 시작하기
              </a>
              <a
                href="#process"
                className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-surface sm:w-auto"
              >
                도입 과정 보기 <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-4 text-xs text-muted">
              신용카드 등록 없이 사용 시작. 언제든 내보기가 가능합니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="mx-auto mt-14 rounded-2xl border border-border bg-surface/70 p-3 shadow-2xl shadow-black/20 md:mt-20"
          >
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" aria-hidden="true" />
                  </div>
                  <span className="text-xs text-muted">프로젝트 보드 — 실행 현황</span>
                </div>
                <span className="text-xs text-muted">live</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-border bg-secondary/60 p-3">
                  <p className="text-xs text-muted">완료</p>
                  <NumberTicker value={37} suffix="건" />
                </div>
                <div className="rounded-lg border border-border bg-secondary/60 p-3">
                  <p className="text-xs text-muted">진행중</p>
                  <NumberTicker value={12} suffix="건" />
                </div>
                <div className="rounded-lg border border-border bg-secondary/60 p-3">
                  <p className="text-xs text-muted">대기</p>
                  <NumberTicker value={5} suffix="건" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Problem */}
        <section id="problem" className="border-y border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <SectionHeader eyebrow="문제" title="정리가 안 된 흐름은 같은 일을 여러 곳에서 다시 만듭니다" description="작업 기준이 흔들릴 때 생기는 가장 큰 문제는 시간 낭비가 아니라, 팀이 같은 판단을 할 수 없게 되는 점입니다." />
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                { icon: MessagesSquare, title: "정보 소스가 분산됨", body: "문의, 문서, 메시지, 알림이 각기 흩어져 있어 최신 기준을 찾는 데 시간이 걸립니다." },
                { icon: ShieldCheck, title: "책임과 기준이 모호함", body: "누가 판단하고, 어떤 요건이 바뀌었는지 기록되지 않아 같은 일을 반복하게 됩니다." },
                { icon: Gauge, title: "진행이 보이지 않음", body: "누가 어디까지 했는지, 무엇이 막혔는지 한눈에 확인할 수 없어 대응이 늦어집니다." },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="relative rounded-xl border border-border bg-surface p-5"
                >
                  <item.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section id="solution" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <SectionHeader eyebrow="솔루션" title="이미 있는 툴과 패턴을, 통일된 기준 안으로 옮깁니다" description="기능 나열보다, 팀의 실제 판단과 이동 흐름이 바뀌는 데 필요한 가치에 맞췄습니다." />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {valueItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong hover:bg-surface-hover"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </span>
                  <ChevronRight className="h-4 w-4 -translate-x-1 translate-y-1 text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-3xl rounded-xl border border-border bg-secondary/60 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="hidden sm:inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Blocks className="h-5 w-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">결과의 질이 바뀌는 지점</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  같은 팀이라도 기준이 다르면 같은 입력도 다른 결과가 됩니다. Clarity OS는 정보의 출처,
                  판단 기준, 상태 변화를 하나의 흐름 안에 넣어, 팀이 같은 맥락에서 움직이게 만듭니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="border-y border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <SectionHeader eyebrow="변화" title="같은 작업이라도, 기준이 다르면 결과가 달라집니다" description="아래는 같은 프로젝트라도 기준이 정리되지 않은 경우와, 기준이 통일된 경우의 차이입니다." />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">Before</p>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-400" aria-hidden="true" />
                    정보가 여러 도구와 채널에 분산되어 최신 기준을 찾기 어렵습니다.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-400" aria-hidden="true" />
                    판단 기준이 개인별로 달라, 같은 입력도 다른 해석이 나옵니다.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-400" aria-hidden="true" />
                    진행 상황이 보이지 않아 대응과 확인이 늦어집니다.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-400" aria-hidden="true" />
                    반복 작업이 늘어나고, 같은 실수가 되풀이됩니다.
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">After</p>
                <ul className="mt-4 space-y-3 text-sm text-secondary-foreground">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                    정보가 한 경로 안에 모여 최신 기준을 빠르게 찾을 수 있습니다.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                    기준이 공유되어 팀의 판단이 일관되게 유지됩니다.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                    진행 상황이 한눈에 보여 대응과 확인이 빨라집니다.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                    자동화된 흐름으로 같은 일이 줄어들고 반복 실수가 줄어듭니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <SectionHeader eyebrow="프로세스" title="도입은 점진적으로, 운영은 빠르게" description="서비스 시작 전부터 팀이 쓸 수 있도록 단계를 나누고, 필요한 부분부터 적용할 수 있게 구성합니다." />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {processItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="relative rounded-xl border border-border bg-surface p-5"
              >
                <span className="text-3xl font-semibold text-primary/60" aria-hidden="true">{item.step}</span>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Outcomes */}
        <section className="border-y border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <SectionHeader eyebrow="기대할 수 있는 변화" title="기능이 아니라, 결과에 집중합니다" description="도입했을 때 실제로 달라지는 점을 중심으로 구성했습니다." />
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                { icon: FileCode2, title: "같은 일의 반복 감소", body: "양식과 전달 흐름이 자동화되면서, 매번 새로 만드는 작업이 줄어듭니다." },
                { icon: LayoutTemplate, title: "판단 기준의 통일", body: "변경과 결정이 기록되면서, 팀이 같은 맥락에서 판단할 수 있게 됩니다." },
                { icon: BarChart3, title: "리스크의 투명화", body: "대기와 병목이 visible 해지면, 빠르게 확인하고 조정할 수 있습니다." },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-xl border border-border bg-surface p-6"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </motion.div>
              ))}
            </div>

            <div className="mx-auto mt-14 max-w-3xl rounded-xl border border-border bg-secondary/70 p-6 md:p-8">
              <p className="text-sm font-medium text-foreground">지금 시작해도 늦지 않습니다</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                소규모 프로젝트부터 적용할 수 있고, 필요한 범위만 먼저 구성할 수 있습니다.
                전면 도입이 아니라, 실제로 쓰일 부분부터 시작하면 운영 리스크가 적습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Objections */}
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <SectionHeader eyebrow="결정 전 고려사항" title="망설이는 부분에 대한 답변입니다" description="구체적으로 고려해볼 만한 점을 먼저 다루고, 궁금한 점은 FAQ에서 추가로 확인할 수 있습니다." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              { q: "비용이 부담되지 않을까?", a: "프로젝트 규모와 사용 인원에 맞춘 범위로 시작할 수 있도록 구성되어 있습니다. 먼저 필요한 부분부터 적용하는 방식으로 부담을 낮출 수 있습니다." },
              { q: "우리에게도 맞을까?", a: "기존에 쓰던 툴과 흐름을 한번에 바꾸지 않고, 병행하거나 필요한 구간부터 적용할 수 있습니다." },
              { q: "도입이 복잡하지 않을까?", a: "기본 환경과 사용법은 짧은 시간 안에 시작할 수 있습니다. 필요한 설정은 단계별로 안내됩니다." },
              { q: "결과를 믿을 수 있을까?", a: "적용 범위, 진행 기준, 확인 포인트를 명확히 보여주기 때문에, 도입 전에도 기대 효과와 리스크를 미리 점검할 수 있습니다." },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-border bg-surface p-5">
                <p className="text-sm font-semibold text-foreground">{item.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <SectionHeader eyebrow="FAQ" title="자주 묻는 질문" description="구매나 도입 전에 가장 먼저 나오는 질문을 선별했습니다." />
            <div className="mx-auto mt-10 max-w-3xl">
              {faqItems.map((item) => (
                <div key={item.q} className="border-t border-border first:border-t-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq((prev) => (prev === item.q ? null : item.q))}
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-foreground"
                    aria-expanded={openFaq === item.q}
                  >
                    <span>{item.q}</span>
                    <ChevronRight className={`h-4 w-4 text-muted transition-transform ${openFaq === item.q ? "rotate-90" : ""}`} aria-hidden="true" />
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ${openFaq === item.q ? "max-h-40 pb-4" : "max-h-0"}`}
                    aria-hidden={openFaq !== item.q}
                  >
                    <p className="text-sm leading-relaxed text-muted">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="cta" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[360px] w-[860px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
          </div>
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-8 md:p-12">
              <div className="flex items-center gap-2 text-sm text-primary">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span className="font-medium">시작이 가장 어렵지 않도록</span>
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">같은 기준 안에서 움직이는 팀</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Clarity OS는 복잡한 설정과 과도한 도입 부담을 줄이고, 필요한 흐름부터 갖출 수 있게 합니다.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
                >
                  무료로 시작하기
                </a>
                <a
                  href="#"
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-border bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-surface sm:w-auto"
                >
                  상담 신청
                </a>
              </div>
              <p className="mt-4 text-xs text-muted">신용카드 등록 없이 시작할 수 있습니다.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Clarity OS</span>
            </div>
            <p className="text-xs text-muted">© 2026 Clarity OS. 모든 권리는 보유되어 있습니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

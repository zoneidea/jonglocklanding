import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChartColumnIncreasing,
  CreditCard,
  Eye,
  EyeOff,
  Layers3,
  MapPinned,
  PhoneCall,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import jonglockLogoWhite from './assets/jonglock-logo-white.png';

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL || 'https://jonglockapi.zonedevnode.com/api/public';
const MANAGEMENT_APP_URL = import.meta.env.VITE_MANAGEMENT_APP_URL || 'https://jonglockmng.zonedevnode.com';
const PASSWORD_POLICY = 'รหัสผ่านต้องมีอย่างน้อย 10 ตัวอักษร มีตัวพิมพ์ใหญ่ 1 ตัว ตัวเลข 1 ตัว และอักขระพิเศษ 1 ตัว';
const DEFAULT_PLAN_CODE = 'free_full_1y';
const DEFAULT_TRIAL_DAYS = 90;
const POWERED_BY_TEXT = 'Powered by zone-idea innovation co.,ltd.';

const initialForm = {
  companyName: '',
  companyEmail: '',
  companyPhone: '',
  address: '',
  supervisorFirstName: '',
  supervisorLastName: '',
  supervisorEmail: '',
  supervisorPhone: '',
  supervisorUsername: '',
  preferredPlanCode: DEFAULT_PLAN_CODE,
  password: '',
  confirmPassword: '',
};

const highlights = [
  { label: 'หลายตลาดในองค์กรเดียว', value: 'Multi-market', icon: Layers3 },
  { label: 'สิทธิ์ผู้ใช้งานครบ', value: 'Supervisor / Admin / Accounting / Audit', icon: ShieldCheck },
  { label: 'รายงานพร้อมใช้งาน', value: 'Bookings, VAT, Receivables, Reconciliation', icon: ReceiptText },
];

const featureCards = [
  {
    title: 'Control Tower สำหรับตลาด',
    description: 'จัดการบูธ ผังตลาด วันหยุด สินค้า บริการเสริม และสิทธิ์ทีมงานจากระบบเดียว',
    icon: Building2,
  },
  {
    title: 'Mobile booking ที่พร้อมขายจริง',
    description: 'ผู้ค้าเลือกวัน เลือกบูธ ชำระเงิน และติดตามสถานะผ่านมือถือโดยไม่ต้องผ่านงานเอกสาร',
    icon: PhoneCall,
  },
  {
    title: 'บัญชีและภาษีที่ตามทันการเติบโต',
    description: 'รองรับเอกสารบัญชี รายงานภาษีขาย ลูกหนี้ค้างชำระ และการต่อยอดสู่การออกใบเสร็จในอนาคต',
    icon: CreditCard,
  },
  {
    title: 'โครงสร้างข้อมูลพร้อม scale',
    description: 'ออกแบบให้รองรับหลายองค์กร หลายตลาด และการตั้งค่าค่าบริการ subscription แบบคิด usage เพิ่มได้',
    icon: ChartColumnIncreasing,
  },
];

const experienceItems = [
  'งานจองและผังบูธ',
  'งานบัญชีและรายงาน',
  'งานตรวจสอบและค่าปรับ',
];

const problems = [
  {
    title: 'ลดงานจองซ้ำและงานตามสถานะ',
    description: 'ล็อกบูธตามวัน จัดการตะกร้า แนบหลักฐานโอน และรอแอดมินตรวจสอบได้เป็นลำดับ',
  },
  {
    title: 'รวมข้อมูลหลายตลาดในองค์กรเดียว',
    description: 'แยกสิทธิ์ทีมงาน ตลาด บูธ ผู้ค้า และรายงาน โดยผูกข้อมูลกับองค์กรอย่างชัดเจน',
  },
  {
    title: 'บัญชีและการตรวจตลาดทำงานต่อกัน',
    description: 'รองรับ VAT ค่าปรับ ลูกหนี้ค้างชำระ รายงานการขาย และ workflow audit ผ่านแอปฯ',
  },
];

const audiences = [
  'เจ้าของตลาดหรือพื้นที่เช่า',
  'อาคารสำนักงานที่มีพื้นที่ขายประจำ',
  'ทีมบริหารพื้นที่เชิงพาณิชย์',
  'องค์กรที่ดูแลหลายตลาดหรือหลายสาขา',
];

const productFlow = [
  {
    step: '01',
    title: 'ตั้งค่าองค์กรและตลาด',
    description: 'สร้างตลาด พื้นที่ขาย วันเปิดจอง บัญชีรับเงิน และเงื่อนไขการจอง',
  },
  {
    step: '02',
    title: 'สร้างผังบูธและบริการเสริม',
    description: 'กำหนดแผนผังบูธ ประเภทสินค้า ราคา อุปกรณ์ให้เช่า และโค้ดส่วนลด',
  },
  {
    step: '03',
    title: 'เปิดให้ผู้ค้าจองผ่านแอปฯ',
    description: 'ผู้ค้าเลือกวัน เลือกบูธ ยืนยันการจอง และแนบหลักฐานชำระเงินผ่านมือถือ',
  },
  {
    step: '04',
    title: 'ตรวจสอบ บัญชี และรายงาน',
    description: 'แอดมินตรวจสลิป ทีม audit เช็คอิน/บันทึกค่าปรับ และบัญชีดูรายงานได้ทันที',
  },
];

const workflow = [
  {
    step: '01',
    title: 'สมัครด้วยข้อมูลที่จำเป็น',
    description: 'กรอกข้อมูลองค์กรและผู้ดูแลหลักเท่าที่จำเป็นเพื่อลดขั้นตอนเริ่มต้นให้สั้นที่สุด',
  },
  {
    step: '02',
    title: 'เริ่มใช้ฟรี 3 เดือน',
    description: 'ระบบสร้าง subscription record และกำหนดช่วงทดลองใช้ฟรีไว้ให้อัตโนมัติทันทีหลังส่งคำขอ',
  },
  {
    step: '03',
    title: 'พร้อมต่อยอด billing',
    description: 'รองรับ usage, invoice, overage และ VAT สำหรับการคิดค่าบริการในอนาคต',
  },
];

function decodeFeatures(plan) {
  if (Array.isArray(plan.features)) return plan.features;
  return [];
}

function Input({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
      {hint ? <span className="mt-2 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}

export default function App() {
  const signupRef = useRef(null);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [planError, setPlanError] = useState('');
  const [overview, setOverview] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingPlans(true);
        const [plansResponse, overviewResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/subscription/plans`),
          fetch(`${API_BASE_URL}/subscription/overview`),
        ]);

        const plansPayload = await plansResponse.json();
        if (!plansResponse.ok || plansPayload.status !== 'success') {
          throw new Error(plansPayload.message || 'ไม่สามารถโหลดแผน subscription ได้');
        }
        const visiblePlanCodes = new Set([DEFAULT_PLAN_CODE, 'starter', 'growth']);
        const publicPlans = (plansPayload.data || []).filter((plan) => visiblePlanCodes.has(plan.code));
        setPlans(publicPlans);
        setForm((current) => ({
          ...current,
          preferredPlanCode: DEFAULT_PLAN_CODE,
        }));

        if (overviewResponse.ok) {
          const overviewPayload = await overviewResponse.json();
          if (overviewPayload.status === 'success') {
            setOverview(overviewPayload.data || null);
          }
        }
      } catch (requestError) {
        setPlanError(requestError.message || 'ไม่สามารถโหลดแผน subscription ได้');
      } finally {
        setLoadingPlans(false);
      }
    }

    loadData();
  }, []);

  function scrollToSignup() {
    signupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess(null);

    if (form.password !== form.confirmPassword) {
      setError('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/subscription/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: form.companyName,
          companyEmail: form.companyEmail,
          companyPhone: form.companyPhone,
          address: form.address,
          supervisorFirstName: form.supervisorFirstName,
          supervisorLastName: form.supervisorLastName,
          supervisorEmail: form.supervisorEmail,
          supervisorPhone: form.supervisorPhone,
          supervisorUsername: form.supervisorUsername,
          expectedGoLiveDate: '',
          preferredPlanCode: DEFAULT_PLAN_CODE,
          preferredBillingInterval: 'yearly',
          password: form.password,
          notes: '',
        }),
      });
      const payload = await response.json();
      if (!response.ok || payload.status !== 'success') {
        throw new Error(payload.message || 'ไม่สามารถสมัครใช้งานได้');
      }
      if (payload.data?.organizationCode) {
        const params = new URLSearchParams({ organizationCode: payload.data.organizationCode });
        window.location.assign(`${MANAGEMENT_APP_URL}/login?${params.toString()}`);
        return;
      }
      setSuccess(payload.data);
      setForm((current) => ({
        ...initialForm,
        preferredPlanCode: current.preferredPlanCode,
      }));
    } catch (requestError) {
      setError(requestError.message || 'ไม่สามารถสมัครใช้งานได้');
    } finally {
      setSubmitting(false);
    }
  }

  const selectedPlan = plans.find((plan) => plan.code === form.preferredPlanCode) || plans[0] || null;
  const paidAmountTodayLabel = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(Number(overview?.paidAmountToday || 0));

  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-slate-900">
      <div className="landing-noise" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(8,15,26,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" aria-label="Jonglock" className="flex items-center">
            <img src={jonglockLogoWhite} alt="Jonglock ระบบจองพื้นที่ขาย" className="h-16 w-auto object-contain sm:h-20" />
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 lg:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Plans</a>
            <a href="#signup" className="hover:text-white">Signup</a>
          </nav>

          <button
            type="button"
            onClick={scrollToSignup}
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-sand)]"
          >
            เริ่มทดลองใช้ฟรี
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-14 lg:px-8 lg:pt-20">
          <div className="hero-orb hero-orb-left" />
          <div className="hero-orb hero-orb-right" />
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white">
                <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
                Subscription-ready platform for modern market operators
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                  ระบบจัดการตลาดที่
                  <span className="block whitespace-nowrap text-[var(--color-accent-soft)]">ดูมืออาชีพตั้งแต่หน้าแรก</span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-200">
                  Jonglock ช่วยให้องค์กรตลาดเปิดรับผู้ค้า จัดการผังบูธ ตรวจสอบการจอง
                  ออกเอกสารบัญชี และเตรียมโครงสร้าง subscription สำหรับการเติบโตในอนาคตจากระบบเดียว
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {highlights.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-white/6 p-5 shadow-[0_24px_80px_rgba(1,8,20,0.28)]">
                    <Icon className="mb-4 h-5 w-5 text-[var(--color-accent)]" />
                    <p className="text-sm text-slate-300">{label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={scrollToSignup}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 text-base font-semibold text-white transition hover:bg-[var(--color-accent-deep)]"
                >
                  สมัครใช้งาน
                  <ArrowRight className="h-5 w-5" />
                </button>
                <a
                  href={MANAGEMENT_APP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-white/12 bg-white/6 px-7 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  ดูระบบจัดการ
                </a>
              </div>
            </div>

            <div className="hero-panel">
              <div className="hero-panel-header">
                <span className="hero-dot bg-emerald-400" />
                <span className="hero-dot bg-amber-400" />
                <span className="hero-dot bg-rose-400" />
              </div>

              <div className="grid gap-4 lg:grid-cols-1 xl:grid-cols-[1.08fr_0.92fr]">
                <section className="hero-surface hero-surface-primary">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Operations</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">ตลาดพร้อมเปิดจอง</h2>
                    </div>
                    <BadgeCheck className="h-8 w-8 text-[var(--color-accent)]" />
                  </div>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-2xl bg-white/6 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-300">อัตราการใช้งานบูธวันนี้</p>
                        <p className="text-sm font-semibold text-emerald-300">{overview?.occupancyRateToday ?? 0}%</p>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-white/8">
                        <div className="h-2 rounded-full bg-[var(--color-accent)] transition-all" style={{ width: `${overview?.occupancyRateToday ?? 0}%` }} />
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl bg-white/6 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Active Booths</p>
                        <p className="mt-3 text-sm text-slate-300">บูธเปิดใช้งาน</p>
                        <p className="mt-1 text-4xl font-semibold text-white">{overview?.activeBooths ?? 0}</p>
                      </div>
                      <div className="rounded-2xl bg-white/6 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Collected Today</p>
                        <p className="mt-3 text-sm text-slate-300">ยอดชำระวันนี้</p>
                        <p className="mt-1 text-4xl font-semibold text-white">{paidAmountTodayLabel}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="hero-surface hero-surface-secondary">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-700">Subscription</p>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-2xl bg-[var(--color-sand)] p-5 text-[var(--color-ink)]">
                      <p className="text-sm">Free access</p>
                      <p className="mt-2 text-3xl font-semibold">ใช้ฟรี 3 เดือน</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-sm font-medium text-slate-700">Live platform metrics</p>
                      <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
                        <li className="flex items-start justify-between gap-4 rounded-xl bg-white/80 px-3 py-3">
                          <span className="flex items-center gap-2 leading-6"><BarChart3 className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]" /> องค์กรที่เปิดใช้งาน</span>
                          <strong className="text-base text-slate-950">{overview?.activeOrganizations ?? 0}</strong>
                        </li>
                        <li className="flex items-start justify-between gap-4 rounded-xl bg-white/80 px-3 py-3">
                          <span className="flex items-center gap-2 leading-6"><UsersRound className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]" /> subscriptions ที่กำลังใช้งาน</span>
                          <strong className="text-base text-slate-950">{overview?.activeSubscriptions ?? 0}</strong>
                        </li>
                        <li className="flex items-start justify-between gap-4 rounded-xl bg-white/80 px-3 py-3">
                          <span className="flex items-center gap-2 leading-6"><MapPinned className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]" /> ตลาดที่เปิดอยู่</span>
                          <strong className="text-base text-slate-950">{overview?.activeMarkets ?? 0}</strong>
                        </li>
                        <li className="flex items-start justify-between gap-4 rounded-xl bg-white/80 px-3 py-3">
                          <span className="flex items-center gap-2 leading-6"><CalendarClock className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]" /> คำขอสมัครรอตรวจสอบ</span>
                          <strong className="text-base text-slate-950">{overview?.pendingSignupRequests ?? 0}</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_24px_80px_rgba(1,8,20,0.22)] backdrop-blur-xl lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="section-kicker">Real operations experience</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white lg:text-4xl">
                  พัฒนาจากประสบการณ์ดูแลพื้นที่ตลาดจริง
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  ทีมพัฒนามีประสบการณ์ดูแลและพัฒนาระบบบริหารพื้นที่ตลาดสำหรับอาคารสำนักงาน
                  จึงออกแบบ Jonglock ให้รองรับงานปฏิบัติการ บัญชี และการตรวจสอบในสถานการณ์ใช้งานจริง
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {experienceItems.map((item) => (
                  <div key={item} className="rounded-3xl border border-white/12 bg-white/10 p-5">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-accent-soft)]" />
                    <p className="mt-4 text-lg font-semibold text-white">{item}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">ประสบการณ์จากงานบริหารพื้นที่ขายจริง</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="section-heading">
            <p className="section-kicker">What the system handles</p>
            <h2 className="section-title section-title-light whitespace-nowrap">โครงสร้างที่พร้อมทั้งงานปฏิบัติการและการเงิน</h2>
            <p className="section-copy section-copy-light">
              หน้า landing นี้ไม่ได้ขายแค่ภาพลักษณ์ แต่สื่อให้เห็นว่า product มีโครงสร้างพร้อมใช้งานจริง
              ตั้งแต่การจัดการตลาดไปจนถึง subscription lifecycle
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featureCards.map(({ title, description, icon: Icon }) => (
              <article key={title} className="feature-card">
                <div className="feature-icon">
                  <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
                  <p className="mt-3 text-base leading-8 text-slate-600">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-8">
              <p className="section-kicker">Why Jonglock</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-slate-950 lg:text-4xl">
                แก้ปัญหาที่เกิดขึ้นจริงในการบริหารตลาด
              </h2>
              <div className="mt-8 space-y-4">
                {problems.map((item) => (
                  <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-8">
              <p className="section-kicker">Built for</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-slate-950 lg:text-4xl">
                เหมาะกับทีมที่ต้องดูแลพื้นที่ขายอย่างเป็นระบบ
              </h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {audiences.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                    <p className="text-base font-semibold leading-7 text-slate-800">{item}</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={scrollToSignup}
                className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 text-base font-semibold text-white transition hover:bg-[var(--color-accent-deep)]"
              >
                เริ่มทดลองใช้ฟรี 3 เดือน
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <div className="rounded-[2.25rem] bg-white p-7 shadow-[0_28px_90px_rgba(15,23,42,0.1)] lg:p-9">
            <div className="section-heading">
              <p className="section-kicker">Product flow</p>
              <h2 className="section-title whitespace-nowrap">จากตั้งค่าตลาดถึงรายงานบัญชีในระบบเดียว</h2>
              <p className="section-copy">
                Flow หลักถูกออกแบบให้ทีมบริหารตลาดเริ่มใช้งานได้เร็ว และต่อยอดเป็นระบบ subscription หรือ billing ได้ในอนาคต
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {productFlow.map((item) => (
                <article key={item.step} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-[var(--color-accent)] px-3 text-sm font-bold text-white">{item.step}</p>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
          <div className="workflow-shell">
            <div className="section-heading section-heading-dark">
              <p className="section-kicker">Lifecycle</p>
              <h2 className="section-title section-title-light">
                เริ่มใช้ฟรีวันนี้ และโครงสร้าง
                <span className="block whitespace-nowrap">ข้อมูลพร้อมรองรับ billing ในอนาคต</span>
              </h2>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {workflow.map((item) => (
                <article key={item.step} className="workflow-card">
                  <p className="workflow-step">{item.step}</p>
                  <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="section-heading">
            <p className="section-kicker">Plans</p>
            <h2 className="section-title section-title-light whitespace-nowrap">แพ็กเกจที่เปิดทางให้ subscription เติบโตเป็นระบบ</h2>
          </div>

          {loadingPlans ? <div className="empty-panel">กำลังโหลดแผน subscription...</div> : null}
          {planError ? <div className="empty-panel empty-panel-error">{planError}</div> : null}

          {!loadingPlans && !planError ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => {
                const active = plan.code === selectedPlan?.code;
                return (
                  <article key={plan.code} className={`plan-card ${active ? 'plan-card-active' : ''}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-slate-500">{plan.code}</p>
                        <h3 className="mt-2 text-3xl font-semibold text-slate-950">{plan.name}</h3>
                      </div>
                      {active ? <span className="rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-white">Selected</span> : null}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{plan.description}</p>
                    <div className="mt-6 flex items-end gap-2">
                      <span className="font-display text-4xl font-semibold text-slate-950">N/A</span>
                      <span className="pb-2 text-sm text-slate-500">pricing coming soon</span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-[var(--color-accent-deep)]">เปิดใช้ฟรี 3 เดือนในช่วงแรก</p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-700">
                      {decodeFeatures(plan).map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <BadgeCheck className="h-4 w-4 text-[var(--color-accent)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          ) : null}
        </section>

        <section id="signup" ref={signupRef} className="mx-auto max-w-7xl px-5 pb-24 pt-8 lg:px-8">
          <div className="signup-shell">
            <div className="signup-copy">
              <p className="section-kicker">Signup</p>
              <h2 className="section-title section-title-light">เริ่ม onboarding องค์กรของคุณได้จากฟอร์มเดียว</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                ช่วงแรกเปิดให้ใช้ฟรี 3 เดือน จึงเก็บเฉพาะข้อมูลองค์กรและผู้ดูแลหลักที่จำเป็น
                ระบบจะสร้างองค์กร สิทธิ์ supervisor และ subscription ทดลองใช้ให้พร้อมเข้าใช้งานทันที
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="signup-metric">
                  <p className="text-sm text-slate-400">Data captured</p>
                  <p className="mt-2 text-2xl font-semibold text-white">signup + subscription + billing seed</p>
                </div>
                <div className="signup-metric">
                  <p className="text-sm text-slate-400">Security</p>
                  <p className="mt-2 text-2xl font-semibold text-white">encrypted contact data</p>
                </div>
              </div>
            </div>

            <div className="signup-form-shell">
              {success ? (
                <div className="success-panel">
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-accent)]">Signup completed</p>
                  <h3 className="mt-3 text-3xl font-semibold text-slate-950">สมัครใช้งานเรียบร้อยแล้ว</h3>
                  <div className="mt-6 space-y-3 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
                    <p><strong>Organization:</strong> {success.organizationCode}</p>
                    <p><strong>Supervisor:</strong> {success.supervisorUsername}</p>
                    <p><strong>Subscription:</strong> {success.subscriptionCode}</p>
                    <p><strong>Access:</strong> ฟรี 3 เดือนแรก</p>
                    <p><strong>Trial End:</strong> {new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium' }).format(new Date(success.trialEndsAt))}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSuccess(null)}
                    className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-accent)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-deep)]"
                  >
                    สมัครเพิ่ม
                  </button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Input label="ชื่อบริษัท / องค์กร">
                      <input className="field" value={form.companyName} onChange={(event) => updateField('companyName', event.target.value)} required />
                    </Input>
                    <Input label="อีเมลองค์กร">
                      <input type="email" className="field" value={form.companyEmail} onChange={(event) => updateField('companyEmail', event.target.value)} required />
                    </Input>
                    <Input label="เบอร์โทรองค์กร">
                      <input className="field" value={form.companyPhone} onChange={(event) => updateField('companyPhone', event.target.value)} required />
                    </Input>
                  </div>

                  <Input label="ที่อยู่องค์กร">
                    <textarea className="field field-textarea" value={form.address} onChange={(event) => updateField('address', event.target.value)} required />
                  </Input>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Input label="ชื่อผู้ดูแลหลัก">
                      <input className="field" value={form.supervisorFirstName} onChange={(event) => updateField('supervisorFirstName', event.target.value)} required />
                    </Input>
                    <Input label="นามสกุลผู้ดูแลหลัก">
                      <input className="field" value={form.supervisorLastName} onChange={(event) => updateField('supervisorLastName', event.target.value)} required />
                    </Input>
                    <Input label="อีเมลผู้ดูแลหลัก">
                      <input type="email" className="field" value={form.supervisorEmail} onChange={(event) => updateField('supervisorEmail', event.target.value)} required />
                    </Input>
                    <Input label="เบอร์โทรผู้ดูแลหลัก">
                      <input className="field" value={form.supervisorPhone} onChange={(event) => updateField('supervisorPhone', event.target.value)} />
                    </Input>
                  </div>

                  <Input label="ชื่อผู้ใช้(Supervisor)">
                    <input className="field" value={form.supervisorUsername} onChange={(event) => updateField('supervisorUsername', event.target.value)} required />
                  </Input>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Input label="รหัสผ่าน" hint={PASSWORD_POLICY}>
                      <div className="password-field">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="field field-with-icon"
                          value={form.password}
                          onChange={(event) => updateField('password', event.target.value)}
                          required
                        />
                        <button type="button" className="icon-button" onClick={() => setShowPassword((current) => !current)}>
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </Input>
                    <Input label="ยืนยันรหัสผ่าน">
                      <div className="password-field">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="field field-with-icon"
                          value={form.confirmPassword}
                          onChange={(event) => updateField('confirmPassword', event.target.value)}
                          required
                        />
                        <button type="button" className="icon-button" onClick={() => setShowConfirmPassword((current) => !current)}>
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </Input>
                  </div>

                  {selectedPlan ? (
                    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
                      <p className="font-semibold">ช่วงเปิดตัว: สมัครใช้ฟรี 3 เดือน</p>
                      <p className="mt-2">ระบบจะผูกคำขอสมัครเข้ากับแผนเริ่มต้นภายในระบบอัตโนมัติเพื่อรองรับการเปิด billing ในอนาคต</p>
                      <p className="mt-1">Trial ระยะเริ่มต้น {DEFAULT_TRIAL_DAYS} วัน</p>
                    </div>
                  ) : null}

                  {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

                  <button
                    type="submit"
                    disabled={submitting || loadingPlans || !plans.length}
                    className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 text-base font-semibold text-white transition hover:bg-[var(--color-accent-deep)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? 'กำลังสร้างบัญชี...' : 'ยืนยันการสมัคร'}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 lg:px-8">
        {POWERED_BY_TEXT}
      </footer>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import {
  Apple,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChartColumnIncreasing,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  Layers3,
  MapPinned,
  MonitorSmartphone,
  PhoneCall,
  Play,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import jonglockLogoWhite from './assets/jonglock-logo-white.png';
import appMarketListPreview from './assets/showcase/app-market-list.svg';
import appBoothGridPreview from './assets/showcase/app-booth-grid.svg';
import appBoothDetailPreview from './assets/showcase/app-booth-detail.svg';
import managementDashboardPreview from './assets/showcase/management-dashboard.webp';
import managementBoothsPreview from './assets/showcase/management-booths.webp';
import managementReportsPreview from './assets/showcase/management-reports.webp';

const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL || 'https://jonglockapi.zonedevnode.com/api/public';
const MANAGEMENT_APP_URL = import.meta.env.VITE_MANAGEMENT_APP_URL || 'https://management.jonglock.com';
const DEMO_MANAGEMENT_APP_URL = import.meta.env.VITE_DEMO_MANAGEMENT_APP_URL || 'https://jonglockmng.zonedevnode.com';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=th.co.zoneidea';
const APP_STORE_URL = '';
const DEMO_LOGIN_URL = `${DEMO_MANAGEMENT_APP_URL.replace(/\/$/, '')}/login?organizationCode=ORG001&username=admin`;
const DEMO_ACCOUNT = {
  organizationCode: 'ORG001',
  username: 'admin',
  password: 'Admin@123456',
};
const PASSWORD_POLICY = 'รหัสผ่านต้องมีอย่างน้อย 10 ตัวอักษร มีตัวพิมพ์ใหญ่ 1 ตัว ตัวเลข 1 ตัว และอักขระพิเศษ 1 ตัว';
const DEFAULT_PLAN_CODE = 'free_full_1y';
const DEFAULT_TRIAL_DAYS = 90;
const POWERED_BY_TEXT = 'Powered by zone-idea innovation co.,ltd.';
const LANDING_VISITOR_KEY = 'jonglock_landing_visitor_key';
const PLAN_LABELS = {
  free_full_1y: {
    badge: 'ทดลองใช้ฟรี',
    name: 'ใช้ฟรี 3 เดือน',
    description: 'เปิดใช้ทุกฟังก์ชันในช่วงเริ่มต้น เหมาะสำหรับทดลองระบบจริงก่อนเลือกแพ็คเกจ',
    monthlyPrice: 0,
    price: 'ฟรี',
    priceNote: 'ระยะทดลอง 3 เดือน',
    trialLabel: 'ใช้งานได้ครบทุกฟังก์ชันในช่วงทดลอง',
    adminLimit: 'ไม่จำกัด',
  },
  starter: {
    badge: 'เริ่มต้น',
    name: 'สตาร์ทเตอร์',
    description: 'เหมาะสำหรับตลาดเดี่ยวหรืออาคารเดียวที่เริ่มใช้ระบบบริหารพื้นที่ขาย',
    monthlyPrice: 999,
    price: '999',
    priceNote: 'บาท/เดือน',
    trialLabel: 'เปิดใช้ฟรี 3 เดือนในช่วงแรก',
    adminLimit: '1',
  },
  growth: {
    badge: 'ธุรกิจ',
    name: 'ธุรกิจ',
    description: 'เหมาะสำหรับองค์กรที่มีหลายตลาดและต้องการบริหารงานหลายส่วนในระบบเดียว',
    monthlyPrice: 1999,
    price: '1,999',
    priceNote: 'บาท/เดือน',
    trialLabel: 'เปิดใช้ฟรี 3 เดือนในช่วงแรก',
    adminLimit: '3',
  },
};
const FEATURE_LABELS = {
  'Full function 3 months': 'ใช้งานได้ครบทุกฟังก์ชัน 3 เดือน',
  'Full function 1 year': 'ใช้งานได้ครบทุกฟังก์ชันในช่วงทดลอง',
  'unlimited markets during trial': 'ไม่จำกัดจำนวนตลาดระหว่างทดลองใช้',
  'all management modules': 'ใช้งานเมนูระบบจัดการได้ครบ',
  'mobile booking app': 'รองรับแอปฯ สำหรับผู้จองพื้นที่',
  'vendor booking app': 'รองรับแอปฯ สำหรับผู้จองพื้นที่',
  'accounting reports': 'รายงานบัญชีและรายงานการชำระเงิน',
  'basic reports': 'รายงานการจองพื้นฐาน',
  '1 market': 'รองรับ 1 ตลาด',
  '3 markets': 'รองรับ 3 ตลาด',
  'up to 5 markets': 'รองรับสูงสุด 5 ตลาด',
  '1 admin user excluding supervisor': 'แอดมิน 1 คน ไม่รวม supervisor',
  '3 admin users excluding supervisor': 'แอดมินสูงสุด 3 คน ไม่รวม supervisor',
  '3 admin users': 'ผู้ดูแลระบบ 3 คน',
  '10 admin users': 'ผู้ดูแลระบบ 10 คน',
  'advanced reports': 'รายงานขั้นสูง',
  'audit workflow': 'ระบบตรวจสอบตลาดและค่าปรับ',
  'PDPA tools': 'เครื่องมือจัดการ PDPA',
  announcements: 'ประกาศและประชาสัมพันธ์',
};

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
  preferredBillingInterval: 'monthly',
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

const faqItems = [
  {
    question: 'Jonglock เหมาะกับตลาดแบบไหน',
    answer: 'เหมาะกับตลาดนัด อาคารสำนักงาน พื้นที่เช่า และองค์กรที่ต้องจัดการหลายตลาดหรือหลายโซน พร้อมระบบจองบูธและรายงานบัญชี',
  },
  {
    question: 'ผู้ค้าจองพื้นที่ขายผ่านแอปได้ไหม',
    answer: 'ผู้ค้าสามารถเลือกตลาด เลือกวัน เลือกบูธ ยืนยันการจอง และแนบหลักฐานการชำระเงินผ่านแอปได้',
  },
  {
    question: 'รองรับหลายตลาดในองค์กรเดียวหรือไม่',
    answer: 'รองรับหลายตลาดในองค์กรเดียว พร้อมแยกสิทธิ์ผู้ใช้งาน ตลาด บูธ รายงาน และข้อมูลตามองค์กรอย่างชัดเจน',
  },
  {
    question: 'รองรับงานบัญชีและ VAT หรือไม่',
    answer: 'รองรับการตั้งค่า VAT รายงานการชำระเงิน รายงานลูกหนี้ค้างชำระ รายงานภาษีขาย และข้อมูลสำหรับต่อยอดเอกสารบัญชี',
  },
  {
    question: 'แอดมินสามารถจองแทนผู้ค้าได้หรือไม่',
    answer: 'แอดมินสามารถจองแทนสมาชิกได้ และรายการจะไปแสดงในตะกร้าของผู้ค้าเพื่อดำเนินการชำระเงินผ่านแอป',
  },
];

function decodeFeatures(plan) {
  if (Array.isArray(plan.features)) return plan.features;
  return [];
}

function getPlanPresentation(plan) {
  return PLAN_LABELS[plan.code] || {
    badge: plan.code,
    name: plan.name,
    description: plan.description,
    price: plan.price_display_label || 'รอราคา',
    priceNote: 'รอประกาศราคา',
    trialLabel: 'เปิดใช้ฟรี 3 เดือนในช่วงแรก',
  };
}

function translateFeature(feature) {
  return FEATURE_LABELS[feature] || feature;
}

function formatQuota(value) {
  const numericValue = Number(value || 0);
  if (!numericValue) return 'ไม่จำกัด';
  if (numericValue >= 9999) return 'ไม่จำกัด';
  return new Intl.NumberFormat('th-TH').format(numericValue);
}

function formatPrice(value) {
  return new Intl.NumberFormat('th-TH', { maximumFractionDigits: 0 }).format(Number(value || 0));
}

function getPlanPrice(plan, interval = 'monthly') {
  const presentation = getPlanPresentation(plan);
  const monthlyPrice = Number(presentation.monthlyPrice || plan.base_price || 0);
  if (!monthlyPrice) {
    return { price: 'ฟรี', note: 'ระยะทดลอง 3 เดือน', discountLabel: '' };
  }
  if (interval === 'yearly') {
    const yearlyPrice = monthlyPrice * 12;
    const discountedPrice = Math.round(yearlyPrice * 0.85);
    return {
      price: formatPrice(discountedPrice),
      note: 'บาท/ปี',
      discountLabel: `ประหยัด ${formatPrice(yearlyPrice - discountedPrice)} บาท`,
    };
  }
  return { price: formatPrice(monthlyPrice), note: 'บาท/เดือน', discountLabel: '' };
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

function StoreBadge({ href, disabled = false, icon: Icon, eyebrow, label }) {
  const content = (
    <>
      <Icon className="h-8 w-8 shrink-0" fill="currentColor" />
      <span className="text-left leading-none">
        <span className="block text-[10px] font-semibold uppercase tracking-wide text-white/70">{eyebrow}</span>
        <span className="mt-1 block text-lg font-bold text-white">{label}</span>
      </span>
    </>
  );

  if (disabled || !href) {
    return (
      <button type="button" disabled className="inline-flex h-16 min-w-[190px] cursor-not-allowed items-center justify-center gap-3 rounded-2xl bg-slate-950 px-5 text-white opacity-55">
        {content}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex h-16 min-w-[190px] items-center justify-center gap-3 rounded-2xl bg-slate-950 px-5 text-white shadow-[0_20px_50px_rgba(2,8,23,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-800">
      {content}
    </a>
  );
}

function getOrCreateLandingVisitorKey() {
  if (typeof window === 'undefined') return '';
  try {
    const existingKey = window.localStorage.getItem(LANDING_VISITOR_KEY);
    if (existingKey) return existingKey;
    const randomPart = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const visitorKey = `landing:${randomPart}`;
    window.localStorage.setItem(LANDING_VISITOR_KEY, visitorKey);
    return visitorKey;
  } catch {
    return `landing:${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

export default function App() {
  const signupRef = useRef(null);
  const pageViewTrackedRef = useRef(false);
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
  const [billingIntervals, setBillingIntervals] = useState({});

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
          preferredBillingInterval: current.preferredBillingInterval || 'monthly',
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

  useEffect(() => {
    if (pageViewTrackedRef.current) return;
    pageViewTrackedRef.current = true;

    const visitorKey = getOrCreateLandingVisitorKey();
    if (!visitorKey) return;

    const payload = JSON.stringify({
      visitorKey,
      path: `${window.location.pathname || '/'}${window.location.search || ''}`.slice(0, 255),
      referrer: document.referrer || '',
    });
    const endpoint = `${API_BASE_URL}/subscription/page-view`;

    if (navigator.sendBeacon) {
      const sent = navigator.sendBeacon(endpoint, new Blob([payload], { type: 'application/json' }));
      if (sent) return;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }, []);

  function scrollToSignup() {
    signupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function setPlanBillingInterval(planCode, interval) {
    setBillingIntervals((current) => ({ ...current, [planCode]: interval }));
    setForm((current) => (
      current.preferredPlanCode === planCode ? { ...current, preferredBillingInterval: interval } : current
    ));
  }

  function selectPlan(planCode) {
    const interval = billingIntervals[planCode] || 'monthly';
    setForm((current) => ({ ...current, preferredPlanCode: planCode, preferredBillingInterval: interval }));
    signupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          preferredPlanCode: form.preferredPlanCode || DEFAULT_PLAN_CODE,
          preferredBillingInterval: form.preferredBillingInterval || 'monthly',
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
        preferredBillingInterval: current.preferredBillingInterval,
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
            <a href="#features" className="hover:text-white">ฟีเจอร์</a>
            <a href="#pricing" className="hover:text-white">แพ็คเกจ</a>
            <a href="#signup" className="hover:text-white">สมัครใช้งาน</a>
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
                  ระบบจองพื้นที่ขายและจัดการตลาดที่
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
                <a
                  href={DEMO_LOGIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Demo
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[var(--color-accent)] bg-[rgba(20,184,166,0.14)] px-7 text-base font-semibold text-[var(--color-accent-soft)] transition hover:bg-[rgba(20,184,166,0.22)]"
                >
                  <Download className="h-5 w-5" />
                  ดาวน์โหลดแอป Android
                </a>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/8 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">บัญชีทดสอบ Demo</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <p>รหัสองค์กร: <span className="font-semibold text-[var(--color-accent-soft)]">{DEMO_ACCOUNT.organizationCode}</span></p>
                  <p>Username: <span className="font-semibold text-[var(--color-accent-soft)]">{DEMO_ACCOUNT.username}</span></p>
                  <p>Password: <span className="font-semibold text-[var(--color-accent-soft)]">{DEMO_ACCOUNT.password}</span></p>
                </div>
              </div>
            </div>

            <div className="hero-panel">
              <div className="hero-panel-header">
                <span className="hero-dot bg-emerald-400" />
                <span className="hero-dot bg-amber-400" />
                <span className="hero-dot bg-rose-400" />
              </div>

              <div className="grid gap-4 lg:grid-cols-1">
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
                        <p className="text-sm text-slate-300">อัตราการใช้บูธวันนี้</p>
                        <p className="text-sm font-semibold text-emerald-300">{overview?.occupancyRateToday ?? 0}%</p>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-white/8">
                        <div className="h-2 rounded-full bg-[var(--color-accent)] transition-all" style={{ width: `${overview?.occupancyRateToday ?? 0}%` }} />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/6 p-4">
                        <p className="text-sm text-slate-300">บูธเปิดใช้งาน</p>
                        <p className="mt-2 text-3xl font-semibold leading-none text-white">{overview?.activeBooths ?? 0}</p>
                      </div>
                      <div className="rounded-2xl bg-white/6 p-4">
                        <p className="text-sm text-slate-300">ตลาดที่เปิดอยู่</p>
                        <p className="mt-2 text-3xl font-semibold leading-none text-white">{overview?.activeMarkets ?? 0}</p>
                      </div>
                      <div className="rounded-2xl bg-white/6 p-4">
                        <p className="text-sm text-slate-300">ยอดชำระวันนี้</p>
                        <p className="mt-2 whitespace-nowrap text-3xl font-semibold leading-none text-white">{paidAmountTodayLabel}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="hero-surface hero-surface-secondary">
                  <div className="grid gap-4">
                    <div className="rounded-2xl bg-[var(--color-sand)] p-5 text-[var(--color-ink)]">
                      <p className="text-sm font-medium">เริ่มต้นใช้งาน</p>
                      <p className="mt-2 whitespace-nowrap text-3xl font-semibold leading-tight">ใช้ฟรี 3 เดือน</p>
                      <p className="mt-2 text-sm text-slate-700">เปิดระบบให้ทดลองใช้งานก่อนเริ่มคิดค่าบริการ</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[rgba(17,148,131,0.1)]">
                            <Building2 className="h-5 w-5 text-[var(--color-accent)]" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-medium leading-5 text-slate-600">องค์กรที่เปิดใช้งาน</p>
                            <p className="mt-1 text-3xl font-semibold leading-none text-slate-950">{overview?.activeOrganizations ?? 0}</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[rgba(17,148,131,0.1)]">
                            <MapPinned className="h-5 w-5 text-[var(--color-accent)]" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-medium leading-5 text-slate-600">ตลาดที่เปิดอยู่</p>
                            <p className="mt-1 text-3xl font-semibold leading-none text-slate-950">{overview?.activeMarkets ?? 0}</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[rgba(17,148,131,0.1)]">
                            <Eye className="h-5 w-5 text-[var(--color-accent)]" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-medium leading-5 text-slate-600">ผู้เข้าชมวันนี้</p>
                            <p className="mt-1 text-3xl font-semibold leading-none text-slate-950">{overview?.landingVisitorsToday ?? 0}</p>
                          </div>
                        </div>
                      </div>
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

        <section id="app-preview" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="rounded-[2.5rem] border border-white/10 bg-white p-5 shadow-[0_30px_100px_rgba(2,8,23,0.18)] lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(17,148,131,0.12)] text-[var(--color-accent)]">
                  <MonitorSmartphone className="h-7 w-7" />
                </div>
                <div>
                  <p className="section-kicker">Web Admin + Mobile App</p>
                  <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-slate-950 lg:text-5xl">
                    เห็นภาพการใช้งานจริงทั้งระบบจัดการและแอปฯ ผู้ค้า
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                    ผู้ดูแลจัดการตลาด บูธ รายงาน และบัญชีผ่าน Web Admin ส่วนผู้ค้าใช้แอปฯ เพื่อค้นหาตลาด เลือกบูธ ยืนยันรายการ และติดตามการชำระเงินได้ใน flow เดียวกัน
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <StoreBadge href={PLAY_STORE_URL} icon={Play} eyebrow="Get it on" label="Google Play" />
                  <StoreBadge href={APP_STORE_URL} disabled icon={Apple} eyebrow="Download on the" label="App Store" />
                </div>
                <p className="text-sm font-semibold text-slate-500">Android พร้อมใช้งานก่อน ส่วน iOS อยู่ระหว่างเตรียมเผยแพร่</p>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-3 shadow-inner">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { src: appMarketListPreview, alt: 'ตัวอย่างแอป Jonglock หน้ารายการตลาด' },
                    { src: appBoothGridPreview, alt: 'ตัวอย่างแอป Jonglock หน้าเลือกบูธ' },
                    { src: appBoothDetailPreview, alt: 'ตัวอย่างแอป Jonglock รายละเอียดบูธและสรุปรายการจอง' },
                  ].map((item) => (
                    <figure key={item.src} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                      <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
                    </figure>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
              <figure className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50">
                <img src={managementDashboardPreview} alt="ตัวอย่าง Dashboard ระบบจัดการ Jonglock" className="h-full w-full object-cover" loading="lazy" />
              </figure>
              <div className="grid gap-4">
                <figure className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50">
                  <img src={managementBoothsPreview} alt="ตัวอย่างหน้าจัดการบูธ Jonglock" className="h-full w-full object-cover" loading="lazy" />
                </figure>
                <figure className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50">
                  <img src={managementReportsPreview} alt="ตัวอย่างหน้ารายงานการจอง Jonglock" className="h-full w-full object-cover" loading="lazy" />
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="section-heading">
            <p className="section-kicker">แพ็คเกจ</p>
            <h2 className="section-title section-title-light whitespace-nowrap">แพ็กเกจที่พร้อมต่อยอดเป็นระบบค่าบริการ</h2>
          </div>

          {loadingPlans ? <div className="empty-panel">กำลังโหลดข้อมูลแพ็คเกจ...</div> : null}
          {planError ? <div className="empty-panel empty-panel-error">{planError.replaceAll('subscription', 'แพ็คเกจ')}</div> : null}

          {!loadingPlans && !planError ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => {
                const active = plan.code === selectedPlan?.code;
                const planPresentation = getPlanPresentation(plan);
                const billingInterval = billingIntervals[plan.code] || 'monthly';
                const hasPaidPrice = Number(planPresentation.monthlyPrice || plan.base_price || 0) > 0;
                const price = getPlanPrice(plan, billingInterval);
                return (
                  <article key={plan.code} className={`plan-card ${active ? 'plan-card-active' : ''}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-accent-deep)]">{planPresentation.badge}</p>
                        <h3 className="mt-2 text-3xl font-semibold text-slate-950">{planPresentation.name}</h3>
                      </div>
                      {active ? <span className="rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-white">เลือกอยู่</span> : null}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{planPresentation.description}</p>
                    {hasPaidPrice ? (
                      <div className="mt-5 grid grid-cols-2 rounded-full bg-slate-100 p-1 text-sm font-semibold text-slate-600">
                        <button
                          type="button"
                          onClick={() => setPlanBillingInterval(plan.code, 'monthly')}
                          className={`h-10 rounded-full transition ${billingInterval === 'monthly' ? 'bg-white text-slate-950 shadow-sm' : 'hover:text-slate-950'}`}
                        >
                          รายเดือน
                        </button>
                        <button
                          type="button"
                          onClick={() => setPlanBillingInterval(plan.code, 'yearly')}
                          className={`h-10 rounded-full transition ${billingInterval === 'yearly' ? 'bg-white text-slate-950 shadow-sm' : 'hover:text-slate-950'}`}
                        >
                          รายปี -15%
                        </button>
                      </div>
                    ) : null}
                    <div className="mt-6 flex items-end gap-2">
                      <span className="font-display text-4xl font-semibold text-slate-950">{price.price}</span>
                      <span className="pb-2 text-sm text-slate-500">{price.note}</span>
                    </div>
                    {price.discountLabel ? <p className="mt-2 text-sm font-semibold text-emerald-700">{price.discountLabel}</p> : null}
                    <p className="mt-2 text-sm font-medium text-[var(--color-accent-deep)]">{planPresentation.trialLabel}</p>
                    <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium text-slate-500">ตลาด</p>
                        <p className="mt-1 font-semibold text-slate-950">{formatQuota(plan.included_markets)} ตลาด</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500">แอดมิน</p>
                        <p className="mt-1 font-semibold text-slate-950">{planPresentation.adminLimit} คน</p>
                      </div>
                    </div>
                    <ul className="mt-6 space-y-3 pb-6 text-sm text-slate-700">
                      {decodeFeatures(plan).map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <BadgeCheck className="h-4 w-4 text-[var(--color-accent)]" />
                          {translateFeature(feature)}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => selectPlan(plan.code)}
                      className={`mt-auto inline-flex h-12 w-full items-center justify-center rounded-full px-5 text-sm font-semibold transition ${
                        active
                          ? 'bg-[var(--color-ink)] text-white hover:bg-slate-800'
                          : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-deep)]'
                      }`}
                    >
                      {active ? 'เลือกแพ็คเกจนี้อยู่' : 'เลือกแพ็คเกจนี้'}
                    </button>
                  </article>
                );
              })}
            </div>
          ) : null}
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <div className="rounded-[2.25rem] bg-white p-7 shadow-[0_28px_90px_rgba(15,23,42,0.1)] lg:p-9">
            <div className="section-heading">
              <p className="section-kicker">FAQ</p>
              <h2 className="section-title whitespace-nowrap">คำถามที่พบบ่อยเกี่ยวกับระบบจองพื้นที่ขาย</h2>
              <p className="section-copy">
                สรุปคำตอบสำคัญสำหรับเจ้าของตลาดหรือทีมบริหารพื้นที่ขายที่กำลังมองหาระบบจองบูธและจัดการตลาดแบบครบวงจร
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {faqItems.map((item) => (
                <article key={item.question} className="faq-card">
                  <h3 className="text-lg font-semibold leading-7 text-slate-950">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
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
                      <p className="mt-2">แพ็คเกจที่เลือก: {getPlanPresentation(selectedPlan).name}</p>
                      <p className="mt-1">รอบบิลที่เลือก: {form.preferredBillingInterval === 'yearly' ? 'รายปี พร้อมส่วนลด 15%' : 'รายเดือน'}</p>
                      <p className="mt-1">ระบบจะผูกคำขอสมัครเข้ากับแพ็คเกจที่เลือก เพื่อรองรับการเปิดระบบค่าบริการในอนาคต</p>
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

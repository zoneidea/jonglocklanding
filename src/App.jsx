import React, { useEffect, useRef, useState } from 'react';
import {
  Apple,
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChartColumnIncreasing,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FileText,
  Layers3,
  MapPinned,
  Megaphone,
  MessageCircleWarning,
  MonitorSmartphone,
  PhoneCall,
  Play,
  QrCode,
  ReceiptText,
  ScanLine,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Store,
  UserCheck,
  UsersRound,
  WalletCards,
} from 'lucide-react';
import jonglockLogoWhite from './assets/jonglock-logo-white.png';
import appMarketListPreview from './assets/showcase/app-market-list.svg';
import appBoothGridPreview from './assets/showcase/app-booth-grid.svg';
import appBoothDetailPreview from './assets/showcase/app-booth-detail.svg';
import managementDashboardPreview from './assets/showcase/management-dashboard.webp';
import managementBoothsPreview from './assets/showcase/management-booths.webp';

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
  { label: 'ดูล็อกว่างได้ทันที', value: 'ลดจองซ้ำ', icon: SearchCheck },
  { label: 'ผู้ค้าจองผ่านแอป', value: 'Mobile booking', icon: PhoneCall },
  { label: 'รายงานพร้อมใช้งาน', value: 'Booking + Payment', icon: ReceiptText },
];

const painPoints = [
  { title: 'รับจองผ่าน LINE หรือโทรศัพท์', description: 'ข้อมูลกระจัดกระจาย แอดมินต้องไล่ย้อนแชทและจดข้อมูลเอง', icon: MessageCircleWarning },
  { title: 'ผู้ค้าถามซ้ำทุกวัน', description: 'ล็อกว่างไหม ราคาเท่าไร จองได้วันไหน กลายเป็นงานตอบคำถามซ้ำ', icon: PhoneCall },
  { title: 'เช็กสลิปเองและเสี่ยงยอดผิด', description: 'ข้อมูลการจองกับยอดเงินไม่ต่อกัน ทำให้ตรวจสอบยาก', icon: WalletCards },
  { title: 'จองซ้ำหรือล็อกชนกัน', description: 'ไม่มีสถานะล็อกตามวันที่ชัดเจน ทำให้เกิดรายการซ้อนกันได้', icon: CalendarDays },
  { title: 'หลายโซนหลายราคาแต่ยังใช้ Excel', description: 'จัดการยากเมื่อมีหลายตลาด หลายผัง หรือหลายประเภทสินค้า', icon: FileText },
  { title: 'ตรวจหน้างานไม่เป็นระบบ', description: 'ไม่รู้ว่าผู้ค้ามาขายตรงวัน ตรงล็อก หรือขายสินค้าถูกประเภทหรือไม่', icon: ClipboardCheck },
];

const coreFeatures = [
  {
    title: 'จัดการตลาดและพื้นที่ขาย',
    description: 'เพิ่มตลาด โซน ล็อก บูธ ราคา และประเภทสินค้าที่ขายได้',
    icon: Building2,
  },
  {
    title: 'ระบบจองพื้นที่ขาย',
    description: 'ผู้ค้าดูล็อกว่าง เลือกวันที่ เลือกบูธ ส่งคำขอจอง และติดตามสถานะ',
    icon: CalendarDays,
  },
  {
    title: 'ระบบชำระเงิน',
    description: 'รองรับ QR Payment, การแนบหลักฐาน และเชื่อมข้อมูลการจองกับยอดเงิน',
    icon: CreditCard,
  },
  {
    title: 'จัดการผู้ค้า',
    description: 'เก็บข้อมูลผู้ค้า ประวัติการจอง ประเภทสินค้าที่ขาย และสถานะการใช้งาน',
    icon: UsersRound,
  },
  {
    title: 'ข่าวสารและประกาศ',
    description: 'แจ้งข่าวสาร กฎตลาด วันหยุด วันเปิดตลาด หรือกิจกรรมพิเศษถึงผู้ค้า',
    icon: Megaphone,
  },
  {
    title: 'ตรวจตลาด / Audit',
    description: 'ตรวจวันขาย ล็อกที่ขายจริง ประเภทสินค้า และบันทึกค่าปรับได้เป็นระบบ',
    icon: ShieldCheck,
  },
];

const roleCards = [
  {
    title: 'เจ้าของตลาด / แอดมิน',
    description: 'จัดการตลาด พื้นที่ขาย การจอง ผู้ค้า การชำระเงิน และรายงานได้ในระบบเดียว',
    icon: MonitorSmartphone,
  },
  {
    title: 'พ่อค้าแม่ค้า',
    description: 'ค้นหาตลาด ดูรายละเอียด เลือกวันขาย จองพื้นที่ ติดตามข่าวสาร และดูสถานะการจองได้ง่าย',
    icon: Store,
  },
  {
    title: 'เจ้าหน้าที่ตรวจตลาด',
    description: 'ตรวจสอบการเข้าใช้พื้นที่จริง ตรวจล็อก ตรวจวันขาย และตรวจประเภทสินค้าได้สะดวกขึ้น',
    icon: ScanLine,
  },
];

const targetCustomers = [
  'ตลาดนัด',
  'ตลาดสด',
  'ตลาดกลางคืน',
  'ตลาดเปิดท้าย',
  'ตลาดชุมชน',
  'Food Court',
  'พื้นที่ให้เช่าขายของ',
  'งานอีเวนต์ / งานแฟร์',
  'ผู้จัดงานขายของชั่วคราว',
  'องค์กรที่มีพื้นที่ขายสินค้า',
];

const benefitItems = [
  'ลดงานแอดมิน',
  'ลดการตอบคำถามซ้ำ',
  'ลดปัญหาจองซ้ำ',
  'ลดความผิดพลาดจากการจดมือ',
  'เก็บข้อมูลผู้ค้าเป็นระบบ',
  'ตรวจสอบรายได้ง่ายขึ้น',
  'ผู้ค้าจองเองได้สะดวกขึ้น',
  'ตลาดดูเป็นมืออาชีพมากขึ้น',
  'ตรวจสอบหน้างานได้ดีขึ้น',
  'รองรับการเติบโตของตลาด',
];

const howItWorks = [
  {
    step: '01',
    title: 'ตั้งค่าตลาด',
    description: 'เพิ่มข้อมูลตลาด โซน ล็อก ราคา และประเภทสินค้าที่อนุญาตให้ขาย',
  },
  {
    step: '02',
    title: 'เปิดให้ผู้ค้าจอง',
    description: 'ผู้ค้าดูรายละเอียด เลือกวัน เลือกล็อก และจองพื้นที่ผ่านระบบ',
  },
  {
    step: '03',
    title: 'จัดการและตรวจสอบ',
    description: 'แอดมินตรวจสอบการจอง การชำระเงิน รายงาน และเจ้าหน้าที่ตรวจหน้างาน',
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="landing-noise" />

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" aria-label="Jonglock" className="flex items-center rounded-2xl bg-[var(--color-ink)] px-3 py-2">
            <img src={jonglockLogoWhite} alt="Jonglock ระบบจองพื้นที่ขาย" className="h-16 w-auto object-contain sm:h-20" />
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
            <a href="#features" className="hover:text-[var(--color-accent)]">ฟีเจอร์</a>
            <a href="#preview" className="hover:text-[var(--color-accent)]">ตัวอย่างระบบ</a>
            <a href="#pricing" className="hover:text-[var(--color-accent)]">แพ็คเกจ</a>
            <a href="#signup" className="hover:text-[var(--color-accent)]">สมัครใช้งาน</a>
          </nav>

          <button
            type="button"
            onClick={scrollToSignup}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-deep)]"
          >
            เริ่มทดลองใช้ฟรี
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-5 py-14 lg:px-8 lg:py-20">
          <div className="hero-orb hero-orb-left" />
          <div className="hero-orb hero-orb-right" />
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-[var(--color-accent-deep)] shadow-sm">
                <Sparkles className="h-4 w-4" />
                ระบบจองพื้นที่ขายสำหรับตลาดยุคใหม่
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.03] text-slate-950 sm:text-6xl lg:text-7xl">
                  เลิกจองล็อกผ่านแชท
                  <span className="block text-[var(--color-accent)]">จัดการตลาดได้ครบในระบบเดียว</span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  JongLock ช่วยเจ้าของตลาดจัดการล็อกว่าง การจองพื้นที่ ผู้ค้า การชำระเงิน ข่าวสาร และการตรวจตลาด ให้เป็นระบบ ลดงานแอดมิน ลดปัญหาจองซ้ำ และดูรายงานได้ง่ายขึ้น
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {highlights.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                    <Icon className="mb-4 h-5 w-5 text-[var(--color-accent)]" />
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={scrollToSignup}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 text-base font-semibold text-white shadow-[0_18px_45px_rgba(17,148,131,0.25)] transition hover:bg-[var(--color-accent-deep)]"
                >
                  ขอทดลองใช้งาน
                  <ArrowRight className="h-5 w-5" />
                </button>
                <a
                  href={DEMO_LOGIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-base font-semibold text-slate-950 transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  ดูตัวอย่างระบบ
                </a>
              </div>
            </div>

            <div className="hero-product-card">
              <div className="hero-panel-header">
                <span className="hero-dot bg-emerald-400" />
                <span className="hero-dot bg-amber-400" />
                <span className="hero-dot bg-rose-400" />
              </div>
              <div className="hero-dashboard-frame">
                <img src={managementDashboardPreview} alt="ตัวอย่างระบบจัดการ Jonglock" className="h-full w-full object-cover object-top" />
              </div>
              <div className="hero-phone-stack">
                <img src={appMarketListPreview} alt="หน้ารายการตลาดในแอป Jonglock" />
                <img src={appBoothGridPreview} alt="หน้าเลือกบูธในแอป Jonglock" />
              </div>
              <div className="hero-stat-card">
                <p>เริ่มต้นใช้งาน</p>
                <strong>ใช้ฟรี 3 เดือน</strong>
                <span>พร้อมทดลองครบทุกฟังก์ชัน</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker">Pain points</p>
              <h2 className="section-title">ตลาดของคุณยังเจอปัญหาแบบนี้อยู่ไหม?</h2>
              <p className="section-copy">ปัญหาที่ดูเล็กในแต่ละวัน มักกลายเป็นต้นทุนเวลา ความผิดพลาด และประสบการณ์ที่ไม่ดีของผู้ค้า</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {painPoints.map(({ title, description, icon: Icon }) => (
                <article key={title} className="pain-card">
                  <Icon className="h-5 w-5 text-rose-500" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <p className="section-kicker">Solution</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-slate-950">
                JongLock เปลี่ยนการจัดการตลาดให้เป็นระบบออนไลน์
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                รวมงานจองพื้นที่ ผังบูธ ผู้ค้า การชำระเงิน ข่าวสาร และการตรวจตลาดไว้ใน workflow เดียว เพื่อให้ทีมตลาดทำงานเร็วขึ้นและตรวจสอบย้อนหลังได้ชัดเจน
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="solution-metric"><strong>{overview?.activeMarkets ?? 0}</strong><span>ตลาดที่เปิดอยู่</span></div>
                <div className="solution-metric"><strong>{overview?.activeBooths ?? 0}</strong><span>บูธเปิดใช้งาน</span></div>
                <div className="solution-metric"><strong>{overview?.landingVisitorsToday ?? 0}</strong><span>ผู้เข้าชมวันนี้</span></div>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {roleCards.map(({ title, description, icon: Icon }) => (
                <article key={title} className="role-card">
                  <span><Icon className="h-6 w-6" /></span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-white px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker">Core features</p>
              <h2 className="section-title">ฟีเจอร์หลักสำหรับระบบจอง JongLock</h2>
              <p className="section-copy">ออกแบบให้ครอบคลุมงานของตลาดตั้งแต่ตั้งค่าพื้นที่ เปิดจอง รับชำระเงิน ไปจนถึงตรวจหน้างาน</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {coreFeatures.map(({ title, description, icon: Icon }) => (
                <article key={title} className="feature-module-card">
                  <span><Icon className="h-6 w-6" /></span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker">For market operators</p>
              <h2 className="section-title">เหมาะกับใครบ้าง?</h2>
              <p className="section-copy">JongLock เหมาะกับธุรกิจหรือองค์กรที่มีพื้นที่ขายและต้องการบริหารข้อมูลให้เป็นระบบมากขึ้น</p>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {targetCustomers.map((item) => (
                <div key={item} className="target-pill">
                  <Store className="h-4 w-4" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div>
              <p className="section-kicker">Benefits</p>
              <h2 className="section-title">ทำไมเจ้าของตลาดควรเลือกใช้ JongLock?</h2>
              <p className="section-copy">
                ระบบไม่ได้ช่วยแค่เปิดจองออนไลน์ แต่ช่วยทำให้ข้อมูลตลาด ผู้ค้า และการเงินมีโครงสร้างพร้อมต่อยอดในระยะยาว
              </p>
              <button
                type="button"
                onClick={scrollToSignup}
                className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-7 text-base font-semibold text-white transition hover:bg-[var(--color-accent-deep)]"
              >
                ขอเริ่มทดลองใช้งาน
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {benefitItems.map((item) => (
                <div key={item} className="benefit-card">
                  <BadgeCheck className="h-5 w-5 text-[var(--color-accent)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker">How it works</p>
              <h2 className="section-title">เริ่มใช้งานง่าย ๆ ใน 3 ขั้นตอน</h2>
              <p className="section-copy">ตั้งค่าข้อมูลพื้นฐาน เปิดให้ผู้ค้าจอง และจัดการงานหลังบ้านต่อได้ทันที</p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {howItWorks.map((item) => (
                <article key={item.step} className="step-card">
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="preview" className="bg-white px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker">Product preview</p>
              <h2 className="section-title">ตัวอย่างระบบจัดการและแอปฯ ผู้ค้า</h2>
              <p className="section-copy">ดูภาพรวมการใช้งานจริงทั้งฝั่ง Web Admin และ Mobile App ใน flow เดียวกัน</p>
            </div>
            <div className="mt-12 rounded-[2.5rem] border border-slate-200 bg-slate-50 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.10)] lg:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(17,148,131,0.12)] text-[var(--color-accent)]">
                    <MonitorSmartphone className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-4xl font-semibold leading-tight text-slate-950">Web Admin + Mobile App</h3>
                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                    ผู้ดูแลจัดการตลาด บูธ รายงาน และบัญชีผ่าน Web Admin ส่วนผู้ค้าใช้แอปฯ เพื่อค้นหาตลาด เลือกบูธ ยืนยันรายการ และติดตามการชำระเงิน
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <StoreBadge href={PLAY_STORE_URL} icon={Play} eyebrow="Get it on" label="Google Play" />
                    <StoreBadge href={APP_STORE_URL} disabled icon={Apple} eyebrow="Download on the" label="App Store" />
                  </div>
                </div>
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
              <div className="mt-8 grid gap-5">
                <figure className="h-[360px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.10)] sm:h-[440px] lg:h-[560px]">
                  <img src={managementDashboardPreview} alt="ตัวอย่าง Dashboard ระบบจัดการ Jonglock" className="h-full w-full object-cover object-top" loading="lazy" />
                </figure>
                <figure className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.10)]">
                  <img src={managementBoothsPreview} alt="ตัวอย่างหน้าจัดการบูธ Jonglock" className="w-full object-cover object-top" loading="lazy" />
                </figure>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="section-heading">
            <p className="section-kicker">แพ็คเกจ</p>
            <h2 className="section-title whitespace-nowrap">แพ็กเกจที่พร้อมต่อยอดเป็นระบบค่าบริการ</h2>
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
      <footer className="border-t border-slate-200 px-5 py-8 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 lg:px-8">
        {POWERED_BY_TEXT}
      </footer>
    </div>
  );
}

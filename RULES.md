# Landing Rules

ใช้กับโปรเจกต์ `landing/` เท่านั้น

## 1. Stack และขอบเขต

- React + Vite + Tailwind
- เป็น product marketing site ของ Jonglock
- ต้องคง package section เดิม, signup form เดิม, และ public API เดิม เว้นแต่ requirement ระบุชัด

## 2. Content Rules

- เนื้อหาต้องขายประโยชน์ทางธุรกิจจริง ไม่พูดกว้างเกินไป
- CTA หลักต้องชัด:
  - ทดลองใช้งาน
  - ดูระบบจัดการ
  - ดาวน์โหลดแอป
- ถ้าแก้ signup flow ต้องตรวจ redirect ไป management login พร้อม `organizationCode`

## 3. Design Rules

- ใช้ visual direction ที่ทันสมัย แต่ยังผูกกับแบรนด์ Jonglock
- mobile screenshot / management screenshot ต้องใช้เพื่อสื่อ flow จริง ไม่ใช่ตกแต่งเฉย ๆ
- หลีกเลี่ยง section ที่ซ้ำเนื้อหา
- ต้องรักษา hierarchy:
  - hero
  - value proposition
  - feature proof
  - package
  - signup

## 4. SEO Rules

- ถ้าแก้ structure หรือ content สำคัญ ให้ตรวจ:
  - title
  - meta description
  - canonical
  - open graph / twitter meta
  - structured data ถ้ามี
  - sitemap / robots ถ้าเกี่ยวข้อง
- keyword ต้องสอดคล้องกับ product จริง เช่น จองพื้นที่ขาย, ระบบจัดการตลาด, ตลาดนัด, booking platform

## 5. Token Efficiency สำหรับ Landing

- เริ่มอ่านจาก:
  - `AGENT.md`
  - `package.json`
  - `src/App.jsx`
  - `src/styles.css`
  - asset import ที่ใช้บนหน้า
- ถ้าปรับ copy หรือ section เดียว ให้เปิดเฉพาะ block นั้นใน `App.jsx`
- ถ้าปรับ SEO ให้เปิด `index.html`, public assets, และ config ที่เกี่ยวข้องเท่านั้น

## 6. Verification

- หลังแก้ทุกครั้งต้องรัน `npm run build`
- ถ้าแก้ image/asset path ต้องตรวจว่า bundle หาไฟล์เจอ
- ถ้าแก้ CTA/external links ต้องตรวจ URL ปลายทาง

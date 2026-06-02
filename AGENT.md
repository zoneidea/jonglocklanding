# Jonglock Landing Agent Guide

## Context

Landing page ใช้ React + Vite + Tailwind CSS สำหรับนำเสนอแพ็กเกจและรับสมัครองค์กรใหม่ โดยเชื่อมต่อ backend public API เดิม

## Development

```bash
npm install
npm run dev
npm run build
```

หลังแก้ไข Landing page ทุกครั้งต้องรัน `npm run build` ให้ผ่านก่อนส่งงานหรือ deploy เสมอ แม้เป็นการแก้ข้อความ รูปภาพ สี หรือ layout เล็กน้อย เพื่อยืนยันว่า production bundle ยัง build ได้จริง

## Important Constraints

- ห้าม commit `dist` และ `node_modules`
- ห้ามใส่ secret, DB password หรือ token ในไฟล์ frontend
- Signup form ต้องส่งข้อมูลไป backend public API เท่านั้น
- หากแก้ flow สมัครใช้งาน ต้องตรวจให้ redirect ไป management login พร้อม `organizationCode` ได้ถูกต้อง

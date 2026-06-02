# Jonglock Landing Domains

## UAT

- Landing: `https://jonglock.zonedevnode.com`
- Public API: `https://jonglockapi.zonedevnode.com/api/public`
- Management redirect: `https://jonglockmng.zonedevnode.com`

## Production

- Landing: `https://jonglock.com`
- Public API: `https://api.jonglock.com/api/public`
- Management redirect: `https://management.jonglock.com`
- Demo management: `https://jonglockmng.zonedevnode.com`

## Environment Variables

```bash
VITE_PUBLIC_API_BASE_URL=https://api.jonglock.com/api/public
VITE_MANAGEMENT_APP_URL=https://management.jonglock.com
VITE_DEMO_MANAGEMENT_APP_URL=https://jonglockmng.zonedevnode.com
```

Use UAT values for UAT builds and Production values for production builds.

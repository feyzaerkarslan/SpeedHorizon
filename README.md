# SpeedHorizon

Modern motosiklet ve scooter satış platformu.

<!-- Test commit for CI/CD pipeline -->

## 🚀 CI/CD Pipeline

Bu proje GitHub Actions ile otomatik CI/CD pipeline kullanmaktadır.

### Otomatik Deployment
- `main` branch'e push yaptığınızda otomatik deploy
- Frontend: Netlify
- Backend: Render

### Workflow Dosyaları
- `basic-deploy.yml`: Basit frontend deployment
- `simple-ci-cd.yml`: Tam CI/CD (önerilen)
- `ci-cd.yml`: Gelişmiş CI/CD

### Kurulum
Detaylı kurulum rehberi için `GITHUB_ACTIONS_SETUP.md` dosyasını inceleyin.

## 🛠️ Geliştirme

```bash
# Frontend
npm run dev

# Backend
cd src/api
npm run backend
```

## 📚 Dokümantasyon

1. [Gereksinim Analizi](Gereksinim-Analizi.md)
2. [Durum Diyagramı](Durum-Diyagramı.md)   
3. [Durum Senaryoları](Durum-Senaryoları.md)
4. [Frontend](Frontend.md)
5. [Backend](backend.md)
6. [Video Sunum](videosunum.md)

## 📚 Ek Dokümantasyon

- `GITHUB_ACTIONS_SETUP.md`: CI/CD kurulum rehberi
- `NETLIFY_SETUP.md`: Netlify token alma
- `RENDER_SETUP.md`: Render API key alma
- `WORKFLOW_SELECTION.md`: Workflow seçim rehberi

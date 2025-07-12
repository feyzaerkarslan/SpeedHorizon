# GitHub Actions CI/CD Kurulum Rehberi

Bu rehber, SpeedHorizon projeniz için GitHub Actions CI/CD pipeline'ının nasıl kurulacağını açıklar.

## 🚀 Hızlı Başlangıç

### 1. GitHub Secrets Ayarları

GitHub repository'nizde aşağıdaki secrets'ları ayarlayın:

**Settings > Secrets and variables > Actions** bölümüne gidin ve şu secrets'ları ekleyin:

#### Frontend (Netlify) Secrets:
- `NETLIFY_AUTH_TOKEN`: Netlify API token'ınız
- `NETLIFY_SITE_ID`: Netlify site ID'niz
- `NEXT_PUBLIC_API_URL`: Backend API URL'iniz (örn: https://your-backend.onrender.com)

#### Backend (Render) Secrets:
- `RENDER_SERVICE_ID`: Render service ID'niz
- `RENDER_API_KEY`: Render API key'iniz
- `MONGODB_URI`: MongoDB bağlantı string'iniz

### 2. Netlify Token Alma

1. [Netlify](https://netlify.com) hesabınıza giriş yapın
2. **User Settings > Applications > Personal access tokens**
3. **New access token** butonuna tıklayın
4. Token'ı kopyalayıp GitHub secrets'a ekleyin

### 3. Render API Key Alma

1. [Render](https://render.com) hesabınıza giriş yapın
2. **Account Settings > API Keys**
3. **Create API Key** butonuna tıklayın
4. API key'i kopyalayıp GitHub secrets'a ekleyin

### 4. Service ID'leri Bulma

#### Netlify Site ID:
- Netlify dashboard'da sitenizi seçin
- **Site settings > General > Site information**
- **Site ID**'yi kopyalayın

#### Render Service ID:
- Render dashboard'da servisinizi seçin
- URL'deki service ID'yi kopyalayın: `https://dashboard.render.com/web/srv-XXXXXXXXXXXX`

## 📋 Workflow Dosyaları

Projede iki farklı workflow dosyası bulunmaktadır:

### 1. `simple-ci-cd.yml` (Önerilen)
- Basit ve hızlı CI/CD pipeline
- Temel test, build ve deployment
- Başlangıç için ideal

### 2. `ci-cd.yml` (Gelişmiş)
- Kapsamlı test ve güvenlik taramaları
- Performance testleri
- Çoklu Node.js versiyonu testi

## 🔧 Workflow Adımları

### Test ve Build Job:
1. **Checkout**: Kodu GitHub'dan çeker
2. **Setup Node.js**: Node.js 18 kurar
3. **Install Dependencies**: Frontend ve backend bağımlılıklarını yükler
4. **Linting**: Kod kalitesi kontrolü
5. **Tests**: Backend testleri çalıştırır
6. **Build**: Frontend'i build eder

### Deployment Jobs:
1. **Frontend Deployment**: Netlify'ya deploy eder
2. **Backend Deployment**: Render'a deploy eder

## 🎯 Kullanım

### Otomatik Deployment:
- `main` branch'e push yaptığınızda otomatik olarak deploy edilir
- Pull request'lerde sadece test çalışır

### Manuel Deployment:
```bash
# GitHub Actions'da manuel olarak workflow'u tetikleyebilirsiniz
# Actions > Simple CI/CD Pipeline > Run workflow
```

## 🔍 Monitoring

### GitHub Actions:
- **Actions** sekmesinde workflow durumunu takip edin
- Başarısız build'lerde detaylı log'ları inceleyin

### Deployment Durumu:
- Netlify dashboard'da frontend deployment'ını takip edin
- Render dashboard'da backend deployment'ını takip edin

## 🛠️ Sorun Giderme

### Yaygın Hatalar:

1. **Secrets Hatası**:
   ```
   Error: Required secret 'NETLIFY_AUTH_TOKEN' not found
   ```
   **Çözüm**: GitHub secrets'ları kontrol edin

2. **Build Hatası**:
   ```
   Error: Build failed
   ```
   **Çözüm**: Local'de `npm run build` komutunu test edin

3. **Deployment Hatası**:
   ```
   Error: Deploy failed
   ```
   **Çözüm**: Netlify/Render ayarlarını kontrol edin

### Debug İpuçları:
- Workflow log'larını detaylı inceleyin
- Environment variables'ları kontrol edin
- Local'de aynı komutları test edin

## 📞 Destek

Sorun yaşarsanız:
1. GitHub Actions log'larını kontrol edin
2. Secrets ayarlarını doğrulayın
3. Local build'i test edin
4. Gerekirse workflow dosyasını güncelleyin

## 🔄 Güncelleme

Workflow'u güncellemek için:
1. `.github/workflows/` klasöründeki dosyaları düzenleyin
2. Değişiklikleri commit edin
3. GitHub Actions otomatik olarak yeni workflow'u çalıştıracaktır 
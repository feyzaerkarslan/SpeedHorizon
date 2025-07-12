# Workflow Seçim Rehberi

Projenizde 3 farklı CI/CD workflow dosyası bulunmaktadır. İhtiyacınıza göre birini seçin:

## 🟢 1. Basic Deploy (En Basit)
**Dosya**: `.github/workflows/basic-deploy.yml`

### Özellikler:
- ✅ Sadece frontend deployment (Netlify)
- ✅ Basit build ve deploy
- ✅ Hızlı ve güvenilir

### Kullanım:
- Başlangıç seviyesi için ideal
- Sadece frontend'iniz varsa
- Hızlı deployment istiyorsanız

### Gerekli Secrets:
```
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
NEXT_PUBLIC_API_URL
```

## 🟡 2. Simple CI/CD (Önerilen)
**Dosya**: `.github/workflows/simple-ci-cd.yml`

### Özellikler:
- ✅ Frontend + Backend deployment
- ✅ Test ve linting
- ✅ Orta seviye güvenlik

### Kullanım:
- Çoğu proje için ideal
- Hem frontend hem backend'iniz varsa
- Temel test istiyorsanız

### Gerekli Secrets:
```
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
NEXT_PUBLIC_API_URL
RENDER_SERVICE_ID
RENDER_API_KEY
MONGODB_URI
```

## 🔴 3. Advanced CI/CD (Gelişmiş)
**Dosya**: `.github/workflows/ci-cd.yml`

### Özellikler:
- ✅ Kapsamlı test ve güvenlik
- ✅ Performance testleri (Lighthouse)
- ✅ Çoklu Node.js versiyonu testi
- ✅ Detaylı raporlama

### Kullanım:
- Büyük projeler için
- Maksimum güvenlik istiyorsanız
- Performance monitoring istiyorsanız

### Gerekli Secrets:
```
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
NEXT_PUBLIC_API_URL
RENDER_SERVICE_ID
RENDER_API_KEY
MONGODB_URI
```

## 🎯 Önerim

**SpeedHorizon projeniz için `simple-ci-cd.yml` kullanmanızı öneririm** çünkü:
- Hem frontend hem backend'iniz var
- Orta seviye güvenlik yeterli
- Hızlı ve güvenilir

## 📝 Workflow Aktif Etme

1. GitHub repository'nizde **Actions** sekmesine gidin
2. Sol tarafta workflow dosyalarını göreceksiniz
3. İstediğiniz workflow'u seçin
4. **Run workflow** butonuna tıklayın
5. Branch olarak `main` seçin
6. **Run workflow** butonuna tıklayın

## 🔄 Otomatik Çalışma

Workflow aktif olduktan sonra:
- `main` branch'e her push'ta otomatik çalışır
- Pull request'lerde sadece test çalışır
- Başarısız build'lerde deployment durur 
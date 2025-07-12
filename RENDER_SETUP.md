# Render API Key Alma Rehberi

## 1. Render Hesabına Giriş
- [render.com](https://render.com) adresine gidin
- Hesabınıza giriş yapın

## 2. API Key Oluşturma
1. **Account Settings** (sağ üst köşe)
2. **API Keys** sekmesine tıklayın
3. **Create API Key** butonuna tıklayın
4. API key'e bir isim verin (örn: "GitHub Actions")
5. **Create API Key** butonuna tıklayın
6. **API key'i kopyalayın** (bir daha göremezsiniz!)

## 3. Service ID Bulma
1. Render dashboard'da backend servisinizi seçin
2. URL'deki service ID'yi kopyalayın:
   ```
   https://dashboard.render.com/web/srv-XXXXXXXXXXXX
   ```
   Burada `srv-XXXXXXXXXXXX` kısmı service ID'nizdir.

## 4. GitHub Secrets'a Ekleme
- `RENDER_API_KEY`: Kopyaladığınız API key
- `RENDER_SERVICE_ID`: Service ID'niz (srv- ile başlayan kısım) 
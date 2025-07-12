# Netlify Token Alma Rehberi

## 1. Netlify Hesabına Giriş
- [netlify.com](https://netlify.com) adresine gidin
- Hesabınıza giriş yapın

## 2. Personal Access Token Oluşturma
1. **User Settings** (sağ üst köşe) > **Applications**
2. **Personal access tokens** sekmesine tıklayın
3. **New access token** butonuna tıklayın
4. Token'a bir isim verin (örn: "GitHub Actions")
5. **Generate token** butonuna tıklayın
6. **Token'ı kopyalayın** (bir daha göremezsiniz!)

## 3. Site ID Bulma
1. Netlify dashboard'da sitenizi seçin
2. **Site settings** > **General**
3. **Site information** bölümünde **Site ID**'yi kopyalayın

## 4. GitHub Secrets'a Ekleme
- `NETLIFY_AUTH_TOKEN`: Kopyaladığınız token
- `NETLIFY_SITE_ID`: Site ID'niz 
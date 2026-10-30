# Spider Portfolio

Portofolio statis dengan HTML dan CSS bertema superhero merah-biru.

## Isi folder
- `index.html` — struktur halaman
- `style.css` — desain dan responsif

## Cara menjalankan lokal
1. Buka folder ini di VS Code.
2. Buka `index.html`.
3. Jalankan dengan ekstensi Live Server, atau buka file `index.html` langsung di browser.

## Sebelum dipublikasikan
- Ganti `emailkamu@example.com` di `index.html` dengan email yang ingin ditampilkan.
- Ganti informasi profil/proyek sesuai data dan karya terbaru.
- Avatar saat ini berupa inisial `YG`. Jika ingin foto asli, letakkan foto bernama `foto-profil.jpg` di folder yang sama dan ubah elemen `<div class="avatar">YG</div>` menjadi `<img class="avatar" src="foto-profil.jpg" alt="Foto Yustisio">`. CSS avatar perlu menambahkan `object-fit: cover`.

## Publikasi ke GitHub Pages
1. Buat repository baru di GitHub, misalnya `spider-portfolio`.
2. Upload `index.html` dan `style.css` ke root repository.
3. Buka **Settings → Pages**.
4. Di bagian **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**.
6. Tunggu proses selesai. Link situs akan tampil di halaman Pages.

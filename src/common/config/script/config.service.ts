import { Injectable } from '@nestjs/common';

@Injectable()
export class ScriptConfigService {
  constructor() {}
  submitStruk(point?: number) {
    return {
      belumDimulai: {
        title: `Promo undian Nano Nano x One Piece akan dimulai pada tanggal 1 November 2024 - 30 Juni 2025`,
        message: `Lo bisa menukarkan kode unik setelah promo undian dimulai ya Sob.`,
        footer: `Jelajahi Rasanya Rame Nano Nano dan Menangkan Hadiahnya!`,
      },
      berakhir: {
        title: `Promo undian Nano Nano x One Piece sudah berakhir.`,
        message: `Sampai bertemu di program Nano Nano berikutnya!`,
      },
      wrongCode: {
        title: `Kode unik yang Lo masukkan salah`,
        message: `Yuk, masukkan kode unik Lo dengan benar!`,
      },
      codeUsed: {
        title: `Kode unik yang Lo masukkan sudah pernah digunakan.`,
        message: `Yuk, masukkan kode unik Lo yang lainnya.`,
      },
      maximumFile: {
        title: `Ukuran Foto yang Lo Upload lebih dari 10 Megabyte.`,
        message: `Yuk, upload foto Lo yang lain dengan ukuran maksimal 10 Megabyte.`,
      },
      extensionFile: {
        title: `Format Foto yang Lo Upload diluar .JPG/.JPEG.`,
        message: `Yuk, upload foto Lo yang lain dengan format .JPG/.JPEG.`,
      },
      correct: {
        title: `Lo berhasil mendapatkan *${point}* Berry dari kode unik yang Lo masukkan.`,
        message: `Jika Berry Lo tidak bertambah setelah memasukkan kode unik, segera refresh website page untuk memperbarui Berry Lo.`,
        footer: `Yuk, Jelajahi Ramenya Rasa Nano Nano! Kumpulkan Berry sebanyak-banyaknya dan menangkan Hadiahnya!`,
      },
    };
  }

  get register() {
    return {
      success: {
        title: `Yuk, Jelajahi Ramenya Rasa Nano Nano! Kumpulkan Berry sebanyak-banyaknya dan menangkan Hadiahnya!`,
      },
      alreadyPhoneKtpEmail: {
        title: `No. HP/No. KTP/Email Lo sudah terdaftar Sob.`,
        message: `Yuk, login dengan menggunakan No. HP/No. KTP yang sudah terdaftar atau yang sudah Lo daftarkan.`,
      },
      invalidKtp: {
        title: `No. KTP yang Lo masukkan salah Sob.`,
        message: `Yuk, masukkan No. KTP Lo dengan benar!`,
      },
      minPass: {
        title: `Password Lo kurang dari 8 karakter Sob.`,
        message: `Yuk, tulis ulang Password Lo dengan memasukkan minimal 8 karakter.`,
      },
      invalidAge: {
        title: `Usia Lo di bawah 5 Tahun!`,
        message: `Lo boleh melakukan registrasi jika usia diatas 5 Tahun.`,
      },
    };
  }

  get login() {
    return {
      // unregister: `Oops!\n\nNo. HP Lo tidak terdaftar Sob. Yuk, registrasi sekarang juga!`,
      unregister: {
        title: `No. HP Lo tidak terdaftar Sob.`,
        message: `Yuk, registrasi sekarang juga!`,
      },
      combinePass: `Kata Sandi Anda SALAH. Kata Sandi harus mengandung huruf Besar dan huruf kecil serta kombinasi dengan Angka`,
      wrongPass: {
        title: `Password yang Lo masukkan tidak sesuai.`,
        message: `Yuk, masukkan password Lo dengan benar!`,
      },
      success: {
        title: `Selamat datang di Official Website Nano Nano x One Piece!`,
      },
      requiredPass: `Kata sandi harus di masukkan`,

      minPass: `Kata sandi minimal 8 digit.`,
    };
  }

  get forgotPassword() {
    return {
      success: {
        title: `Password Lo berhasil di reset Sob!`,
        message: `Yuk, Login sekarang!`,
      },
      invalidPassword: {
        title: `Password Lo kurang dari 8 karakter.`,
        message: `Yuk, masukkan password Lo minimal 8 karakter.`,
      },
      invalidReType: {
        title: `Password yang Lo masukkan tidak sesuai.`,
        message: `Yuk, retype password Lo dengan benar Sob!`,
      },
      invalidOtp: {
        title: `Kode OTP yang Lo masukkan tidak sesuai.`,
        message: `Yuk, pastikan kode OTP yang Lo masukkan benar Sob!`,
      },
      invalidEmail: {
        title: `Email Lo tidak terdaftar.`,
        message: `Yuk, masukkan email Lo dengan benar!`,
      },
    };
  }

  async tukarBerry(point?: any, product?: string, coupon?: string) {
    return {
      gimmickGopay: `Congrats Sob!\n\nLo berhasil menukarkan *${point}* Berry dan mendapatkan hadiah Gopay senilai Rp. 50.000,-.\n\nGopay akan otomatis di top up ke No. Handphone yang sudah Lo daftarkan dalam waktu 1x24jam.\n\n*Refresh website page untuk memperbarui Berry Lo!*\n\nYuk, Jelajahi Ramenya Rasa Nano Nano! Kumpulkan Berry sebanyak-banyaknya dan menangkan Hadiahnya!`,
      gimmickGooglePlay: `Congrats Sob!\n\nLo berhasil menukarkan *${point}* Berry dengan Voucher Google Play senilai *${product}*\n\nIni dia kode voucher Lo:\n*${coupon}*\n\nYuk, tukarkan lebih banyak Berry dengan kupon undian agar kesempatanmu memenangkan Grand Prize semakin besar!\n\nLo juga bisa cek di menu Riwayat untuk melihat kode Voucher Google Play Lo.\n\n*Refresh website page untuk memperbarui Berry Lo!*`,
      gimmickFisik: `Congrats Sob!\n\nLo berhasil menukarkan *${point}* Berry dan mendapatkan hadiah *${product}* kolaborasi Nano Nano x One Piece.\n\nYuk, Jelajahi Ramenya Rasa Nano Nano! Kumpulkan Berry sebanyak-banyaknya dan menangkan Hadiahnya!\n\nLo bisa dengan mudah klaim hadiah dengan menghubungi kami melalui live chat httpsxxxxx\n\n*Refresh website page untuk memperbarui Berry Lo!*`,
      kuponUndian: `Congrats Sob!\n\nLo berhasil menukarkan *${point}* Berry dan mendapatkan kupon undian.\n\nIni dia kupon undian Lo:\n*${coupon}*\n\nYuk, tukarkan lebih banyak Berry dengan kupon undian agar kesempatanmu memenangkan Grand Prize semakin besar!\n\nSimpan kupon undian Lo dan jangan sampai hilang Sob.\n\nLo juga bisa cek di Menu Riwayat untuk melihat kupon undian Lo.\n\n*Refresh website page untuk memperbarui Berry Lo!*`,
    };
  }

  approve(date: string, reason?: string) {
    return {
      // approve: `Nota pembelian yang Anda kirim pada tanggal ${date} Valid. Untuk proses klaim hadiah silakan cek di Menu Riwayat Anda.`,
      // reject: `Nota pembelian yang Anda kirim pada tanggal ${date} Invalid dengan alasan ${reason}. Silakan Upload kembali Nota pembelian Anda. `,
      // success: `Status E-Kupon berhasil di Update`,
      // unreason: `Silakan pilih salah satu alasan tidak disetujui`,
      // referal: `Selamat anda mendapatkan e-Voucher Rp. 25.000,- dari bagikan Kode Referral. Silakan pilih jenis hadiah (Alfamart / Indomaret, Pulsa / GoPay) di Menu Ambil Hadiah.`
    };
  }

  get redeem() {
    return {
      // alfa: "Selamat Anda menang Hadiah E-Voucher Alfamart senilai Rp. 25.000,-. Silakan cek kode voucher di Menu Riwayat Anda.",
      // indomaret: "Selamat Anda menang Hadiah E-Voucher Indomaret senilai Rp. 25.000,-. Silakan cek kode voucher di Menu Riwayat Anda.",
      // gopay: "Selamat Anda menang Hadiah GoPay senilai Rp. 25.000,-. Silakan cek di Akun GoPay Anda.",
      // alfaIndo: `Selamat Anda menang Hadiah E-Voucher Alfamart/Indomaret senilai Rp. 25.000,-. Silakan cek kode voucher di Menu Riwayat Anda.`,
      // pulsa: `Selamat Anda menang Hadiah Pulsa senilai Rp. 25.000,-. Pulsa akan di top-up maksimal 3 x 24 jam ke No.HP yang Anda pilih pada promo ini. Pastikan HP Anda aktif agar hadiah berhasil terkirim!`,
      // success: `Hadiah berhasil di Klaim`
    };
  }

  get pointReward() {
    return {
      // alfa: "Selamat Anda menang Hadiah E-Voucher Alfamart senilai Rp. 300.000,-. Silakan cek kode voucher di Menu Riwayat Anda.",
      // indomaret: "Selamat Anda menang Hadiah E-Voucher Indomaret senilai Rp. 300.000,-. Silakan cek kode voucher di Menu Riwayat Anda.",
      // gopay: "Selamat Anda menang Hadiah GoPay senilai Rp. 300.000,-. Silakan cek di Akun GoPay Anda.",
      // alfaIndo: `Selamat Anda menang Hadiah E-Voucher Alfamart/Indomaret senilai Rp. 300.000,-. Silakan cek kode voucher di Menu Riwayat Anda.`,
      // pulsa: `Selamat Anda menang Hadiah Pulsa senilai Rp. 300.000,-. Pulsa akan di top-up maksimal 3 x 24 jam ke No.HP yang Anda pilih pada promo ini. Pastikan HP Anda aktif agar hadiah berhasil terkirim!`
    };
  }
}

document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // mengambil nilai inputan
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked');

    // validasi inputan kosong
    if (!weight) {
        showAlert("Berat badan harus diisi!");
        return;
    }
    if (!height) {
        showAlert("Tinggi badan harus diisi!");
        return;
    }
    if (!age) {
        showAlert("Usia harus diisi!");
        return;
    }
    if (!gender) {
        showAlert("Jenis kelamin harus dipilih!");
        return;
    }

    // sembunyikan pesan kesalahan jika semua input sudah diisi
    document.getElementById('errorMessage').style.display = 'none';

    // konversi tinggi dari centimeter ke meter
    const heightInMeters = height / 100;

    // menghitung BMI berdasarkan inputan
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // menentukan status berdasarkan nilai BMI dan membuat pesan peringatan
    let status;
    let warningMessage;
    if (bmi < 18.5) {
        status = "Kekurangan berat badan";
        warningMessage = "Anda kekurangan berat badan. Penting untuk menambah berat badan ke kisaran yang sehat. Konsultasikan dengan dokter untuk saran lebih lanjut.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = "Normal";
        warningMessage = "Berat badan Anda normal. Pertahankan pola makan dan gaya hidup sehat untuk menjaga berat badan yang sehat.";
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = "Kelebihan berat badan";
        warningMessage = "Anda kelebihan berat badan. Penting untuk mengurangi berat badan ke kisaran yang sehat. Konsultasikan dengan dokter untuk saran lebih lanjut.";
    } else {
        status = "Obesitas";
        warningMessage = "Anda mengalami obesitas. Penting untuk mengurangi berat badan ke kisaran yang sehat. Konsultasikan dengan dokter untuk saran lebih lanjut.";
    }

    // membuat pesan untuk usia dan jenis kelamin
    const genderValue = gender.value;
    let message = `Anda seorang ${genderValue === 'male' ? 'pria' : 'wanita'} berusia ${age} tahun. `;
    if (genderValue === 'male') {
        if (age < 18) {
            message += "Sebagai remaja pria, penting untuk menjaga berat badan yang sehat untuk pertumbuhan optimal.";
        } else if (age >= 18 && age <= 65) {
            message += "Sebagai pria dewasa, mempertahankan BMI yang sehat membantu mencegah masalah kesehatan.";
        } else {
            message += "Sebagai pria lansia, menjaga BMI yang sehat penting untuk kualitas hidup yang baik.";
        }
    } else {
        if (age < 18) {
            message += "Sebagai remaja wanita, penting untuk menjaga berat badan yang sehat untuk pertumbuhan optimal.";
        } else if (age >= 18 && age <= 65) {
            message += "Sebagai wanita dewasa, mempertahankan BMI yang sehat membantu mencegah masalah kesehatan.";
        } else {
            message += "Sebagai wanita lansia, menjaga BMI yang sehat penting untuk kualitas hidup yang baik.";
        }
    }

    // menampilkan hasil perhitungan dan pesan tambahan
    document.getElementById('bmiValue').textContent = `${bmi.toFixed(2)}`;
    document.getElementById('bmiStatus').textContent = `${status}`;
    document.getElementById('message').textContent = message;
    document.getElementById('warning').textContent = warningMessage;

    document.getElementById('resultSection').style.display = 'block';

    // auto scroll ke bagian hasil
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
});

// membuat pesan kesalahan
function showAlert(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';

    // membuat close button untuk pesan kesalahan
    const closeBtn = document.createElement('span');
    closeBtn.textContent = 'X';
    closeBtn.className = 'close-btn';
    closeBtn.addEventListener('click', function() {
        errorMessage.style.display = 'none';
    });
    errorMessage.appendChild(closeBtn);
}
// bagian yang mengatur button clear
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('bmiForm').reset();
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
});

// นำลิงก์ Web App URL (ที่ลงท้ายด้วย /exec) มาวางในเครื่องหมายอัญประกาศด้านล่างนี้
const API_URL = "https://script.google.com/macros/s/AKfycbyPls0bQ240muCR2W8SKlCkjadxS-4dcuLzgzj7WQoCu2gyWMmm-iEN9RSwtQ6-Mp06/exec ";

async function sendSurvey() {
    const name = document.getElementById('name').value;
    const q1 = document.getElementById('q1').value;
    const q2 = document.getElementById('q2').value;
    const q3 = document.getElementById('q3').value;
    const comment = document.getElementById('comment').value;

    const button = document.querySelector('button');
    button.disabled = true;
    button.innerText = 'กำลังส่งแบบประเมิน...';

    const payload = {
        name: name,
        q1: q1,
        q2: q2,
        q3: q3,
        comment: comment
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.result === 'success') {
            alert('ส่งแบบประเมินความพึงพอใจสำเร็จ ขอบคุณครับ! 🎉');
            // รีเซ็ตฟอร์มหลังจากส่งเสร็จ
            document.getElementById('name').value = '';
            document.getElementById('comment').value = '';
        } else {
            alert('เกิดข้อผิดพลาด: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('ไม่สามารถเชื่อมต่อกับระบบได้ กรุณาตรวจสอบการ Deploy ของ Apps Script อีกครั้ง');
    } finally {
        button.disabled = false;
        button.innerText = 'ส่งแบบประเมิน';
    }
}
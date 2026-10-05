import QRCode from 'qrcode';

export const generateReservationQR = async (reservationNumber) => {
  try {
    const payload = JSON.stringify({
      company: 'GoDrive Somalia',
      reservationNumber,
      timestamp: new Date().toISOString(),
      verifyUrl: `https://godrive.so/verify/${reservationNumber}`
    });
    const qrDataUrl = await QRCode.toDataURL(payload, {
      color: {
        dark: '#00A859',
        light: '#FFFFFF'
      },
      width: 300,
      margin: 2
    });
    return qrDataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    return '';
  }
};

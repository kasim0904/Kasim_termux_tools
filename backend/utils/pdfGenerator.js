import PDFDocument from 'pdfkit';

export const generateInvoicePDF = (reservation, car, user) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Header
      doc
        .fillColor('#00A859')
        .fontSize(24)
        .text('GoDrive Somalia', 50, 50, { bold: true })
        .fillColor('#64748B')
        .fontSize(10)
        .text('Official Rental Agreement & Tax Invoice', 50, 78)
        .text('Mogadishu Aden Adde Airport Complex | Hargeisa | Garowe', 50, 92);

      doc
        .fillColor('#0F172A')
        .fontSize(12)
        .text(`INVOICE #: ${reservation.reservationNumber}`, 380, 50, { align: 'right' })
        .fillColor('#64748B')
        .fontSize(9)
        .text(`Date: ${new Date(reservation.createdAt || Date.now()).toLocaleDateString()}`, 380, 68, { align: 'right' })
        .text(`Payment: ${reservation.paymentMethod} (${reservation.paymentStatus})`, 380, 82, { align: 'right' });

      doc.moveDown(2);
      doc.strokeColor('#E2E8F0').lineWidth(1).moveTo(50, 115).lineTo(550, 115).stroke();

      // Customer & Vehicle Info
      doc.moveDown(1.5);
      const startY = 135;

      doc
        .fillColor('#0F172A')
        .fontSize(11)
        .text('CUSTOMER DETAILS', 50, startY, { underline: true })
        .fontSize(10)
        .text(`Name: ${user?.name || 'Valued Customer'}`, 50, startY + 18)
        .text(`Email: ${user?.email || 'N/A'}`, 50, startY + 32)
        .text(`Phone: ${user?.phone || 'N/A'}`, 50, startY + 46);

      doc
        .fillColor('#0F172A')
        .fontSize(11)
        .text('VEHICLE DETAILS', 320, startY, { underline: true })
        .fontSize(10)
        .text(`Vehicle: ${car?.make} ${car?.modelName} (${car?.year})`, 320, startY + 18)
        .text(`License Plate: ${car?.licensePlate || 'SMR-8821'}`, 320, startY + 32)
        .text(`Transmission/Fuel: ${car?.transmission} / ${car?.fuelType}`, 320, startY + 46);

      // Rental Details
      const rentalY = startY + 75;
      doc.strokeColor('#E2E8F0').lineWidth(1).moveTo(50, rentalY).lineTo(550, rentalY).stroke();

      doc
        .fillColor('#00A859')
        .fontSize(11)
        .text('RENTAL SCHEDULE & LOCATION', 50, rentalY + 15)
        .fillColor('#0F172A')
        .fontSize(10)
        .text(`Pickup Date: ${new Date(reservation.startDate).toLocaleDateString()} (${reservation.pickupTime})`, 50, rentalY + 32)
        .text(`Return Date: ${new Date(reservation.endDate).toLocaleDateString()}`, 50, rentalY + 46)
        .text(`Pickup Location: ${reservation.pickupLocation || 'Aden Adde Airport'}`, 320, rentalY + 32)
        .text(`Pickup Method: ${reservation.pickupType}`, 320, rentalY + 46);

      // Charges Table
      const tableY = rentalY + 75;
      doc.fillColor('#1E293B').fontSize(11).text('CHARGES SUMMARY', 50, tableY);

      let itemY = tableY + 20;
      doc.fillColor('#0F172A').fontSize(10);

      doc.text(`Base Rental (${reservation.rentalDays} Days)`, 50, itemY);
      doc.text(`$${reservation.basePrice?.toFixed(2)}`, 450, itemY, { align: 'right' });

      if (reservation.discount > 0) {
        itemY += 18;
        doc.fillColor('#059669').text(`Long-Term Rental Discount`, 50, itemY);
        doc.text(`-$${reservation.discount?.toFixed(2)}`, 450, itemY, { align: 'right' });
      }

      itemY += 18;
      doc.fillColor('#0F172A').text(`Full Comprehensive Insurance Coverage`, 50, itemY);
      doc.text(`$${reservation.insuranceFee?.toFixed(2)}`, 450, itemY, { align: 'right' });

      itemY += 18;
      doc.text(`Local Govt Tax (5%)`, 50, itemY);
      doc.text(`$${reservation.tax?.toFixed(2)}`, 450, itemY, { align: 'right' });

      itemY += 18;
      doc.text(`Refundable Security Deposit`, 50, itemY);
      doc.text(`$${reservation.deposit?.toFixed(2)}`, 450, itemY, { align: 'right' });

      itemY += 25;
      doc.strokeColor('#00A859').lineWidth(2).moveTo(50, itemY).lineTo(550, itemY).stroke();

      itemY += 10;
      doc
        .fillColor('#00A859')
        .fontSize(14)
        .text('TOTAL AMOUNT PAID', 50, itemY, { bold: true })
        .text(`$${reservation.totalAmount?.toFixed(2)} USD`, 400, itemY, { align: 'right', bold: true });

      // Digital Signature section
      itemY += 45;
      doc
        .fillColor('#475569')
        .fontSize(9)
        .text('Digital Signature Consent:', 50, itemY)
        .text('Signed digitally via GoDrive Somalia Online Verification System', 50, itemY + 14)
        .text('Thank you for choosing GoDrive Somalia - Safe Travels!', 50, itemY + 35, { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

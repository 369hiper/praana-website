const nodemailer = require('nodemailer');

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This should be the App Password
    },
});

/**
 * Send order notification to Admin
 * @param {Object} order - The order object
 */
const sendOrderNotificationToAdmin = async (order) => {
    try {
        const mailOptions = {
            from: `"Praana Coil Bot" <${process.env.EMAIL_USER}>`,
            to: 'praanacoil@gmail.com', // Admin email
            subject: `🔔 New Order Request: ${order.orderNumber} - ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
            html: `
        <h2>New Order Request Received!</h2>
        <p><strong>Order ID:</strong> ${order.orderNumber}</p>
        <p><strong>Customer:</strong> ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}</p>
        <p><strong>Email:</strong> ${order.shippingAddress.email}</p>
        <p><strong>Contact Method:</strong> ${order.contactInfo?.preferredMethod} (${order.contactInfo?.[order.contactInfo.preferredMethod] || 'N/A'})</p>
        
        <h3>Order Summary</h3>
        <ul>
          ${order.items.map(item => `
            <li>
              <strong>${item.quantity}x</strong> Product (ID: ${item.productId}) - Variant: ${item.variantId} <br>
              Price: $${item.totalPrice}
            </li>
          `).join('')}
        </ul>
        
        <p><strong>Subtotal:</strong> $${order.subtotal}</p>
        <p><strong>Total Amount:</strong> $${order.totalAmount}</p>
        
        <hr>
        <h3>Shipping Address</h3>
        <p>
          ${order.shippingAddress.address}<br>
          ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
          ${order.shippingAddress.country}<br>
          Phone: ${order.shippingAddress.phone}
        </p>
        
        <p><i>Please reach out to the customer immediately to finalize payment.</i></p>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Admin notification sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending admin email:', error);
        // Don't throw, we don't want to break the order flow if email fails
        return null;
    }
};

/**
 * Send order confirmation to Customer
 * @param {Object} order - The order object
 */
const sendOrderConfirmationToCustomer = async (order) => {
    try {
        const mailOptions = {
            from: `"Praana Coil" <${process.env.EMAIL_USER}>`,
            to: order.shippingAddress.email,
            subject: `Order Request Received: ${order.orderNumber}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Thank you for your request!</h2>
          <p>Hi ${order.shippingAddress.firstName},</p>
          <p>We have received your order request <strong>${order.orderNumber}</strong>. A member of our sales team will be in touch with you shortly via <strong>${order.contactInfo?.preferredMethod.toUpperCase()}</strong> to finalize the payment and shipping details.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Request Details</h3>
            <ul style="padding-left: 20px;">
              ${order.items.map(item => `
                <li>${item.quantity}x Praana Coil - $${item.totalPrice}</li>
              `).join('')}
            </ul>
            <p><strong>Estimated Total:</strong> $${order.totalAmount}</p>
          </div>

          <p>If you have any immediate questions, please reply to this email.</p>
          <p>Warm Regards,<br>The Praana Coil Team</p>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Customer confirmation sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending customer email:', error);
        return null;
    }
};

module.exports = {
    sendOrderNotificationToAdmin,
    sendOrderConfirmationToCustomer
};

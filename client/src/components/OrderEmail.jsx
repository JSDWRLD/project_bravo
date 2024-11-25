import ReactDOMServer from "react-dom/server";
import emailjs from "emailjs-com";

const generateOrderEmailHtml = (orderDetails) => {
    const { _id, createdAt, user, shippingAddress, orderItems, shippingPrice, taxPrice } = orderDetails;
  
    const calculateTotalPrice = (items) => {
      if (!Array.isArray(items)) return 0;
      return items.reduce(
        (total, item) => total + (item.itemPrice || 0) * (item.itemQuantity || 1),
        0
      ).toFixed(2);
    };
  
    const itemsTotal = calculateTotalPrice(orderItems);
    const totalPrice = (
      parseFloat(itemsTotal) +
      (shippingPrice || 0) +
      (taxPrice || 0)
    ).toFixed(2);
  
    const itemsHtml = orderItems
      .map(
        (item) => `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${item.itemName}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.itemQuantity}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${item.itemPrice?.toFixed(2)}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${(item.itemQuantity * item.itemPrice).toFixed(2)}</td>
          </tr>
        `
      )
      .join("");
  
    const shippingAddressHtml = shippingAddress
      ? `
        <p>${shippingAddress.address}, ${shippingAddress.city}</p>
        <p>${shippingAddress.postalCode}, ${shippingAddress.country}</p>
      `
      : "<p>Shipping address not available.</p>";
  
    return `
      <table style="width: 100%; max-width: 600px; margin: 20px auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-collapse: collapse;">
        <tr>
          <td style="background-color: #4f46e5; color: #fff; text-align: center; padding: 10px;">
            <h2 style="margin: 0;">Thank You for Your Order!</h2>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <p style="margin: 0;">
              Dear ${user?.name || "Valued Customer"},
            </p>
            <p>
              Thank you for shopping with us. Your order has been placed successfully, and we are working hard to get it to you as soon as possible. Below is a summary of your order:
            </p>
            <h3 style="margin-top: 20px;">Order Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <th style="text-align: left; border: 1px solid #ddd; padding: 8px;">Order ID:</th>
                <td style="border: 1px solid #ddd; padding: 8px;">${_id}</td>
              </tr>
              <tr>
                <th style="text-align: left; border: 1px solid #ddd; padding: 8px;">Order Date:</th>
                <td style="border: 1px solid #ddd; padding: 8px;">${createdAt ? new Date(createdAt).toLocaleString() : "N/A"}</td>
              </tr>
            </table>
            <h3 style="margin-top: 20px;">Shipping Address:</h3>
            ${shippingAddressHtml}
            <h3 style="margin-top: 20px;">Items:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Item</th>
                  <th style="text-align: center; padding: 8px; border: 1px solid #ddd;">Quantity</th>
                  <th style="text-align: right; padding: 8px; border: 1px solid #ddd;">Price</th>
                  <th style="text-align: right; padding: 8px; border: 1px solid #ddd;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            <h3 style="margin-top: 20px;">Summary:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <th style="text-align: left; border: 1px solid #ddd; padding: 8px;">Items Total:</th>
                <td style="text-align: right; border: 1px solid #ddd; padding: 8px;">$${itemsTotal}</td>
              </tr>
              <tr>
                <th style="text-align: left; border: 1px solid #ddd; padding: 8px;">Shipping Price:</th>
                <td style="text-align: right; border: 1px solid #ddd; padding: 8px;">$${(shippingPrice || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <th style="text-align: left; border: 1px solid #ddd; padding: 8px;">Tax:</th>
                <td style="text-align: right; border: 1px solid #ddd; padding: 8px;">$${(taxPrice || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <th style="text-align: left; border: 1px solid #ddd; padding: 8px;">Total Price:</th>
                <td style="text-align: right; border: 1px solid #ddd; padding: 8px;"><strong>$${totalPrice}</strong></td>
              </tr>
            </table>
            <p style="margin-top: 20px;">
              If you have any questions or need further assistance, please feel free to contact us at
              <a href="mailto:retroreplayme@gmail.com" style="color: #4f46e5; text-decoration: none;">retroreplayme@gmail.com</a>.
            </p>
            <p>Thank you for choosing us!</p>
          </td>
        </tr>
      </table>
    `;
  };
  

export const sendOrderEmail = (orderDetails, recipientEmail) => { 
    
    emailjs
      .send(
        "service_blto3a2", 
        "template_if5jdc3", 
        {
          to_email: recipientEmail, 
          html_content: generateOrderEmailHtml(orderDetails),
        },
        "HyUnnjQrnbm99UILs" 
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
        },
        (error) => {
          console.error("Error sending email:", error);
        }
      );
};

export default sendOrderEmail;

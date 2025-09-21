// emailService.js
import dotenv from 'dotenv';

import nodemailer from 'nodemailer';
import ServiceRequest from '../models/RequestService.js';
import Rental from '../models/RentalRequest.js';
import CustomerPackage from '../models/CustomerPackage.js';

dotenv.config();
//


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS,   // app password, NOT your real password
    },
    tls: {
    rejectUnauthorized: false, // <=== Allow self-signed certs
  },
  });



//Email that is sent to the company's email for service request
const sendServiceRequestEmail = async (formData) => {
  const savedRequest = await ServiceRequest.create(formData);


  const mailOptions = {
    from: `"AquaCarePlusPools" <${process.env.EMAIL_USERNAME}>`,
    to: `${process.env.EMAIL_USERNAME}`, // your email or multiple recipients
    subject: "New Pool Service Request",
html: `
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; padding: 20px; background-color: #f9f9f9;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/diwfc48gr/image/upload/v1747776587/logo_torq70.png" alt="Company Logo" style="max-width: 150px;" />
      <p style="color: #777;">Rental Request Receipt</p>
      <p style="color: #777;">Receipt id: ${savedRequest._id}</p>
    </div>

    <hr style="border: none; border-top: 1px solid #ccc;" />

    <div style="margin-top: 20px;">
      <p><strong>Name:</strong> ${savedRequest.full_name}</p>
      <p><strong>Phone:</strong> ${savedRequest.phone}</p>
      <p><strong>Email:</strong> ${savedRequest.email}</p>
      <p><strong>Address:</strong> ${savedRequest.address}</p>
      <p><strong>Service:</strong> ${savedRequest.service}</p>
      <p><strong>Date:</strong> ${new Date(savedRequest.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${savedRequest.time}</p>
      <p><strong>Message:</strong> ${savedRequest.message || "None"}</p>
    </div>

    <hr style="border: none; border-top: 1px solid #ccc; margin-top: 30px;" />

    <p style="font-size: 12px; color: #999; text-align: center;">Thank you for choosing AquaCare Plus!</p>
  </div>
`

  };

  await transporter.sendMail(mailOptions);
  return savedRequest;
};

// 📧 Rental Request Email
const sendRentalRequestEmail = async (formData) => {
  const savedRental = await Rental.create(formData);

  const mailOptions = {
    from: `"AquaCarePlusPools" <${process.env.EMAIL_USERNAME}>`,
    to: `${process.env.EMAIL_USERNAME}`,
    subject: "New Pool Rental Request",
    html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; padding: 20px; background-color: #f9f9f9;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/diwfc48gr/image/upload/v1747776587/logo_torq70.png" alt="Company Logo" style="max-width: 150px;" />
      <p style="color: #777;">Service Request Receipt</p>
      <p style="color: #777;">Receipt id: ${savedRental._id}</p>
    </div>

    <hr style="border: none; border-top: 1px solid #ccc;" />

    <div style="margin-top: 20px;">
      <p><strong>Name:</strong> ${savedRental.name}</p>
      <p><strong>Address:</strong> ${savedRental.address}</p>
      <p><strong>Tool:</strong> ${savedRental.tool}</p>
      <p><strong>Start Date:</strong> ${new Date(savedRental.startDate).toLocaleDateString()}</p>
      <p><strong>Weeks:</strong> ${savedRental.weeks}</p>
      <p><strong>Total:</strong> $${savedRental.total}</p>
       </div>

    <hr style="border: none; border-top: 1px solid #ccc; margin-top: 30px;" />

    <p style="font-size: 12px; color: #999; text-align: center;">Thank you for choosing AquaCare Plus!</p>
  </div>
`,

  };

  await transporter.sendMail(mailOptions);
  return savedRental;
};

// Subscription Email
const sendSubscriptionEmail = async (formData) => {
  const saveSubscription = await CustomerPackage.create(formData);

  const mailOptions = {
    from: `"AquaCarePlusPools" <${process.env.EMAIL_USERNAME}>`,
    to: `${process.env.EMAIL_USERNAME}`, // your email or multiple recipients
    subject: "New Customer Subscription",
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; padding: 20px; background-color: #f9f9f9;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://res.cloudinary.com/diwfc48gr/image/upload/v1747776587/logo_torq70.png" alt="Company Logo" style="max-width: 150px;" />
          <p style="color: #777;">Customer Subscription Receipt</p>
          <p style="color: #777;">Receipt id: ${saveSubscription._id}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #ccc;" />

        <div style="margin-top: 20px;">
          <p><strong>Name:</strong> ${saveSubscription.name}</p>
          <p><strong>Phone:</strong> ${saveSubscription.phone}</p>
          <p><strong>Email:</strong> ${saveSubscription.email}</p>
          <p><strong>Address:</strong> ${saveSubscription.address}</p>
          <p><strong>Plan:</strong> ${saveSubscription.plan}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #ccc; margin-top: 30px;" />

        <p style="font-size: 12px; color: #999; text-align: center;">Thank you for choosing AquaCare Plus!</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
  return saveSubscription;
};

// Contact Email
const sendContactEmail = async (formData) => {
  const mailOptions = {
    from: `"AquaCarePlusPools Contact" <${formData.email}>`, // customer's email
    to: `${process.env.EMAIL_USERNAME}`, // your business inbox
    subject: "New Contact Message",
    html: `
      <div style="max-width:600px;margin:0 auto;padding:20px;font-family:Arial,sans-serif;border:1px solid #ddd;background:#fafafa;">
        <h2 style="text-align:center;color:#0077cc;">New Contact Form Submission</h2>
        <hr/>
       <p>
  <strong>Name:</strong> ${formData.name ? formData.name : `${formData.firstName ?? ""} ${formData.lastName ?? ""}`}
</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p style="background:none;padding:10px;border-radius:5px;">${formData.message}</p>
        <hr/>
        <p style="font-size:12px;color:#666;text-align:center;">Sent from AquaCarePlus Website</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};


// send confirmation email to customer
const sendSubscriptionConfirmation = async (subscription) => {
  const mailOptions = {
    from: `"AquaCare Plus Pools" <${process.env.EMAIL_USERNAME}>`,
    to: subscription.email, // customer email from form
    subject: "Your AquaCarePlusPools Subscription Confirmation",
    html: `
      <div style="max-width:600px;margin:0 auto;padding:20px;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background:#ffffff;border-radius:12px;
  box-shadow:0 4px 12px rgba(0,0,0,0.08);">

  <!-- Header -->
  <div style="text-align:center;margin-bottom:20px;">
    <img src="https://res.cloudinary.com/diwfc48gr/image/upload/v1747776587/logo_torq70.png" 
         alt="Company Logo" 
         style="max-width: 140px;"/>
  </div>

  <!-- Greeting -->
  <p style="font-size:18px;color:#333;margin-bottom:10px;">
    Hello <strong>${subscription.name}</strong>!,
  </p>

  <!-- Intro -->
  <p style="font-size:16px;color:#555;line-height:1.6;">
    🎉 We’re excited to welcome you to the 
    <strong style="color:#0066cc;">${subscription.plan}</strong>!  
    Our team will reach out to you within <strong>24 hours</strong> to assist with your package purchase.
  </p>

  <!-- Subscription Details -->
  <div style="margin:25px 0;padding:20px;
    border-radius:10px;background:#f4f9ff;
    border:1px solid #dbe7ff;">
    <p style="margin:0 0 12px;font-size:16px;font-weight:600;color:#0066cc;">
      📦 Subscription Details:
    </p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Plan: <strong>${subscription.plan}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Phone Number: <strong>${subscription.phone}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Address: <strong>${subscription.address}</strong></p>
  </div>

  <!-- Closing -->
  <p style="font-size:16px;color:#555;line-height:1.6;">
    Thank you for choosing <strong>AquaCare Plus Pools</strong>!
  </p>

  <p style="margin-top:30px;font-size:16px;color:#333;">
    Best regards,  
    <br/><strong>AquaCare Plus Pools Team</strong>
  </p>

  <!-- Footer -->
  <hr style="margin:30px 0;border:none;border-top:1px solid #eee;"/>
  <p style="font-size:12px;color:#888;text-align:center;line-height:1.4;">
    AquaCare Plus • Customer Care • aquacareadvantage@gmail.com  
  </p>
</div>

    `,
  };

  await transporter.sendMail(mailOptions);
};

// confirmation email to customer about rental
const sendRentalConfirmation = async (rental) => {
  const mailOptions = {
    from: `"AquaCare Plus Pools" <${process.env.EMAIL_USERNAME}>`,
    to: rental.email, // customer email from form
    subject: "Your AquaCarePlusPools Rental Confirmation",
    html: `
      <div style="max-width:600px;margin:0 auto;padding:20px;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background:#ffffff;border-radius:12px;
    box-shadow:0 4px 12px rgba(0,0,0,0.08);">

  <!-- Header -->
  <div style="text-align:center;margin-bottom:20px;">
    <img src="https://res.cloudinary.com/diwfc48gr/image/upload/v1747776587/logo_torq70.png" 
         alt="Company Logo" 
         style="max-width:140px;"/>
  </div>

  <!-- Greeting -->
  <p style="font-size:18px;color:#333;margin-bottom:10px;">
    Hello <strong>${rental.name}</strong>,
  </p>

  <!-- Intro -->
  <p style="font-size:16px;color:#555;line-height:1.6;">
    🎉 Thank you for submitting a rental request with 
    <strong style="color:#0066cc;">AquaCare Plus Pools</strong>!  
    Our team will review your request and contact you within <strong>24 hours</strong>.
  </p>

  <!-- Rental Details -->
  <div style="margin:25px 0;padding:20px;
      border-radius:10px;background:#f4f9ff;
      border:1px solid #dbe7ff;">
    <p style="margin:0 0 12px;font-size:16px;font-weight:600;color:#0066cc;">
      📄 Rental Request Details:
    </p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Name: <strong>${rental.name}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Phone: <strong>${rental.phone}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Email: <strong>${rental.email}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Rental Date: <strong>${rental.startDate}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Address: <strong>${rental.address}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Tool: <strong>${rental.tool}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Weeks: <strong>${rental.weeks}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Total: <strong>$${rental.total}</strong></p>

    
  </div>

  <!-- Closing -->
  <p style="font-size:16px;color:#555;line-height:1.6;">
    We appreciate your trust in <strong>AquaCare Plus Pools</strong> and look forward to serving you!
  </p>

  <p style="margin-top:30px;font-size:16px;color:#333;">
    Best regards,  
    <br/><strong>AquaCare Plus Pools Team</strong>
  </p>

  <!-- Footer -->
  <hr style="margin:30px 0;border:none;border-top:1px solid #eee;"/>
  <p style="font-size:12px;color:#888;text-align:center;line-height:1.4;">
    AquaCare Plus • Customer Care • aquacareadvantage@gmail.com
  </p>
</div>

    `,
  };

  await transporter.sendMail(mailOptions);
};

// confirmation email to customer about service request
const sendServiceRequestConfirmation = async (service) => {
  const mailOptions = {
    from: `"AquaCare Plus Pools" <${process.env.EMAIL_USERNAME}>`,
    to: service.email, // customer email from form
    subject: "Your AquaCarePlusPools Service Confirmation",
    html: `
      <div style="max-width:600px;margin:0 auto;padding:20px;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background:#ffffff;border-radius:12px;
    box-shadow:0 4px 12px rgba(0,0,0,0.08);">

  <!-- Header -->
  <div style="text-align:center;margin-bottom:20px;">
    <img src="https://res.cloudinary.com/diwfc48gr/image/upload/v1747776587/logo_torq70.png" 
         alt="Company Logo" 
         style="max-width:140px;"/>
  </div>

  <!-- Greeting -->
  <p style="font-size:18px;color:#333;margin-bottom:10px;">
    Hello <strong>${service.full_name}</strong>,
  </p>

  <!-- Intro -->
  <p style="font-size:16px;color:#555;line-height:1.6;">
    🎉 Thank you for submitting a service request with 
    <strong style="color:#0066cc;">AquaCare Plus Pools</strong>!  
    Our team will review your request and contact you within <strong>24 hours</strong>.
  </p>

  <!-- Rental Details -->
  <div style="margin:25px 0;padding:20px;
      border-radius:10px;background:#f4f9ff;
      border:1px solid #dbe7ff;">
    <p style="margin:0 0 12px;font-size:16px;font-weight:600;color:#0066cc;">
      📄 Service Request Details:
    </p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Name: <strong>${service.full_name}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Phone: <strong>${service.phone}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Email: <strong>${service.email}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Type of Service: <strong>${service.service}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Address: <strong>${service.address}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Date: <strong>${service.date.toLocaleString()}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Time: <strong>${service.time}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Issue Stated/Pool History: <strong>${service.message}</strong></p>

    
  </div>

  <!-- Closing -->
  <p style="font-size:16px;color:#555;line-height:1.6;">
    We appreciate your trust in <strong>AquaCare Plus Pools</strong> and look forward to serving you!
  </p>

  <p style="margin-top:30px;font-size:16px;color:#333;">
    Best regards,  
    <br/><strong>AquaCare Plus Pools Team</strong>
  </p>

  <!-- Footer -->
  <hr style="margin:30px 0;border:none;border-top:1px solid #eee;"/>
  <p style="font-size:12px;color:#888;text-align:center;line-height:1.4;">
    AquaCare Plus • Customer Care • aquacareadvantage@gmail.com
  </p>
</div>

    `,
  };

  await transporter.sendMail(mailOptions);
};

const subscriptionActiveEmail = async (subscription) =>  {
  const mailOptions = {
    from: `"AquaCare Plus Pools" <${process.env.EMAIL_USERNAME}>`,
    to: subscription.email, // customer email from form
    subject: "Your AquaCarePlusPools Service Confirmation",
    html: `
      <div style="max-width:600px;margin:0 auto;padding:20px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
  <div style="text-align:center;margin-bottom:20px;">
    <img src="https://res.cloudinary.com/diwfc48gr/image/upload/v1747776587/logo_torq70.png" alt="Company Logo" style="max-width:140px;"/>
  </div>
  <p style="font-size:18px;color:#333;margin-bottom:10px;">
    Hello <strong>${subscription.name}</strong>,
  </p>
  <p style="font-size:16px;color:#555;line-height:1.6;">
    🎉 Your subscription to the <strong style="color:#0066cc;">${subscription.plan}</strong> plan is now <strong>active</strong>!
    Your start date is <strong>${new Date(subscription.activationDate).toLocaleDateString()}</strong> and your renewal date is <strong>${new Date(subscription.renewalDate).toLocaleDateString()}</strong>.
  </p>
  <div style="margin:25px 0;padding:20px;border-radius:10px;background:#f4f9ff;border:1px solid #dbe7ff;">
    <p style="margin:6px 0;font-size:15px;color:#444;">Plan: <strong>${subscription.plan}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Start Date: <strong>${new Date(subscription.activationDate).toLocaleDateString()}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Email: <strong>${subscription.email}</strong></p>
  </div>
  <p style="font-size:16px;color:#555;line-height:1.6;">Thank you for choosing <strong>AquaCare Plus Pools</strong>!</p>
  <p style="margin-top:30px;font-size:16px;color:#333;">Best regards,<br/><strong>AquaCare Plus Pools Team</strong></p>
</div>

    `,
  };

  await transporter.sendMail(mailOptions);
};

const subscriptionCancelEmail = async (subscription) =>  {
  const mailOptions = {
    from: `"AquaCare Plus Pools" <${process.env.EMAIL_USERNAME}>`,
    to: subscription.email, // customer email from form
    subject: "Your AquaCarePlusPools Service Confirmation",
    html: `
     <div style="max-width:600px;margin:0 auto;padding:20px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
  <div style="text-align:center;margin-bottom:20px;">
    <img src="https://res.cloudinary.com/diwfc48gr/image/upload/v1747776587/logo_torq70.png" alt="Company Logo" style="max-width:140px;"/>
  </div>
  <p style="font-size:18px;color:#333;margin-bottom:10px;">
    Hello <strong>${subscription.name}</strong>,
  </p>
  <p style="font-size:16px;color:#555;line-height:1.6;">
    ⚠️ Your subscription to the <strong style="color:#0066cc;">${subscription.plan}</strong> plan has been <strong>cancelled</strong>.
  </p>
  <div style="margin:25px 0;padding:20px;border-radius:10px;background:#fff4f4;border:1px solid #ffcccc;">
    <p style="margin:6px 0;font-size:15px;color:#444;">Plan: <strong>${subscription.plan}</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Status: <strong>Cancelled</strong></p>
    <p style="margin:6px 0;font-size:15px;color:#444;">Email: <strong>${subscription.email}</strong></p>
  </div>
  <p style="font-size:16px;color:#555;line-height:1.6;">If you have any questions, please contact <strong>AquaCare Plus Pools</strong>.</p>
  <p style="margin-top:30px;font-size:16px;color:#333;">Best regards,<br/><strong>AquaCare Plus Pools Team</strong></p>
</div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendrentalStatusRentedEmail = async (rental) => {
  const mailOptions = {
    from: `"AquaCare Plus Pools" <${process.env.EMAIL_USERNAME}>`,
    to: rental.email, // customer email from rental form
    subject: "Your AquaCare Plus Pools Rental Confirmation",
    html: `
      <div style="max-width:600px;margin:0 auto;padding:20px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        
        <div style="text-align:center;margin-bottom:20px;">
          <img src="https://res.cloudinary.com/diwfc48gr/image/upload/v1747776587/logo_torq70.png" alt="Company Logo" style="max-width:140px;"/>
        </div>

        <p style="font-size:18px;color:#333;margin-bottom:10px;">
          Hello <strong>${rental.name}</strong>,
        </p>

        <p style="font-size:16px;color:#555;line-height:1.6;">
          ✅ Your rental for <strong style="color:#0066cc;">${rental.tool}</strong> has been confirmed!
        </p>

        <div style="margin:25px 0;padding:20px;border-radius:10px;background:#f4f9ff;border:1px solid #dbe7ff;">
          <p style="margin:6px 0;font-size:15px;color:#444;">Rented Item: <strong>${rental.tool}</strong></p>
          <p style="margin:6px 0;font-size:15px;color:#444;">Start Date: <strong>${new Date(rental.rentedDate).toLocaleDateString()}</strong></p>
          <p style="margin:6px 0;font-size:15px;color:#444;">Return Date: <strong>${new Date(rental.returnDate).toLocaleDateString()}</strong></p>
          <p style="margin:6px 0;font-size:15px;color:#444;">Duration: <strong>${rental.weeks} week(s)</strong></p>
          <p style="margin:6px 0;font-size:15px;color:#444;">Total Price: <strong>$${rental.total.toFixed(2)}</strong></p>
          <p style="margin:6px 0;font-size:15px;color:#444;">Email: <strong>${rental.email}</strong></p>
        </div>

        <p style="font-size:16px;color:#555;line-height:1.6;">
          Thank you for choosing <strong>AquaCare Plus Pools</strong>! We look forward to serving you.
        </p>

        <p style="margin-top:30px;font-size:16px;color:#333;">
          Best regards,<br/>
          <strong>AquaCare Plus Pools Team</strong>
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const rentalStatusReturnedEmail = async (rental) => {
  const mailOptions = {
    from: `"AquaCare Plus Pools" <${process.env.EMAIL_USERNAME}>`,
    to: rental.email,
    subject: "Your AquaCare Plus Pools Rental Has Been Returned",
    html: `
      <div style="max-width:600px;margin:0 auto;padding:20px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        
        <div style="text-align:center;margin-bottom:20px;">
          <img src="https://res.cloudinary.com/diwfc48gr/image/upload/v1747776587/logo_torq70.png" alt="Company Logo" style="max-width:140px;"/>
        </div>

        <p style="font-size:18px;color:#333;margin-bottom:10px;">
          Hello <strong>${rental.name}</strong>,
        </p>

        <p style="font-size:16px;color:#555;line-height:1.6;">
          We have successfully received your rental return for <strong style="color:#0066cc;">${rental.tool}</strong>.
        </p>

        <div style="margin:25px 0;padding:20px;border-radius:10px;background:#f4f9ff;border:1px solid #dbe7ff;">
          <p style="margin:6px 0;font-size:15px;color:#444;">Rented Item: <strong>${rental.tool}</strong></p>
          <p style="margin:6px 0;font-size:15px;color:#444;">Rented On: <strong>${new Date(rental.rentedDate).toLocaleDateString()}</strong></p>
          <p style="margin:6px 0;font-size:15px;color:#444;">Scheduled Return Date: <strong>${new Date(rental.returnDate).toLocaleDateString()}</strong></p>
          <p style="margin:6px 0;font-size:15px;color:#444;">Actual Return Date: <strong>${new Date().toLocaleDateString()}</strong></p>
          <p style="margin:6px 0;font-size:15px;color:#444;">Duration: <strong>${rental.weeks} week(s)</strong></p>
          <p style="margin:6px 0;font-size:15px;color:#444;">Total Paid: <strong>$${rental.total.toFixed(2)}</strong></p>
          <p style="margin:6px 0;font-size:15px;color:#444;">Email: <strong>${rental.email}</strong></p>
        </div>

        <p style="font-size:16px;color:#555;line-height:1.6;">
          Thank you for choosing <strong>AquaCare Plus Pools</strong>. We appreciate your business and look forward to serving you again!
        </p>

        <p style="margin-top:30px;font-size:16px;color:#333;">
          Best regards,<br/>
          <strong>AquaCare Plus Pools Team</strong>
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};


export {
  sendServiceRequestEmail,
  sendRentalRequestEmail,
  sendSubscriptionEmail,
  sendSubscriptionConfirmation,
  sendRentalConfirmation,
  sendServiceRequestConfirmation,
  subscriptionActiveEmail,
  subscriptionCancelEmail,
  sendContactEmail,
  sendrentalStatusRentedEmail,
  rentalStatusReturnedEmail
};



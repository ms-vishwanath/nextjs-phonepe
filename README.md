# 📄 Environment Variables Documentation for PhonePe Integration

This document explains the environment variables required to configure the PhonePe payment gateway integration in your Next.js application.

---

## Environment Variables

### `PHONEPE_MERCHANT_ID`
- **Description:**  
  The unique identifier assigned to your merchant account by PhonePe.  
- **Purpose:**  
  Used to identify your account when making API calls to PhonePe.

---

### `PHONEPE_SALT_KEY`
- **Description:**  
  A secret cryptographic key provided by PhonePe.  
- **Purpose:**  
  Used to generate and verify checksums for secure communication between your server and PhonePe APIs.  
- **Security:**  
  Must be kept confidential and never exposed to client-side code.

---

### `PHONEPE_KEY_INDEX`
- **Description:**  
  The index number corresponding to the salt key being used.  
- **Purpose:**  
  Sent along with API requests to specify which salt key is used for checksum generation.  
- **Typical Value:**  
  Usually set to `1`. PhonePe may provide additional keys for rotation.

---

### `API_URL`
- **Description:**  
  The base URL for PhonePe API endpoints.  
- **Purpose:**  
  Directs your server to communicate with either PhonePe’s sandbox environment for testing or the live production environment.  
- **Example:**  
  Sandbox URL is usually `https://api-preprod.phonepe.com/apis/pg-sandbox`.

---

### `PHONEPE_CHECKOUT_URL`
- **Description:**  
  The full URL endpoint used to initiate payment requests with PhonePe.  
- **Purpose:**  
  Your backend calls this URL to generate payment tokens and redirect users to PhonePe’s payment UI.

---

### `PHONEPE_STATUS_URL`
- **Description:**  
  The API endpoint to check the status of a payment transaction.  
- **Purpose:**  
  Used by your backend to query PhonePe and verify if a payment was successful, pending, or failed.

---

### `PAYMENT_SUCCESS_URL`
- **Description:**  
  The URL on your frontend where users will be redirected after a successful payment.  
- **Purpose:**  
  To provide confirmation and next steps once payment completes.

---

### `PAYMENT_FAILURE_URL`
- **Description:**  
  The URL on your frontend where users will be redirected if the payment fails or is cancelled.  
- **Purpose:**  
  To inform users about payment failure and offer retry or support options.

---

## Important Notes
- **Security:**  
  Never expose `PHONEPE_SALT_KEY` or other sensitive variables to the client/browser. Keep them strictly on the server side.  
- **Environment:**  
  Use sandbox API URLs and credentials for development and testing. Switch to production URLs and live credentials before deployment.  
- **Version Control:**  
  Add your environment file (e.g., `.env.local`) to `.gitignore` to avoid leaking secrets in your repository.

---

For more details, refer to the official [PhonePe developer documentation](https://developer.phonepe.com/).

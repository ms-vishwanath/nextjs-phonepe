import { errorResponse, successResponse } from "@/lib/response.utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import sha256 from "sha256";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();
    const transactionId = uuidv4();
    const uid = body.uid;
    const phone = body.phone;
    const amount = body.amount;

    const payload = {
      merchantId: process.env.PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: uid,
      amount: amount * 100,
      redirectUrl: `${process.env.API_URL}/payment/check?transactionId=${transactionId}`,
      callbackUrl: `${process.env.API_URL}/payment/check?transactionId=${transactionId}`,
      redirectMode: "POST",
      mobileNumber: phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    let bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
    let base64EncodedPayload = bufferObj.toString("base64");

    // X-VERIFY => SHA256(base64EncodedPayload + "/pg/v1/pay" + SALT_KEY) + ### + SALT_INDEX
    let string =
      base64EncodedPayload + "/pg/v1/pay" + process.env.PHONEPE_SALT_KEY;
    let sha256_val = sha256(string);
    let xVerifyChecksum = sha256_val + "###" + process.env.PHONEPE_KEY_INDEX;

    const response = await axios.post(
      `${process.env.PHONEPE_CHECKOUT_URL}`,
      { request: base64EncodedPayload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          accept: "application/json",
        },
      }
    );
    console.log(response.data.data.instrumentResponse.redirectInfo.url);
    return successResponse(res, {
      transactionId,
      redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
    });
  } catch (error: any) {
    return errorResponse(res, {
      message: error.response?.data.message || "PhonePe API request failed.",
      details: error.response?.data || null,
      status: error.response?.status || 500,
    });
  }
};

import { errorResponse, successResponse } from "@/lib/response.utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import sha256 from "sha256";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { searchParams } = await req.nextUrl;
    const merchantTransactionId: any =
      (await searchParams.get("transactionId")) || "";

    if (!merchantTransactionId) {
      return errorResponse(res, { message: "Transaction ID is missing." });
    }

    const statusUrl = `${process.env.PHONEPE_STATUS_URL}/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}`;

    // Generate X-VERIFY header
    const string = `/pg/v1/status/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}${process.env.PHONEPE_SALT_KEY}`;
    const sha256_val = sha256(string);
    const xVerifyChecksum = sha256_val + "###" + process.env.PHONEPE_KEY_INDEX;

    const response = await axios.get(statusUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerifyChecksum,
        accept: "application/json",
        "X-MERCHANT-ID": process.env.PHONEPE_MERCHANT_ID as string,
      },
    });

    const data = response.data;

    if (data && data.code === "PAYMENT_SUCCESS") {
      return successResponse(res, {
        url: process.env.PAYMENT_SUCCESS_URL as string,
      });
    } else {
      return errorResponse(res, {
        url: process.env.PAYMENT_FAILURE_URL as string,
      });
    }
  } catch (error: any) {
    console.error("PhonePe API validation error:", error.message);

    return errorResponse(res, { message: "Unexpected error occurred." });
  }
};

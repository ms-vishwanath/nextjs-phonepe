import { NextResponse } from "next/server";

export const successResponse = (
  res: any,
  data = {},
  message = "success",
  code = 200
) => {
  return NextResponse.json(
    {
      message,
      data,
    },
    {
      status: code,
    }
  );
};

export const errorResponse = (
  res: any,
  error: any = {},
  message = "error",
  code = 400
) => {
  return NextResponse.json(
    {
      message,
      error,
    },
    {
      status: code,
    }
  );
};

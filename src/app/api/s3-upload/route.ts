import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION ?? "",
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? "",
  },
});

async function uploadFileToS3(file: any, fileName: string) {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `pratinidhi/${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}

async function uploadPdfToS3(file: any, fileName: string) {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `wordpress/${fileName}`,
    Body: fileBuffer,
    ContentType: "application/pdf",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file: File = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let fileName = null;

    if (file.type.includes("image")) {
      fileName = await uploadFileToS3(buffer, file.name);
    } else if (file.type.includes("pdf")) {
      fileName = await uploadFileToS3(buffer, file.name);
    }
    // const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json(fileName);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

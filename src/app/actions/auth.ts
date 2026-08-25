"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function registerUser(formData: FormData) {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const provisionalLicenseAt = String(
    formData.get("provisionalLicenseAt") ?? ""
  ).trim();

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !provisionalLicenseAt
  ) {
    return {
      success: false,
      message: "Please fill in all fields.",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters.",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const licenseDate = new Date(`${provisionalLicenseAt}T00:00:00`);

  if (Number.isNaN(licenseDate.getTime())) {
    return {
      success: false,
      message: "Please enter a valid provisional license date.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      provisionalLicenseAt: licenseDate,
    },
  });

  return {
    success: true,
    message: "Account created successfully.",
  };
}
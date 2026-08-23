"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createDrivingSession(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return;
  }

  const userId = Number(session.user.id);

  const startLocation = String(
    formData.get("startLocation") ?? ""
  ).trim();

  const startTime = String(formData.get("startTime") ?? "");

  const endLocation = String(
    formData.get("endLocation") ?? ""
  ).trim();

  const endTime = String(formData.get("endTime") ?? "");

  const distanceKm = Number(formData.get("distanceKm"));

  const trafficLevel = String(
    formData.get("trafficLevel") ?? ""
  );

  const guideComment = String(
    formData.get("guideComment") ?? ""
  ).trim();

  if (
    !startLocation ||
    !startTime ||
    !endLocation ||
    !endTime ||
    !Number.isFinite(distanceKm) ||
    distanceKm < 0 ||
    !trafficLevel
  ) {
    return;
  }

  if (!["laag", "middel", "hoog"].includes(trafficLevel)) {
    return;
  }

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime())
  ) {
    return;
  }

  if (endDate <= startDate) {
    return;
  }

  try {
    await prisma.drivingSession.create({
      data: {
        userId,
        startLocation,
        startTime: startDate,
        endLocation,
        endTime: endDate,
        distanceKm,
        trafficLevel,
        guideComment: guideComment || null,
      },
    });
  } catch (error) {
    console.error("Fout bij opslaan traject:", error);
    return;
  }

  revalidatePath("/trajecten");
  redirect("/trajecten");
}

export async function deleteDrivingSession(
  formData: FormData
): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return;
  }

  const userId = Number(session.user.id);
  const sessionId = Number(formData.get("sessionId"));

  if (!Number.isInteger(sessionId)) {
    return;
  }

  try {
    await prisma.drivingSession.deleteMany({
      where: {
        id: sessionId,
        userId,
      },
    });

    revalidatePath("/trajecten");
    redirect("/trajecten");
  } catch (error) {
    console.error("Fout bij verwijderen traject:", error);
  }
}

export async function updateDrivingSession(
  formData: FormData
): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return;
  }

  const userId = Number(session.user.id);
  const sessionId = Number(formData.get("sessionId"));

  if (!Number.isInteger(sessionId)) {
    return;
  }

  const startLocation = String(
    formData.get("startLocation") ?? ""
  ).trim();

  const startTime = String(formData.get("startTime") ?? "");

  const endLocation = String(
    formData.get("endLocation") ?? ""
  ).trim();

  const endTime = String(formData.get("endTime") ?? "");

  const distanceKm = Number(formData.get("distanceKm"));

  const trafficLevel = String(
    formData.get("trafficLevel") ?? ""
  );

  const guideComment = String(
    formData.get("guideComment") ?? ""
  ).trim();

  if (
    !startLocation ||
    !startTime ||
    !endLocation ||
    !endTime ||
    !Number.isFinite(distanceKm) ||
    distanceKm < 0 ||
    !trafficLevel
  ) {
    return;
  }

  if (!["laag", "middel", "hoog"].includes(trafficLevel)) {
    return;
  }

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime())
  ) {
    return;
  }

  if (endDate <= startDate) {
    return;
  }

  try {
    await prisma.drivingSession.updateMany({
      where: {
        id: sessionId,
        userId,
      },
      data: {
        startLocation,
        startTime: startDate,
        endLocation,
        endTime: endDate,
        distanceKm,
        trafficLevel,
        guideComment: guideComment || null,
      },
    });
  } catch (error) {
    console.error("Fout bij bijwerken traject:", error);
    return;
  }

  revalidatePath("/trajecten");
  revalidatePath(`/trajecten/${sessionId}/bewerken`);

  redirect("/trajecten");
}
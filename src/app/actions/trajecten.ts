"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createDrivingSession(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Je moet ingelogd zijn.",
    };
  }

  const userId = Number(session.user.id);

  const startLocation = String(
    formData.get("startLocation") ?? ""
  ).trim();

  const startTime = String(
    formData.get("startTime") ?? ""
  );

  const endLocation = String(
    formData.get("endLocation") ?? ""
  ).trim();

  const endTime = String(
    formData.get("endTime") ?? ""
  );

  const distanceKm = Number(
    formData.get("distanceKm")
  );

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
    return {
      success: false,
      message: "Vul alle verplichte velden correct in.",
    };
  }

  if (!["laag", "middel", "hoog"].includes(trafficLevel)) {
    return {
      success: false,
      message: "Ongeldige verkeersomstandigheid.",
    };
  }

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime())
  ) {
    return {
      success: false,
      message: "Ongeldige datum of tijd.",
    };
  }

  if (endDate <= startDate) {
    return {
      success: false,
      message: "Het einduur moet na het startuur liggen.",
    };
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

    return {
      success: true,
      message: "Traject succesvol opgeslagen.",
    };
  } catch (error) {
    console.error("Fout bij opslaan traject:", error);

    return {
      success: false,
      message: "Het traject kon niet worden opgeslagen.",
    };
  }
}